import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Avatar, Image  } from 'antd';
import {USER_LIST} from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import { useHistory } from "react-router-dom";

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Users() {
    const history = useHistory();
    let [users, setUsers] = useState([]);
      
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
            title: 'Status',
            dataIndex: 'status_title',
            key: 'id',
        },
        {
            title: 'Approve',
            render: (text, record) => (
                <Space size="middle">
                  <Link to={"/update-user/" + record.id}>Update</Link>
                </Space>
            )
        },
    ];

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
                        <Button onClick={() => {history.push('/users-create')}} className="btn-brand btn-block float-right mb-20" size="large" 
                            type="primary" style={{width: "300px"}}> Add User </Button>
                    </div>

                    <Table dataSource={users} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
