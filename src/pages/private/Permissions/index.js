import React, { Fragment, useEffect, useState, useContext  } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Spin, Button, Input, DatePicker, Modal } from 'antd';
import { PERMISSION_LIST, PERMISSION_CREATE, PERMISSION_UPDATE, PERMISSION_DELETE } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { alertPop, checkUserPermission } from '../../../scripts/helper';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { authContext } from '../../../context/AuthContext';

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Permissions(permissionId) {
    const { permissions } = useContext(authContext);
    const formRef = React.createRef();
    const [form] = Form.useForm();
    // const formRefUpdate = React.createRef();
    const [changepassModal, setChangepassModal] = useState(false);
    const [permissionList, setPermissions]=  useState();
    const [updatePermission, setUpdatePermission] = useState();
    const [selectedPermission, setSelectedPermission] = useState();
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

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

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

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
                    <Button type="primary" className="btn-brand" disabled={!canView('Permission - Update')}
                        block onClick={() => updatePermis(record)}>
                        Update
                    </Button>
                    <Button danger onClick={() => showDeleteConfirm(record.id)} disabled={!canView('Permission - Delete')}>
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
        setIsLoading(true);
        let res = await postData(PERMISSION_LIST, search);
        if (res) {
            setIsLoading(false);
            setPermissions(res?.data?.data);
        }
    }
    
    const generateSearchObj = (name, value) => {
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    useEffect(() => {
        getPermissions()
    }, [search]) 

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Permissions</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-4 mb-10">
                                <Input size="large" placeholder="Type Permission Name" onPressEnter={(e) => generateSearchObj('name', e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {
                        canView('Permission - Creat') ? <div className="my-20">
                            <Button onClick={() => setChangepassModal(true)} className="btn-brand btn-block float-right mb-20" size="large" 
                                type="primary" style={{width: "300px"}}>Create Permissions</Button>
                        </div> : ''
                    }

                    {
                        isLoading ? <div className="loading-content">
                            <Spin size="large" className="mr-20" />
                            <Spin size="large" className="mr-20"/>
                            <Spin size="large" className="mr-20"/>
                        </div> : <Table dataSource={permissionList} columns={columns} />
                    }
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
