import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Spin, Tag, Button, Input, DatePicker  } from 'antd';
import { postData, getData } from '../../../scripts/api-service';
import { PRODUCT_DELIVARY, DROPDOWN_LIST, ORDER_PRODUCT_DELIVERY_EXPORT } from '../../../scripts/api';
import { buildSearchQuery, dateFormat, checkUserPermission } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';
import { CSVLink } from "react-csv";
import moment from 'moment';
 
const { Option } = Select;
const { RangePicker } = DatePicker;


const headers = [
  { label: "Customer ID", key: "Customer ID" },
  { label: "Customer name", key: "Customer name" },
  { label: "Delivered Quanity", key: "Delivered Quanity" },
  { label: "Order Number", key: "Order Number" },
  { label: "Posting Date Time", key: "Posting Date Time" },
  { label: "ItemCode", key: "ItemCode" },
  { label: "Itemname", key: "Itemname" },
  { label: "Quantity", key: "Quantity" },
  { label: "Remaining Quanity", key: "Remaining Quanity" },
  { label: "Status", key: "Status" },
];

export default function ProductDelivery() {
    const { permissions } = useContext(authContext);

    const [products, setProducts] = useState();
    const [search, setSearch] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [customers, setCustomers] = useState();
    const [productModel, setProductModel] = useState();
    const [exportData, setExportData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        {
          title: 'Order NO',
          dataIndex: 'sap_order_id',
          key: 'sap_order_id',
        },
        {
          title: 'Customer',
          key: 'merchant_id',
          render: (text, record) => (
            <Space size="middle">
              {record.merchant.name}
            </Space>
          )
        },
        {
          title: 'Product name',
          key: 'product_id',
          render: (text, record) => (
            <Space size="middle">
              {record?.product?.product_name}
            </Space>
          )
        },
        {
            title: 'Date',
            dataIndex: 'order_date_time',
            key: 'order_date_time',
            render: (date) => (
                <span>{dateFormat(date)}</span>
            )
        },
        {
            title: 'Order Quantity (can)',
            dataIndex: 'ordered_quantity',
            key: 'ordered_quantity',
        },
        {
            title: 'Deliveried',
            dataIndex: 'delivered_quantity',
            key: 'delivered_quantity',
        },
        {
            title: 'Remaining',
            dataIndex: 'remaining_quantity',
            key: 'remaining_quantity',
        },
        {
            title: 'Status',
            dataIndex: 'status_title',
            key: 'status_title',
            render: (status) => (
                <span>
                    { status === 'Canceled' ? 
                        <Tag color="#f50">{status}</Tag> : 
                      status === 'Delivered' ? <Tag color="#87d068">{status}</Tag> :
                      status === 'Processing' ? <Tag color="#2db7f5">{status}</Tag> : 
                      status === 'Approved' ? <Tag color="cyan">{status}</Tag> :  <Tag color="magenta">{status}</Tag>}
                </span>
            )
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                  <Link to={`/product-order-details/${record.id}`}>Update</Link>
                </Space>
              )
        },
    ];

    const getProductDetails = async () => {
        setIsLoading(true);
        let res = await postData(PRODUCT_DELIVARY, search);

        if (res) {
            setProducts(res.data.data);
            setIsLoading(false);
            generateReport();
        }
    }

    const getCustomers = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "customer"
        })

        if (res) {
            setCustomers(res.data.data);
        }
    }

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const getOrderStatus = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "order_status"
        })

        if (res) {
            let masterData = res.data.data.filter(val => (val.title === 'Processing' || val.title === 'Delivered'))
            setOrderStatus(masterData);
        }
    };

    const getPoductModel = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "product_model"
        });

        if (res) {
            setProductModel(res.data.data);
        }
    }

    const searchOrder = (e) => {
        setSearch(prevState => ({
            ...prevState,
            order_no: e.target.value
        }))
    };

    const searchOrderStatus = (value) => {
        setSearch(prevState => ({
            ...prevState,
            status: JSON.stringify(value)
        }))
    };

    const searchProductModel = (value) => {
        setSearch(prevState => ({
            ...prevState,
            product: JSON.stringify(value)
        }))
    };

    const searchCustomer = (value) => {
        console.log("value", value);
        setSearch(prevState => ({
            ...prevState,
            customer: JSON.stringify(value)
        }))
    };

    const searchRange = (value, dateString) => {
        setSearch(prevState => ({
            ...prevState,
            start_date: dateString[0]
        }));
        
        setSearch(prevState => ({
            ...prevState,
            end_date: dateString[1]
        }));
    }

    const generateReport = async () => {
        let query = buildSearchQuery(search);
        let url = ORDER_PRODUCT_DELIVERY_EXPORT + `?${query}`;
        let res = await getData( url );
        
        if (res) {
            let masterData = res.data.data;
            setExportData(masterData || [])
        }
    }

    useEffect(() => {
        getOrderStatus();
        getCustomers();
        getPoductModel();
    }, [])

    useEffect(() => {
        getProductDetails()
    }, [search])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Product Delivary</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Type Order NO" onPressEnter={searchOrder}/>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Status"
                                        onChange={searchOrderStatus}
                                        >
                                        {
                                            orderStatus?.length ?
                                            orderStatus.map(status => <Option key={status.value} value={status.value}>{status.title}</Option>) : ''
                                        }
                                    </Select>  
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Customers"
                                        onChange={searchCustomer}
                                        >
                                        {
                                            customers?.length ?
                                            customers.map(status => <Option key={status.id} value={status.id}>{status.name}</Option>) : ''
                                        }
                                    </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Products Models"
                                        onChange={searchProductModel}
                                        >
                                        {
                                            productModel?.length ?
                                            productModel.map(status => <Option key={status.id} value={status.id}>{status?.product_name}</Option>) : ''
                                        }
                                    </Select>
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <RangePicker size="large" style={{width: "100%"}} onChange={searchRange}/>
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                {/* <Button className="btn-light btn-block" size="large" 
                                        type="primary">
                                        Reset Filter
                                </Button> */}
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                {/* <Button className="btn-brand btn-block float-right" size="large" 
                                    type="primary">
                                    Filter
                                </Button> */}
                            </div>
                        </div>
                    </div>

                    {
                        canView('Product - Delivery | Export') ? <>
                            <div className="float-right mb-20">
                                <CSVLink data={exportData} headers={headers} target="_blank" filename={`Product-order-delivery-${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`}>
                                    <Button type="primary" size="large" className="btn-brand btn-block float-right mb-20">
                                        Generate Report
                                    </Button>
                                </CSVLink>
                            </div>
                        </> : ''
                    }

                    {           
                        isLoading ? <div className="loading-content">
                            <Spin size="large" className="mr-20" />
                            <Spin size="large" className="mr-20"/>
                            <Spin size="large" className="mr-20"/>
                        </div> : <Table dataSource={products} columns={columns} />
                    }

                </div>
            </div>
        </Fragment>
    )
}
