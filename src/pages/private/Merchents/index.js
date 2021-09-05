import React, { Fragment, useState,useEffect } from 'react';
import {Table, Space, Select, Form, Button, Input, DatePicker, Modal } from 'antd';
import { MERCHENT_LIST, USER_STATUS_UPDATE } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { useHistory, Link } from "react-router-dom";
import { alertPop } from '../../../scripts/helper';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Merchents() {
    const history = useHistory();
    const [marchents, setMerchents ] = useState();
      
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
            title: 'Status',
            dataIndex: 'status_title',
            key: 'status_title',
        },
        {
            title: 'Approve',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => updateStatus(record.id, record.status)}>Update Status</Button>
                    <Link to={`update-merchents/${record.id}`}>Update</Link>
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

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getMerchents = async () => {
        let res = await postData(MERCHENT_LIST, {});

        if (res) setMerchents(res.data.data);
    }

    useEffect(() => {
        getMerchents()
    }, []);

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Merchents</h1>
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
                        <Button onClick={() => {history.push('/create-merchents')}} className="btn-brand btn-block float-right mb-20" size="large" 
                            type="primary" style={{width: "300px"}}> Add Merchent </Button>
                    </div>

                    <Table dataSource={marchents} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
