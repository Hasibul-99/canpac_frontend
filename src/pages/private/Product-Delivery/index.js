import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PRODUCT_DELIVARY, DROPDOWN_LIST } from '../../../scripts/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ProductDelivery() {
    const [products, setProducts] = useState();
    const [search, setSearch] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [customers, setCustomers] = useState();
    const [productModel, setProductModel] = useState();

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
              {record.product.product_name}
            </Space>
          )
        },
        {
            title: 'Date',
            dataIndex: 'order_date_time',
            key: 'order_date_time',
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
        let res = await postData(PRODUCT_DELIVARY, {});

        if (res) {
            setProducts(res.data.data);
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

    const getOrderStatus = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "order_status"
        })

        if (res) {
            setOrderStatus(res.data.data);
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
                                            customers.map(status => <Option key={status.value} value={status.value}>{status.title}</Option>) : ''
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

                    <Table dataSource={products} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
