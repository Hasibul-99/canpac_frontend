import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Modal  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { ORDER_APPROVE_OR_CANCEL, ORDER_DRAFT, DROPDOWN_LIST } from '../../../scripts/api';
import { alertPop, dateFormat } from '../../../scripts/helper';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function OrderDraft() {
    const [draftList, setDraftList] = useState();
    const [approveModal, setApproveModal] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [search, setSearch] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [customers, setCustomers] = useState();
    const [productModel, setProductModel] = useState();
      
    const columns = [
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
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space >
                  <Button type="primary" className="btn-brand" onClick={() => {setApproveModal(true); setSelectedOrder(record)}}> Approve </Button>
                  <Button type="primary" danger onClick={() => {confirmCancel(record.id)}}> Cancel </Button>
                </Space>
            )
        },
    ];

    const confirmCancel = (orderId) => {
        confirm({
            title: 'Are you sure, you want to cancel this order?',
            icon: <ExclamationCircleOutlined />,
            content: 'You will not get this order back.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                postData(ORDER_APPROVE_OR_CANCEL, {
                    id: orderId,
                    status: 5
                }).then(res => {
                    if (res) {
                        alertPop('success', "Order Canceled Successfully!");

                        setTimeout(() => {
                            getOrderDraft();
                        }, 500)
                    }
                });

            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const onFinish = async (values) => {
        let res = await postData(ORDER_APPROVE_OR_CANCEL, {
            id: selectedOrder.id,
            status: 2,
            sap_order_id: values.sap_order_id
        });

        if (res) {
            alertPop("success", "Order Approved Successfully!");
            setApproveModal(false);
            setSelectedOrder(null);
            getOrderDraft();
        }
    };

    const getOrderDraft = async () => {
        let res = await postData(ORDER_DRAFT, search);

        if (res) {
            setDraftList(res.data.data);
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
        getOrderDraft()
    }, [search])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Order Draft</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            {/* <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Type Order NO" onPressEnter={searchOrder}/>
                            </div> */}

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
                    <Table dataSource={draftList} columns={columns} />
                </div>
            </div>

            <Modal title="Approve Order"
                visible={approveModal}
                width="50vw"
                onCancel={() => {setApproveModal(false);}}
                footer={false}
            >
                <Form style={{width: "100%", marginTop: "2rem"}}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="sap_order_id"
                        rules={[{ required: true, message: 'Please input SAP order on!' }]}
                    >
                        <Input size="large" placeholder="SAP order on"/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                            Approve
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Fragment>
    )
}
