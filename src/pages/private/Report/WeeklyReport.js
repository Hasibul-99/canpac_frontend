import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData, getData} from '../../../scripts/api-service';
import { WEEK_REPORT, WEEKLY_REPORT_EXPORT, draft_report } from '../../../scripts/api';
import moment from "moment";
import { saveAs } from 'file-saver';
import Cookies from "js-cookie";
import { buildSearchQuery, checkUserPermission } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';

const { RangePicker } = DatePicker;
const { Option } = Select;


export default function WeeklyReport() {
    const { permissions } = useContext(authContext);

    const token = Cookies.get("canpacToken") || "";
    
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

    const canView = (context) => {
      return checkUserPermission(context, permissions);
    };

    const getReport = async () => {
      let res = await postData(WEEK_REPORT, dateRange);

      if (res) {
        setReport(res.data.data);
      }
    }

    const generateReport = async () => {
      // console.log("hello");
      // let res = await getData( draft_report );

      // if (res) {
      //   console.log(res.data);

      //   let json = JSON.stringify(res.data)
      //   let buffer = Buffer.from(JSON.parse(json))
      //   let read = buffer.toString('utf8')
      //   let blob = new Blob([read]);

      //   console.log("blob", blob);

      //   saveAs(blob, 'fileName.xlsx');
      // }
      // window.open(`https://canpac-inventory-backoffice.smartdemo.xyz/api/v1/report/weekly/export?api_token=${token}`, '_blank');
      
      const base_url = process.env.REACT_APP_BASE;
      let query = buildSearchQuery(dateRange);

      let url = base_url + WEEKLY_REPORT_EXPORT + `?${query}`;
      window.open(url, '_blank'); 
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
                        {
                          canView('Weekly Report | Export') ? <div className="float-right">
                            <Button type="primary" className="btn-brand btn-block float-right mb-20" 
                            onClick={() => generateReport()} size="large">Generate Report</Button>
                          </div> : null
                        }                        
                    </div>
                    <Table dataSource={report} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
