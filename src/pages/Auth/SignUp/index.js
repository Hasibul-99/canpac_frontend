import React from 'react';
import {Link} from "react-router-dom";
import { Form, Input, Button } from "antd";

export default function SignUp() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (    
        <div className="rui-main">
            <div className="rui-sign align-items-center justify-content-center">
            <div className="bg-image">
                    <div className="bg-grey-1" />
                </div>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <div className="col-12">
                            <h1 className="display-4 mb-10 text-center">Sign Up</h1>
                        </div>

                        <Form style={{width: "100%", marginTop: "2rem"}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input your Name!' }]}
                            >
                                <Input size="large" placeholder="Enter Name" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input company name!' }]}
                            >
                                <Input size="large" placeholder="Enter Company Name" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input email!' }]}
                            >
                                <Input size="large" placeholder="Enter Email" />
                            </Form.Item>

                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input phone!' }]}
                            >
                                <Input size="large" placeholder="Enter Phone" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password size="large" placeholder="password"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password size="large" placeholder="Confirm Password" />
                            </Form.Item>


                            <Form.Item>
                                <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                Sign up
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="col-12">
                            <div className="rui-sign-or">or</div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-grey-5">
                    Already have an account <Link to="/auth/login" className="text-2">Sign In</Link>
                </div>
            </div>
        </div>
    )
}
