import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Select, Form, Button, InputNumber, Timeline   } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { postData } from '../../../scripts/api-service';
import { DROPDOWN_LIST, ORDER_VIEW, ORDER_UPDATE, ORDER_EMAIL } from '../../../scripts/api';
import { alertPop, checkUserPermission} from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';

const { Option } = Select;

export default function ProductDetails() {
    const { permissions } = useContext(authContext);
    const [form] = Form.useForm();
    let { orderId } = useParams();
    const [order, setOrder] = useState();
    const [orderStatus, setOrderStatus] = useState();
    const [mailText, setMailText] = useState();

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const onFinish = async (values) => {
        let data = values;
        data.id = orderId;

        let res = await postData(ORDER_UPDATE, data);
        if (res) {
            alertPop('success', "Updated Successfully!");
        }
    };

    const quillChange = (value) => {
        setMailText(value);
    }

    const getOrderDetails = async () => {
        let res = await postData(ORDER_VIEW, {
            id: orderId
        });

        if (res) {
            let masterData = res.data.data;
            setOrder(masterData);
            form.setFieldsValue({
                status: masterData.status * 1,
                ordered_quantity: masterData.ordered_quantity,
            });
        }
    }

    const getOrderStatus = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "order_status"
        });

        if (res) setOrderStatus(res.data.data)
    }

    const sendMail = async () => {
        let data = {
            id: orderId,
            text: mailText
        };

        let res = await postData(ORDER_EMAIL, data);
        if (res) {
            alertPop('success', "Sended Successfully!");
        }
    }

    useEffect(() => {
        getOrderDetails();
        getOrderStatus();
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Order Details</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="Order-info">
                        <h4><strong>Order ID: </strong>{order?.id}</h4>
                        <h4><strong>Product: </strong>{order?.product?.product_name}</h4>
                        <h4><strong>Order Quantity: </strong>{order?.ordered_quantity}</h4>
                        <h4><strong>Remaining Quantity: </strong>{order?.remaining_quantity}</h4>
                        <h4><strong>Status: </strong>{order?.status_title}</h4>
                    </div>

                    {
                        canView('Product - Delivery | Update') ? <Fragment>
                            <hr/>

                            <div className="row">
                                {
                                    canView('Order - Creat') ? <div className="col col-sm-12 col-lg-6 mb-10">
                                        <Form style={{width: "100%", marginTop: "2rem"}}
                                            form={form}
                                            layout={'vertical'}
                                            onFinish={onFinish}
                                            >
                                            <Form.Item
                                                label="Update Status"
                                                name="status"
                                                rules={[{ required: true, message: 'Please input status!' }]}
                                            >
                                                <Select
                                                    size="large"
                                                    showSearch
                                                    placeholder="Process"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {
                                                        orderStatus?.length && orderStatus.map(status => <Option value={status.value} key={status.value}>{status.title}</Option>)
                                                    }
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label="Delevary Quantity"
                                                name="delivered_quantity"
                                                rules={[{ required: true, message: 'Please input quantity!' }]}
                                            >
                                                <InputNumber placeholder="Select Quantity" size="large" min={1} max={order?.ordered_quantity}  style={{width: "100%"}}/>
                                            </Form.Item>

                                            <Form.Item>
                                                <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                                Update Order
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </div> : ''
                                }
                                
                                {
                                    canView("Order - Details | E-mail Send") ? <div className="col col-sm-12 col-lg-6 mb-10">
                                        <ReactQuill  onChange={quillChange} style={{height: "150px"}}/>

                                        <Button className="btn-brand btn-block" size="large" type="primary" onClick={() => sendMail()}
                                            style={{width: "100%", marginTop: "6rem"}} >
                                            Send
                                        </Button>
                                    </div> : ''
                                }
                                
                            </div>

                        </Fragment> : ''
                    }
                    
                    <hr/>

                    {
                        canView("Order - Details | History") ? <div className="order-history mt-50">
                            <h3 className="text-center">Order Histoy</h3>

                            <Timeline mode="alternate">
                                {
                                    order?.history?.length && order.history.map((his, index) => {
                                        return (
                                            index % 2 == 0 
                                            ? <Timeline.Item 
                                                position='left'>
                                                    {his.description_en}
                                                </Timeline.Item> :
                                                <Timeline.Item color="green" 
                                                position='right'>
                                                    {his.description_en}
                                                </Timeline.Item>
                                        )
                                    })
                                }
                            </Timeline>
                        </div> : ''
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}
