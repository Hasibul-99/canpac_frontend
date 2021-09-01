import React from 'react';
import {Link} from "react-router-dom";
import { Form, Input, Button } from "antd";
import "./style.scss";
import {LOGIN} from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import Cookies from "js-cookie";

export default function SignIn() {
    
    const onFinish = async (values) => {
        let res = await postData(LOGIN, values, 'no_token');
        if (res) {
            Cookies.set("canpacToken", res.data.data.access_token);
            window.location = "/";
        }
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
                            >
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Please input your email addresss!' },
                                    {
                                        pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                        message: "Please enter a valid email address",
                                    }
                                ]}
                            >
                                <Input size="large" placeholder="Email address" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password size="large" placeholder="Password"/>
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
                                    Login
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
