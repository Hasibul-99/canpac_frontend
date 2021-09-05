import React, { Fragment, useState } from 'react'
import { Form, Input, Button } from "antd";
import {Link} from "react-router-dom";

export default function passwordSet() {
    const onFinish = async (values) => {
        console.log('Success:', values);
        // // setResetPassword(0);
        // let res = await postData(FORGET_PASSWORD_EMAIL, values);

        // if (res) {
        //     setIsLoading(true);
        // }
    };


    return (
        <div className="rui-main">
            <div className="rui-sign align-items-center justify-content-center">
            <div className="bg-image">
                    <div className="bg-grey-1" />
                </div>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <Fragment>
                            <div className="col-12">
                                <h1 className="display-4 mb-10 text-center">Reset Password</h1>
                            </div>

                            <Form style={{width: "100%", marginTop: "2rem"}}
                                onFinish={onFinish}
                                >
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
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Fragment>

                <div className="col-12">
                            {/* <div className="rui-sign-or">or</div> */}
                        </div>
                    </div>
                </div>
                {/* <div className="mt-20 text-grey-5">
                    Already have an account? <Link to="/auth/login" className="text-2">Sign In</Link>
                    <br/>
                    <h5 className="text-center mt-3 mb-3">Or</h5>
                    Don&apos;t you have an account? <Link to="/auth/signup" className="text-2">Sign Up</Link>
                </div>*/}
            </div> 
        </div>
    )
}
