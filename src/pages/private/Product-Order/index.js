import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Tag } from 'antd';
import { postData, getData } from '../../../scripts/api-service';
import { ORDER_LIST, DROPDOWN_LIST, ORDER_PRODUCT_EXPORT } from '../../../scripts/api';
import { dateFormat, checkUserPermission, buildSearchQuery } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';
import { CSVLink } from "react-csv";

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

export default function ProductOrder() {
    const { permissions } = useContext(authContext);
    const [orders, setOrders] = useState();
    const [search, setSearch] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [customers, setCustomers] = useState();
    const [productModel, setProductModel] = useState();
    const [exportData, setExportData] = useState([]);

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const columns = [
        {
          title: 'Order NO',
          dataIndex: 'sap_order_id',
          key: 'name',
        },
        {
          title: 'Customer',
          key: 'merchant.id',
          render: (text, record) => (
            <span>
                {record.merchant.name}
            </span>
            )
        },
        {
            title: 'Product name',
            key: 'product.id',
            render: (text, record) => (
                <span>
                    {record.product.product_name}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'order_date_time',
            key: 'address',
            render: (text, date) => (
                <span>
                    {dateFormat(date)}
                </span>
            )
        },
        {
            title: 'Order Quantity (can)',
            dataIndex: 'ordered_quantity',
            key: 'ordered_quantity',
        },
        {
            title: 'Status',
            dataIndex: 'status_title',
            key: 'status',
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
            title: 'Approve',
            key: 'update',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/product-order-details/${record.id}`}>Update</Link>
                </Space>
            )
        },
    ].filter(item => !canView('Order - Details') ? item.key !== 'update' : item);

    const getProductOrder = async () => {
        let res = await postData(ORDER_LIST, search)

        if (res) {
            setOrders(res.data.data);
            generateReport();
        }
    };

    const getCustomers = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "customer"
        })

        if (res) {
            setCustomers(res.data.data);
        }
    } 

    const getOrderStatus = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "order_status"
        })

        if (res) {
            let masterData = res.data.data.filter(val => val.title !== "Active");
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
        // const base_url = process.env.REACT_APP_BASE;
        // let query = buildSearchQuery(search);

        // let url = base_url + ORDER_PRODUCT_EXPORT + `?${query}`;
        // window.open(url, '_blank'); 

        let query = buildSearchQuery(search);
        let url = ORDER_PRODUCT_EXPORT + `?${query}`;
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
        getProductOrder();
    }, [search])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Product Order</h1>
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
                                            productModel.map(status => <Option key={status.id} value={status.id}>{status.product_name}</Option>) : ''
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
                        canView('Product - Order | Export Excel') ? <div className="float-right mb-20">
                            {/* <Button type="primary" onClick={() => generateReport()} size="large">Generate Report</Button> */}
                            <CSVLink data={exportData} headers={headers} target="_blank" filename={"Product-order.csv"}>
                                <Button type="primary" size="large">
                                    Generate Report
                                </Button>
                            </CSVLink>
                        </div> : ''
                    }
                    
                    <Table dataSource={orders} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
