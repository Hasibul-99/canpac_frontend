import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Modal } from 'antd';
import { PERMISSION_LIST, PERMISSION_CREATE, PERMISSION_UPDATE, PERMISSION_DELETE } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { alertPop } from '../../../scripts/helper';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Permissions(permissionId) {
    const formRef = React.createRef();
    const [form] = Form.useForm();
    // const formRefUpdate = React.createRef();
    const [changepassModal, setChangepassModal] = useState(false);
    const [permissions, setPermissions]=  useState();
    const [updatePermission, setUpdatePermission] = useState();
    const [selectedPermission, setSelectedPermission] = useState()

    const showDeleteConfirm = (permissionId) => {
        confirm({
            title: 'Are you sure delete this permission?',
            icon: <ExclamationCircleOutlined />,
            content: 'You will not get this permission back.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              let res = postData(PERMISSION_DELETE, {id: permissionId});

              if (res) {
                alertPop("success", "Permission Deleted Successfully");
                setTimeout(() => {
                    getPermissions();
                }, 500);
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    };

    const updatePermis = (permiss) => {
        setSelectedPermission(permiss);
        setUpdatePermission(true);
        
        form.setFieldsValue({
            name: permiss.name,
        });
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Guard Name',
          dataIndex: 'guard_name',
          key: 'guard_name',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" block onClick={() => updatePermis(record)}>
                        Update
                    </Button>
                    <Button type="link" danger onClick={() => showDeleteConfirm(record.id)} >
                        Delete
                    </Button>
                </Space>
              )
        },
    ];

    const onFinish = async (values) => {
        let res = await postData(PERMISSION_CREATE, values)

        if (res) {
            alertPop('success', "Premission Created Successfully!");
            getPermissions();
            setChangepassModal(false);
            formRef.current.resetFields();
        }
    };

    const onUpdateFinish = async (values) => {
        let res = await postData(PERMISSION_UPDATE, {
            id: selectedPermission.id,
            name: values.name
        });

        if (res) {
            alertPop('success', "Permission Updated Successfully!");
            setSelectedPermission(null);
            setUpdatePermission(false);
            form.resetFields();

            setTimeout(() => {
                getPermissions();
            }, 500)
        }
    }

    const getPermissions = async () => {
        let res = await postData(PERMISSION_LIST, {});
        if (res) setPermissions(res?.data?.data)
    }

    useEffect(() => {
        getPermissions()
    }, []) 

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Permissions</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="d-none">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 px-20">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Name" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Status"
                                        >
                                        {children}
                                    </Select>
                                        
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Customers"
                                        >
                                        {children}
                                    </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        // mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Models"
                                        >
                                        {children}
                                    </Select>
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <RangePicker size="large" style={{width: "100%"}} />
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-light btn-block" size="large" 
                                        type="primary">
                                        Reset Filter
                                </Button>
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-brand btn-block float-right" size="large" 
                                    type="primary">
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="my-20">
                        <Button onClick={() => setChangepassModal(true)} className="btn-brand btn-block float-right mb-20" size="large" 
                            type="primary" style={{width: "300px"}}>Create Permissions</Button>
                    </div>
                    
                    <Table dataSource={permissions} columns={columns} />
                </div>
            </div>

            <Modal title="Create Permission"
                visible={changepassModal}
                width="50vw"
                onCancel={() => {setChangepassModal(false);}}
                footer={false}
            >
                <Form style={{width: "100%", marginTop: "2rem"}}
                    ref={formRef}
                    onFinish={onFinish}
                    >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input size="large" placeholder="Name"/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Update Permission"
                visible={updatePermission}
                width="50vw"
                onCancel={() => {setUpdatePermission(false);}}
                footer={false}
            >
                <Form style={{width: "100%", marginTop: "2rem"}}
                    form={form}
                    onFinish={onUpdateFinish}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input size="large" placeholder="Name"/>
                    </Form.Item>

                    <Form.Item>
                        <Button className="btn-brand btn-block" size="large" type="primary"
                             htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                            Update
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
        </Fragment>
    )
}
