import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { WEEK_REPORT } from '../../../scripts/api';

const { RangePicker } = DatePicker;
const { Option } = Select;


export default function WeeklyReport() {
    const [report, setReport] = useState();      
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
            title: 'Production Order',
            dataIndex: 'Production Order',
            key: 'Production Order',
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
                        <DatePicker size="large" className="mr-20" picker="week" style={{width: "300px"}} />

                        <Select
                          size="large"
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Select a person"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="jack">Jack</Option>
                          <Option value="lucy">Lucy</Option>
                          <Option value="tom">Tom</Option>
                        </Select>
                    </div>
                    <Table dataSource={report} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
