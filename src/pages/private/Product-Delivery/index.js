import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PRODUCT_DELIVARY } from '../../../scripts/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ProductDelivery() {
    const [products, setProducts] = useState();
      
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

    useEffect(() => {
        getProductDetails()
    }, [])

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
                        <div className="row xs-gap mt-10 mb-30">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Name" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Status"
                                        >
                                        {children}
                                    </Select>
                                        
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Customers"
                                        >
                                        {children}
                                    </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        // mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Models"
                                        >
                                        {children}
                                    </Select>
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <RangePicker size="large" style={{width: "100%"}} />
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-light btn-block" size="large" 
                                        type="primary">
                                        Reset Filter
                                </Button>
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-brand btn-block float-right" size="large" 
                                    type="primary">
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Table dataSource={products} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
