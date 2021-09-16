import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Upload } from "antd";
import demo from "../../../assets/images/avatar-1.png"
import { UploadOutlined } from '@ant-design/icons';
import { authContext } from "../../../context/AuthContext";
import { postData } from '../../../scripts/api-service';
import { USER_PROFILE } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';

export default function UpdateProfile() {
    const formRef = React.createRef();
    const {user, getUserInfo, setUserInfo} = useContext(authContext);
    const [file, setfile] = useState();
    const [imageBase64, setImageBase64] = useState();

    const onFinish = async (values) => {
        let data = new FormData();
        
        if (file) data.append('image', file); 
        data.append('name', values.name);
        data.append('email', values.email); 
        data.append('phone', values.phone); 
        data.append('company_name', values.company_name); 

        let res = await postData(USER_PROFILE, data);

        if (res) {
            alertPop('success', "Profile Update Successfully!");
        }
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
            company_name: user?.company_name,
            email: user?.email,
            phone: user?.phone,
        });
    };

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    const profilePreview = async ({file}) => {
        setfile(file.originFileObj);
        let preview = await getBase64(file.originFileObj);
        setImageBase64(preview);
    }

    useEffect(() => {
        setUserInfo();
    }, []);

    useEffect(() => {
        if (user) onFill()
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
                                        name="company_name"
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
                                        <img src={ imageBase64 ? imageBase64 : user?.real_image_url ? user?.real_image_url : demo} alt=""/>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <Upload {...props} accept="image/*" onChange={profilePreview}>
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
