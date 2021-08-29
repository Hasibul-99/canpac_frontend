import React from 'react';
import {Link} from "react-router-dom";
import { Form, Input, Button } from "antd";


import "./style.scss";

export default function SignIn() {
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
                            <h1 className="display-4 mb-10 text-center">Sign In</h1>
                        </div>

                        <Form style={{width: "100%", marginTop: "2rem"}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password size="large"/>
                            </Form.Item>

                            <div className="row">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-6">
                                    <div className="d-flex justify-content-end">
                                        <Link to="#" className="fs-13">Forget password?</Link>
                                    </div>
                                </div>
                            </div>

                            <Form.Item>
                                <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                Submit
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="col-12">
                            <div className="rui-sign-or">or</div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-grey-5">
                    Don&apos;t you have an account? <Link to="/sign-up" className="text-2">Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
