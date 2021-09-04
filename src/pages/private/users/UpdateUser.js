import React, { Fragment, useEffect, useState } from 'react'
import { Form, Input, Button, Upload, Select } from "antd";
import { alertPop, getBase64 } from '../../../scripts/helper';
import { postData } from '../../../scripts/api-service';
import { UploadOutlined } from '@ant-design/icons';
import { ROLE_LIST, USER_CREATE, USER_LIST, USER_UPDATE } from '../../../scripts/api';
import demo from "../../../assets/images/avatar-1-profile.png";
import { useHistory, useParams } from "react-router-dom";

const { Option } = Select;

export default function UpdateUser() {
    const history = useHistory();
    let { userId } = useParams();
    const [form] = Form.useForm();
    const [file, setfile] = useState();
    const [imageBase64, setImageBase64] = useState();
    const [roles, setRoles] = useState();
    const [ userInfo, setUserInfo ] = useState();


    const profilePreview = async ({file}) => {
        setfile(file.originFileObj);
        let preview = await getBase64(file.originFileObj);
        setImageBase64(preview);
    }

    const onFinish = async (values) => {
        console.log("value", values);
        let data = new FormData();
        
        if (file) data.append('image', file); 
        data.append('name', values.name);
        data.append('email', values.email); 
        data.append('phone', values.phone); 
        data.append('comapny_name', values.comapny_name); 
        data.append('role', values.role);

        data.append('id', userId);

        let res = await postData(USER_UPDATE, data);

        if (res) {
            alertPop('success', "User Updated Successfully!");
            history.push('/users');
        }
    };

    const getRoles = async () => {
        let res = await postData(ROLE_LIST, {});
        if (res) setRoles(res.data.data);
    }

    const getUsers = async () => {
        let res = await postData(USER_LIST, {});

        if (res) {
            let masterData = res.data.data || [];
            let user = masterData.find(use => use.id == userId);
            setUserInfo(user);
            form.setFieldsValue({
                company_name: user.company_name,
                email: user.email,
                name: user.name,
                phone: user.phone,
                email: user.email,
                role: user.roles[0].name,
            });
        }
    }

    useEffect(() => {
        getRoles();
        getUsers()
    }, [])
    
    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Add User</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%", marginTop: "2rem"}}
                        form={form}
                        layout={'vertical'}
                        onFinish={onFinish}
                    >
                        <div className="row xs-gap">
                            <div className="col-sm">
                                <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please Input Your Name!' }]}
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
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                    <Form.Item
                                            label="Role"
                                            name="role"
                                            rules={[{ required: true, message: 'Please input company name!' }]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                placeholder="Select a role"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {roles && roles.map(per => <Option key={per.id} value={per.name}>{per.name}</Option>)}
                                            </Select>
                                    </Form.Item>
                                    <hr/>

                                    <div className="rui-profile mt-10">
                                        <div className="rui-profile-img m-auto">
                                            <img src={ imageBase64 ? imageBase64 : userInfo?.thumb_image_url ? userInfo?.thumb_image_url : demo} alt=""/>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Upload accept="image/*" onChange={profilePreview}>
                                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row xs-gap">
                            <div className="col-sm">
                                <Form.Item>
                                    <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                        Add User
                                    </Button>
                                </Form.Item>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
