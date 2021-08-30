import React, { Fragment } from 'react';
import { Select, Form, Button, InputNumber, Timeline   } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const { Option } = Select;

export default function ProductDetails() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const quillChange = () => {

    } 

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Product Details</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="Order-info">
                        <h4><strong>Order ID: </strong>45678974651</h4>
                        <h4><strong>Product: </strong>220ML FARCENT SHOE SPRAY THÁI LAN</h4>
                        <h4><strong>Order Quantity: </strong>20000</h4>
                        <h4><strong>Remaining Quantity: </strong>20000</h4>
                        <h4><strong>Status: </strong>Active</h4>
                    </div>

                    <hr/>

                    <div className="row">
                        <div className="col col-sm-12 col-lg-6 mb-10">
                            <Form style={{width: "100%", marginTop: "2rem"}}
                                layout={'vertical'}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                >
                                <Form.Item
                                    label="Update Status"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
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
                                        <Option value="jack">Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Delevary Quantity"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <InputNumber placeholder="Select Quantity" size="large" min={1} max={2000}  style={{width: "100%"}}/>
                                </Form.Item>

                                <Form.Item>
                                    <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                    Create Order
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="col col-sm-12 col-lg-6 mb-10">
                            <ReactQuill  onChange={quillChange} style={{height: "150px"}}/>

                            <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" 
                                style={{width: "100%", marginTop: "6rem"}} >
                                Send
                            </Button>
                        </div>
                    </div>

                    <hr/>

                    <div className="order-history mt-50">
                        <h3 className="text-center">Order Histoy</h3>

                        <Timeline mode="alternate">
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            </Timeline.Item>
                            <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                            Technical testing 2015-09-01
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
