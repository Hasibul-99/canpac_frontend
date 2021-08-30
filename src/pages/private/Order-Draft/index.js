import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function OrderDraft() {
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Order NO',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Customer',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Product name',
          dataIndex: 'key',
          key: 'address',
        },
        {
            title: 'Date',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Order Quantity (can)',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'age',
            key: 'address',
        },
        {
            title: 'Approve',
            render: (text, record) => (
                <Space size="middle">
                  <a>Approve</a>
                  <a>Cancel</a>
                </Space>
              )
        },
    ];

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                    <div className="">
                        <h3>Filter</h3>
                        <Form style={{width: "100%", marginTop: "2rem"}}
                            layout={'vertical'}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            >
                            <div className="row xs-gap mt-20 px-20">
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <Input size="large" placeholder="Type Order no" />   
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <Select
                                            size="large"
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Status"
                                            >
                                            {children}
                                        </Select>
                                            
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <Select
                                            size="large"
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Customers"
                                            >
                                            {children}
                                        </Select>
                                            
                                    </Form.Item>
                                </div>

                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <Select
                                            size="large"
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Select Models"
                                            >
                                            {children}
                                        </Select>
                                            
                                    </Form.Item>
                                </div>
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Form.Item
                                        name="username"
                                        rules={[{ required: false }]}
                                    >
                                        <RangePicker size="large" style={{width: "100%"}} />                                            
                                    </Form.Item>
                                </div>
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    
                                </div>
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
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
