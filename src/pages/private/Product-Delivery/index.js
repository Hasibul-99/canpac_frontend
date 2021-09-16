import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PRODUCT_STOCK } from '../../../scripts/api';

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
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Customer',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Product name',
          dataIndex: 'product_name',
          key: 'address',
        },
        {
            title: 'Date',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Order Quantity (can)',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                  <a>Update</a>
                </Space>
              )
        },
    ];

    const getProductDetails = async () => {
        let res = await postData(PRODUCT_STOCK, {});

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
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        </ol>
                    </nav>
                    <h1>Product Stock</h1>
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
