import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { postData } from "../../../scripts/api-service";
import { FORGET_PASSWORD_EMAIL, GENERAL_RESOURCE } from "../../../scripts/api";

export default function ForgetPassword() {
    const [general, setGeneral] = useState();
    const [isresetpassword, setResetPassword] = useState(1);
    const [isLoading, setIsLoading] = useState();

    const onFinish = async (values) => {
        console.log('Success:', values);
        // setResetPassword(0);
        let res = await postData(FORGET_PASSWORD_EMAIL, values);

        if (res) {
            setIsLoading(true);
        }
    };


    const getGeneralResourse = async () => {
        let res = await postData(GENERAL_RESOURCE, {});

        if (res) {
            let masterData = res.data?.data;

            console.log("masterData ===", masterData);
            setGeneral(masterData);
        }
    }

    useEffect(() => {
        getGeneralResourse()
    }, [])

    return (
        <>
            <div className="rui-main">
                <div className="rui-sign align-items-center justify-content-center">
                    <div className="bg-image">
                        <div className="bg-grey-1" />
                    </div>
                    <div className="form rui-sign-form rui-sign-form-cloud">
                        <div className="row vertical-gap sm-gap justify-content-center">
                            {
                                isresetpassword ? <Fragment>
                                    <div className="col-12 text-center">
                                        {
                                            general?.login_page_footer_logo ? <img src={general?.login_page_footer_logo}
                                                height="100" width="150" className="mb-20"
                                                alt="logo" /> : ''
                                        }

                                        <h1 className="display-4 mb-10 text-center">Forget Password</h1>
                                    </div>
                                    <Form style={{ width: "100%", marginTop: "2rem" }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="email"
                                            rules={[{ required: true, message: 'Please input email!' },
                                            {
                                                pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                                message: "Please enter a valid email address",
                                            }]}
                                        >
                                            <Input size="large" placeholder="Email" />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{ width: "100%", marginTop: "1rem" }} >
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Fragment> : <Fragment>
                                    <div className="col-12">
                                        <h1 className="display-4 mb-10 text-center">Reset Password</h1>
                                    </div>

                                    <Form style={{ width: "100%", marginTop: "2rem" }}
                                    // onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password size="large" placeholder="password" />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password size="large" placeholder="Confirm Password" />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{ width: "100%", marginTop: "1rem" }} >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Fragment>
                            }

                            <div className="col-12">
                                <div className="rui-sign-or">or</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20 text-grey-5">
                        Already have an account? <Link to="/auth/login" className="text-2">Sign In</Link>
                        <br />
                        <h5 className="text-center mt-3 mb-3">Or</h5>
                        Don&apos;t you have an account? <Link to="/auth/signup" className="text-2">Sign Up</Link>

                    </div>

                    {
                general ? <footer class="rui-footer">
                    <div class="container-fluid">
                        <p class="mb-0">{general.login_page_footer_copyright_year} ©
                            <a href={general.login_page_footer_copyright_url} target="_blank">{general.login_page_footer_copyright_title}</a>.</p>
                    </div>
                </footer> : ''
            }

                </div>
            </div>

            
        </>

    )
}
