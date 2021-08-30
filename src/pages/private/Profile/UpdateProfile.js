import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Upload } from "antd";
import demo from "../../../assets/images/avatar-1-profile.png"
import { UploadOutlined } from '@ant-design/icons';

export default function UpdateProfile() {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const props = {
        beforeUpload: file => {
        if (file.type !== 'image/png') {
            // message.error(`${file.name} is not a png file`);
        }
        return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        },
        onChange: info => {
        console.log(info.fileList);
        },
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
                    <h1>Update Profile</h1>
                </div>
            </div>
            <div className="row xs-gap">
                <div className="col-sm">
                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                        <Form style={{width: "100%", marginTop: "2rem"}}
                            layout={'vertical'}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your Name!' }]}
                            >
                                <Input size="large" placeholder="Enter Name" />
                            </Form.Item>

                            <Form.Item
                                label="Company Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input company name!' }]}
                            >
                                <Input size="large" placeholder="Enter Company Name" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="name"
                                rules={[{ required: true, message: 'Please input email!' }]}
                            >
                                <Input size="large" placeholder="Enter Email" />
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="name"
                                rules={[{ required: true, message: 'Please input phone!' }]}
                            >
                                <Input size="large" placeholder="Enter Phone" />
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
                                <img src={demo} alt=""/>
                            </div>
                        </div>
                        <div className="text-center mt-5">
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Upload png only</Button>
                            </Upload>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
