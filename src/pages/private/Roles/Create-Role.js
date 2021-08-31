import React, { Fragment } from 'react';
import {Table, Space, Select, Form, Button, Input, Checkbox , Modal } from 'antd';

export default function CreateRole() {
    const plainOptions = ['Apple', 'Pear', 'Orange'];

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
                    <h1>Create Role</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%"}}
                        layout={'vertical'}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        >
                        <div className="row xs-gap">
                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                <Form.Item
                                    label="Name"
                                    name="username"
                                    rules={[{ required: true }]}
                                >
                                    <Input size="large" placeholder="Name" />   
                                </Form.Item>

                                <Form.Item
                                    label="Allies"
                                    name="username"
                                    rules={[{ required: true }]}
                                >
                                    <Input size="large" placeholder="Name" />   
                                </Form.Item>

                                <Form.Item
                                    label="Status"
                                    name="username"
                                    rules={[{ required: true }]}
                                >
                                    <Input size="large" placeholder="Name" />   
                                </Form.Item>
                            </div>

                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                <Form.Item
                                    label="Permissions"
                                    name="username"
                                    rules={[{ required: true }]}
                                >
                                    <Checkbox.Group options={plainOptions} style={{display: "grid"}}/>  
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row xs-gap">
                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                <Form.Item>
                                    <Button className="btn-brand btn-block float-right" size="large" 
                                        type="primary" htmlType="submit">
                                        Create Role
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
