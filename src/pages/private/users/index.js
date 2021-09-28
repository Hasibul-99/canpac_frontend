import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Avatar, Image, Modal, Tag, Switch } from 'antd';
import {USER_LIST, USER_STATUS_UPDATE, EMAIL_CONFIRMATION_RESENT} from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import { useHistory } from "react-router-dom";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { alertPop } from '../../../scripts/helper';
import moment from "moment";

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Users() {
    const history = useHistory();
    let [users, setUsers] = useState([]);
      
    const resendVerification = async (userId) => {
        let res = await postData(EMAIL_CONFIRMATION_RESENT, {
            id: userId
        });

        if (res) {
            alertPop('success', "E-mail sented Successfully")
        }
    };

    const columns = [
        {
            title: 'Name',
            render: (text, record) => (
                <div>
                    {record?.thumb_image_url && <Avatar src={record?.thumb_image_url} />}
                    <span className="ml-10">{record.name}</span>
                </div>
              )
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
            title: 'Company Name',
            dataIndex: 'company_name',
            key: 'id',
        },
        {
            title: 'Email Verified',
            key: 'id',
            render: (text, record) => <>
                {
                    !record.email_verified_at ? 
                    <Button size="small" type="primary" className="btn-warning" onClick={() => resendVerification(record.id)}>Resend</Button> : 
                    moment(record.email_verified_at).format("YYYY-MM-DD")
                }
            </>
        },
        {
            title: 'Status',
            key: 'id',
            render: (text, record) => <>
                {
                    record.status_title === 'Inactive' ? 
                    <Button size="small" type="primary" danger onClick={() => updateStatus(record.id, record.status)}>{record.status_title}</Button> : 
                    <Button size="small" type="primary" style={{backgroundColor: "#2fc787", borderColor: "#2fc787"}} onClick={() => updateStatus(record.id, record.status)}>{record.status_title}</Button>
                }
            </>
        },
        {
            title: 'Approve',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button type="link" onClick={() => updateStatus(record.id, record.status)}>Update Status</Button> */}
                    <Button type="primary" className="btn-brand">
                        <Link to={"/update-user/" + record.id}>Update</Link>
                    </Button>
                </Space>
            )
        },
    ];

    const updateStatus = (userId, statusId) => {
        confirm({
            title: 'Do you Want to update this user status',
            icon: <ExclamationCircleOutlined />,
            content: `${statusId == 1 ? "User will Inactive after this action" : "User will Active after this action" } `,
            onOk() {
              let res = postData(USER_STATUS_UPDATE, {
                  id: userId,
                  status: (statusId * 1) ? 0 : 1
              });

              if (res) {
                  alertPop('success', 'Status updated successfull');

                  getUsersList();
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const getUsersList = async (query = {}) => {
        let res = await postData(USER_LIST, query);

        if (res) setUsers(res.data.data);
    };

    useEffect(() => {
        getUsersList()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>User List</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Name" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Email" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Phone" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Select
                                    size="large"
                                    // mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Select Status"
                                    >
                                    {children}
                                </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                
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
                        <Button onClick={() => {history.push('/users-create')}} className="btn-brand btn-block float-right mb-20" size="large" 
                            type="primary" style={{width: "300px"}}> Add User </Button>
                    </div>

                    <Table dataSource={users} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
