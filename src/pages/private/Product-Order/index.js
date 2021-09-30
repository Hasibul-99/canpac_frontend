import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Tag } from 'antd';
import { postData } from '../../../scripts/api-service';
import { ORDER_LIST } from '../../../scripts/api';
import { dateFormat, checkUserPermission } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ProductOrder() {
    const { permissions } = useContext(authContext);
    const [orders, setOrders] = useState();

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
                    {status === 'Canceled' ? <Tag color="#f50">{status}</Tag> : <Tag color="#87d068">{status}</Tag>}
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

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const getProductOrder = async () => {
        let res = await postData(ORDER_LIST, {})

        if (res) {
            setOrders(res.data.data);
        }
    }

    useEffect(() => {
        getProductOrder();
    }, [])

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
                                <Input size="large" placeholder="Type Order NO" />
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
                                        placeholder="Products Models"
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
                    <Table dataSource={orders} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
