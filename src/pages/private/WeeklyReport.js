import React, { Fragment } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';

const { RangePicker } = DatePicker;



export default function WeeklyReport() {
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
    ];

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Weekly Report</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="mb-20">
                        <DatePicker size="large" picker="week" style={{width: "300px"}} />
                    </div>
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
