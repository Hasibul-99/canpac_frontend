import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import { Select, Form, Input, Button, InputNumber  } from 'antd';

const { Option } = Select;

export default function OrderCreate() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        </ol>
                    </nav>
                    <h1>Create Order</h1>
                </div>
            </div>

            <div className="px-40">
                <Form style={{width: "100%", marginTop: "2rem"}}
                    layout={'vertical'}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Product Model"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select
                            size="large"
                            showSearch
                            placeholder="Select Product Model"
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
                        label="Quantity"
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
        </Fragment>
    )
}
