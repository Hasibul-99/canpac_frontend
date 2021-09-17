import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { WEEK_REPORT } from '../../../scripts/api';

const { RangePicker } = DatePicker;



export default function WeeklyReport() {
    const [report, setReport] = useState();

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
          dataIndex: 'sales_order_no',
          key: 'sales_order_no',
        },
        {
          title: 'Customer',
          dataIndex: 'Customer Name',
          key: 'Customer ID',
        },
        {
          title: 'Product name',
          dataIndex: 'Product name',
          key: 'Product Code',
        },
        {
            title: 'Date',
            dataIndex: 'Production Due Date (ngày hoàn thành)',
            key: 'Production Due Date (ngày hoàn thành)',
        },
        {
            title: 'Order Quantity (can)',
            dataIndex: 'Stock',
            key: 'Stock',
        },
        {
            title: 'Status',
            dataIndex: 'age',
            key: 'address',
        },
    ];

    const getReport = async () => {
      let res = await postData(WEEK_REPORT, {});

      if (res) {
        setReport(res.data.data);
      }
    }

    useEffect(() => {
      getReport()
    }, [])

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
                    <Table dataSource={report} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
