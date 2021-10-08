import React, { Fragment, useState,useEffect, useContext } from 'react';
import {Table, Space, Select, Form, Button, Input, DatePicker, Modal } from 'antd';
import { MERCHENT_LIST, USER_STATUS_UPDATE, EMAIL_CONFIRMATION_RESENT, DROPDOWN_LIST } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { useHistory, Link } from "react-router-dom";
import { alertPop, checkUserPermission } from '../../../scripts/helper';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import { authContext } from '../../../context/AuthContext';

const { confirm } = Modal;
const { Option } = Select;

export default function Merchents() {
    const { permissions } = useContext(authContext);
    const history = useHistory();
    const [marchents, setMerchents ] = useState();
    const [search, setSearch] = useState();
    const [roles, setRoles] = useState();

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
            key: '',
            render: (text, record) => <>
                {
                    record.status_title === 'Inactive' ? 
                    <Button size="small" type="primary" danger disabled={!canView('Merchant - Approval')}
                        onClick={() => updateStatus(record.id, record.status)}>{record.status_title}</Button> : 
                    <Button size="small" type="primary" disabled={!canView('Merchant - Approval')} 
                        style={{backgroundColor: "#2fc787", borderColor: "#2fc787"}} onClick={() => updateStatus(record.id, record.status)}>{record.status_title}</Button>
                }
            </>
        },
        {
            title: 'Approve',
            key: 'update',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button type="link" onClick={() => updateStatus(record.id, record.status)}>Update Status</Button> */}
                    <Button type="primary" className="btn-brand">
                        <Link to={`update-merchents/${record.id}`}>Update</Link>
                    </Button>
                </Space>
              )
        },
    ].filter(item => !canView('Merchant - Update') ? item.key !== 'update' : item);

    const resendVerification = async (userId) => {
        let res = await postData(EMAIL_CONFIRMATION_RESENT, {
            id: userId
        });

        if (res) {
            alertPop('success', "E-mail sented Successfully")
        }
    };

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
                  setTimeout(() => {
                    getMerchents();
                  }, 500)  
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const getMerchents = async () => {
        let res = await postData(MERCHENT_LIST, search);

        if (res) setMerchents(res.data.data);
    }

    const generateSearchObj = (name, value) => {
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    const getRoles = async() => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "role"
        })

        if (res) {
            setRoles(res.data.data);
        }
    }

    const statusSearch = (value) => {
        generateSearchObj('status', value.length ? JSON.stringify(value) : null);
    }
    const sarchByRole = value => {
        generateSearchObj('role', value.length ? JSON.stringify(value) : null)
    }

    useEffect(() => {
        getRoles();
    }, [])

    useEffect(() => {
        getMerchents()
    }, [search]);

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Merchents</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Name" onPressEnter={(e) => generateSearchObj('name', e.target.value)} />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Email" onPressEnter={(e) => generateSearchObj('email', e.target.value)} />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Phone" onPressEnter={(e) => generateSearchObj('phone', e.target.value)} />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Select
                                    size="large"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Search email verified"
                                    onChange={(value) => generateSearchObj('email_verified', value)}
                                    >
                                    <Option key={'Verifed'} value='verifed'>Verifed</Option>
                                    <Option key={'not_verified'} value="not verified">Not Verified</Option>
                                </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Select
                                    size="large"
                                    allowClear
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Search Status"
                                    onChange={statusSearch}
                                    >
                                    <Option key={1} value={"1"}>Active</Option>
                                    <Option key={0} value={"0"}>Inactive</Option>
                                </Select>
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Select
                                    size="large"
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Search Role"
                                    onChange={sarchByRole}
                                    >
                                        {
                                            roles?.length && roles.map(role => <Option key={role.id} value={role.id}>{role.name}</Option>)
                                        }
                                </Select>
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="my-20">
                        {
                            canView('Merchant - Creat') ? <Button onClick={() => {history.push('/create-merchents')}} className="btn-brand btn-block float-right mb-20" size="large" 
                            type="primary" style={{width: "300px"}}> Add Merchent </Button> : ''
                        }
                    </div>

                    <Table dataSource={marchents} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
