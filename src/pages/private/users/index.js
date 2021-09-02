import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker, Avatar, Image  } from 'antd';
import {USER_LIST} from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Users() {
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
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        </ol>
                    </nav>
                    <h1>Product Stock</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="d-none">
                        <h3>Filter</h3>
                        <Form style={{width: "100%", marginTop: "2rem"}}
                            layout={'vertical'}
                            onFinish={onFinish}
                            >
                            <div className="row xs-gap mt-20">
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="name"
                                        rules={[{ required: false }]}
                                    >
                                        <Input size="large" placeholder="Seatch by Name" />   
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: false }]}
                                    >
                                        <Input size="large" placeholder="Seatch by Email" />   
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="phone"
                                        rules={[{ required: false }]}
                                    >
                                        <Input size="large" placeholder="Seatch by Phone" />   
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="Company Name"
                                        rules={[{ required: false }]}
                                    >
                                        <Input size="large" placeholder="Seatch by Company Name" />   
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <Select
                                            size="large"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Status"
                                            >
                                            <Option key={1} value="1">Active</Option>
                                            <Option key={0} value="0">Inactive</Option>
                                        </Select>
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10"></div>

                                <div className="col col-sm-12 col-lg-3 mb-10">
                                    <Button className="btn-light btn-block" size="large" 
                                            type="primary" htmlType="submit" >
                                            Reset Filter
                                    </Button>
                                </div>

                                <div className="col col-sm-12 col-lg-3 mb-10">
                                    <Form.Item>
                                        <Button className="btn-brand btn-block float-right" size="large" 
                                            type="primary" htmlType="submit">
                                            Filter
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <Table dataSource={users} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
