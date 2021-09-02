import React, { Fragment, useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Modal, Button, Input, DatePicker  } from 'antd';
import { ROLE_LIST, ROLE_DELETE } from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {alertPop} from "../../../scripts/helper";

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Roles() {
    const [roles, setRoles] = useState([]);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Gyard Name',
          dataIndex: 'guard_name',
          key: 'age',
        },
        {
            title: 'Permissions',
            render: (text, record) => (
                <Space size="middle">
                  <a>{record?.permissions?.length}</a>
                </Space>
            ),
            key: 'id',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" block>
                        <Link to={'update-role/'+ record.id}>Update</Link>
                    </Button>
                    <Button type="link" danger onClick={() => showDeleteConfirm(record.id)} >
                        Delete
                    </Button>
                </Space>
            )
        },
    ];

    const showDeleteConfirm = (roleId) => {
        confirm({
            title: 'Are you sure delete this Role?',
            icon: <ExclamationCircleOutlined />,
            content: 'You will not get this Role back.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              let res = postData(ROLE_DELETE, {id: roleId});

              if (res) {
                alertPop("success", "Role Deleted Successfully");
                setTimeout(() => {
                    getRoles();
                }, 500);
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const getRoles = async () => {
        let res = await postData(ROLE_LIST, {});

        if (res) {
            setRoles(res.data.data);
        }
    }

    useEffect(() => {
        getRoles()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Roles</h1>
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
                    {/* <hr/> */}
                    <div className="my-20">
                        <Link to="/create-role">
                            <Button className="btn-brand btn-block float-right mb-20" size="large" 
                                type="primary" style={{width: "300px"}}>Create Role</Button>
                        </Link>
                    </div>

                    <Table dataSource={roles} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
