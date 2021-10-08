import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { WEEK_REPORT, WEEKLY_REPORT_EXPORT } from '../../../scripts/api';
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;


export default function WeeklyReport() {
    const [report, setReport] = useState();
    const [dateRange, setDateRange] = useState({
      start_date: moment().startOf('week').format('YYYY-MM-DD'),
      end_date: moment().endOf('week').format('YYYY-MM-DD')
    });

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

    function onChange(data) {
      if (data && data._d) {
        setDateRange({
          start_date: moment(data._d).startOf('week').format('YYYY-MM-DD'),
          end_date: moment(data._d).endOf('week').format('YYYY-MM-DD')
        })
      }
    }

    const getReport = async () => {
      let res = await postData(WEEK_REPORT, dateRange);

      if (res) {
        setReport(res.data.data);
      }
    }

    const generateReport = async () => {
      console.log("hello");
      let res = await postData(WEEKLY_REPORT_EXPORT, dateRange);

      if (res) {
        console.log(res.data);
      }
    }

    useEffect(() => {
      getReport()
    }, [dateRange])

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
                        <DatePicker size="large" onChange={onChange} defaultValue={moment()} className="mr-20" 
                          allowClear={false} picker="week" style={{width: "300px"}} />
                          
                        <div className="float-right">
                          <Button type="primary" onClick={() => generateReport()}>Generate Reprot</Button>
                        </div>
                    </div>
                    <Table dataSource={report} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
