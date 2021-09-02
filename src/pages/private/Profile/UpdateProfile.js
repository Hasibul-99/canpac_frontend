import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Upload } from "antd";
import demo from "../../../assets/images/avatar-1-profile.png"
import { UploadOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";

export default function UpdateProfile() {
    const formRef = React.createRef();
    const {user, getUserInfo, setUserInfo} = useContext(authContext);
    const [userlogInfo, setUserlogInfo] = useState();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const props = {
        beforeUpload: file => {
            // return (file.type === 'image/png' || file.type === 'image/jpg') ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
            console.log(info.fileList);
        },
    };

    const onFill = () => {
        formRef.current.setFieldsValue({
            name: user?.name,
            comapny_name: user?.comapny_name,
            email: user?.email,
            phone: user?.phone,
        });
    };

    useEffect(() => {
        setUserInfo();
    }, []);

    useEffect(() => {
        onFill()
    }, [user])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Update Profile</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="row xs-gap">
                        <div className="col-sm">
                            <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                <Form style={{width: "100%", marginTop: "2rem"}}
                                    ref={formRef}
                                    layout={'vertical'}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please Input Your Name!' }]}
                                        // initialValue={userlogInfo?.name}
                                    >
                                        <Input size="large" placeholder="Enter Name" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input email!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Email" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input phone!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Phone" />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        label="Company Name"
                                        name="comapny_name"
                                        rules={[{ required: false, message: 'Please input company name!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Company Name" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                            Update
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                <div className="rui-profile">
                                    <div className="rui-profile-img m-auto">
                                        <img src={user?.real_image_url || demo} alt=""/>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <Upload {...props} accept="image/*">
                                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                                    </Upload>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
