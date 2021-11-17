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
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import TableToExcel from "@linways/table-to-excel";
import reportData from "./week.json";

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
    const [exportData, setExportData] = useState([]);

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
        getReportData()
      }
    }

    const getReportData = async () => {
      let query = buildSearchQuery(dateRange);
      let url = WEEKLY_REPORT_EXPORT + `?${query}`;
      let res = await getData( url );

      if (res) {
        let masterData = res.data.data;

        console.log("masterData", masterData);
        console.log("reportData", reportData);
      
        setExportData(masterData || [])
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
      
      // const base_url = process.env.REACT_APP_BASE;
      // let query = buildSearchQuery(dateRange);

      // let url = base_url + WEEKLY_REPORT_EXPORT + `?${query}`;
      // window.open(url, '_blank'); 
// =======================================================================================================
      const doc = new jsPDF();
         
      //get table html
      const pdfTable = document.getElementById('divToPrint');
      //html to pdf format
      var html = htmlToPdfmake(pdfTable.innerHTML);
    
      const documentDefinition = { content: html };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

      // ===================================================================================================
      // let filename ="hello",
      //     tableID = "divToPrint";

      // var downloadLink;
      // var dataType = 'application/vnd.ms-excel';
      // var tableSelect = document.getElementById(tableID);
      // var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
      
      // // Specify file name
      // filename = filename?filename+'.xlsx':'excel_data.xls';
      
      // // Create download link element
      // downloadLink = document.createElement("a");
      
      // document.body.appendChild(downloadLink);
      
      // if(navigator.msSaveOrOpenBlob){
      //     var blob = new Blob(['\ufeff', tableHTML], {
      //         type: dataType
      //     });
      //     navigator.msSaveOrOpenBlob( blob, filename);
      // }else{
      //     // Create a link to the file
      //     downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
      
      //     // Setting the file name
      //     downloadLink.download = filename;
          
      //     //triggering the function
      //     downloadLink.click();
      // }

      // ========================================================================================

      // TableToExcel.convert(document.getElementById("divToPrint"), {
      //   name: "table1.xlsx",
      //   sheet: {
      //     name: "Sheet 1"
      //   }
      // });
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
            
            <div id="divToPrint" className="d-none export-weekreprot">
              <table style={{border: "3px"}}>
                  <tr>
                      <td class="text-center" style={{textAlign: "center", border: "none" }}>
                          <h3>CANPAC VIETNAM Co.,LTD.</h3>
                          <p>Address (Ñòa chæ): No.09, Vsip II-A, 15 road, Viet Nam -Singapore Industrial Park II-A, Tan Uyen Town,
                              Binh Duong Provine</p>
                          <p>Tel (ÑT): 0650 380 1166 Fax: 0650.380 1169</p>
                      </td>
                    {/* </tr>
                    <tr>
                      <td>
                      <p>Address (Ñòa chæ): No.09, Vsip II-A, 15 road, Viet Nam -Singapore Industrial Park II-A, Tan Uyen Town,
                              Binh Duong Provine</p>
                      </td>
                      </tr>
                      <tr>
                      <td>
                      <p>Tel (ÑT): 0650 380 1166 Fax: 0650.380 1169</p>
                      </td> */}
                  </tr>
                  <tr>
                      <td class="text-center" style={{textAlign: "center", border: "none" }}>
                          <br/>
                          <h1>WEEKLY STOCK ADVICE</h1>
                          <br/>
                          <br/>
                      </td>
                  </tr>
              </table>

              <table class="table-border" border="0" cellspacing="0" >
                  <tr style={{border: ".5px solid black", borderCollapse: "collapse"}}>
                      <th>No.</th>
                      <th>Description</th>
                      <th>Pending Printing order</th>
                      <th>"Printed Sheet (Body Blank)"</th>
                      <th>"Can Stock"</th>
                      <th>Total of body blank & can stock</th>
                      <th>"Weight Standard(+5g)"</th>
                  </tr>
                  <tr style={{border: ".5px solid black", borderCollapse: "collapse"}}>
                      <th>Stt</th>
                      <th>Diễn Giải</th>
                      <th>SL Đơn haøng in</th>
                      <th>SL Taám Theùp ñaõ In</th>
                      <th>"SL Lon TP"</th>
                      <th>Tổng SL tấm theùp ñaõ in & lon TP</th>
                      <th>"Trọng Lượng chuẩn(+5g) "</th>
                  </tr>
                  {
                    exportData.map((data, i) => <tr style={{border: ".5px solid black", borderCollapse: "collapse"}}>
                        <td>{i + 1}</td>
                        <td>{data.sales_order_no}</td>
                        <td>AAA</td>
                        <td>aaa</td>
                        <td>AAA</td>
                        <td>{i + 1}</td>
                        <td>{i + 1}</td>
                    </tr>)
                  }
              </table>
            </div>
        </Fragment>
    )
}
