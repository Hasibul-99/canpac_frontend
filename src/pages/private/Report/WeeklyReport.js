import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Table, Space, Select, Form, Button, Input, DatePicker } from 'antd';
import { postData, getData } from '../../../scripts/api-service';
import { WEEK_REPORT, WEEKLY_REPORT_EXPORT, draft_report, DROPDOWN_LIST } from '../../../scripts/api';
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
  const { user, permissions, getUserInfo } = useContext(authContext);

  const token = Cookies.get("canpacToken") || "";

  const [report, setReport] = useState();
  const [dateRange, setDateRange] = useState({
    start_date: moment().startOf('week').format('YYYY-MM-DD'),
    end_date: moment().endOf('week').format('YYYY-MM-DD')
  });
  const [exportData, setExportData] = useState([]);
  const [customer, setCustomer] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();

  const columns = [
    {
      title: 'Order NO',
      dataIndex: 'OriginNum',
      key: 'OriginNum',
    },
    {
      title: 'Customer',
      key: 'CardName',
      render: (text, record) => (
        <span>
          {record.CardName} - {record.CardCode}
        </span>
      )
    },
    {
      title: 'Product',
      key: 'Product Code',
      render: (text, record) => (
        <span>
          {record.ItemName} - {record.ItemCode}
        </span>
      )
    },
    {
      title: 'Production Due Date',
      dataIndex: 'DueDate',
      key: 'DueDate',
    },
    {
      title: 'Product Order',
      dataIndex: 'PlannedQty',
      key: 'PlannedQty',
    },
    {
      title: 'Stock',
      dataIndex: 'CmpltQty',
      key: 'CmpltQty',
    },
    {
      title: 'Weight',
      dataIndex: 'SWeight1',
      key: 'SWeight1',
    },
    {
      title: 'Thickness',
      dataIndex: 'SWidth1',
      key: 'SWidth1',
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
    let data = dateRange;
    data.customer = selectedCustomer;

    let res = await postData(WEEK_REPORT, data);

    if (res) {
      // setReport(res.data.data);
      // let masterData = reportData.data;
      let masterData = res.data.data;

      let printed_sheet = masterData.printed_sheet;
      let can_stock = masterData.can_stock;

      console.log("printed_sheet", [...printed_sheet, ...can_stock]);

      setReport([...printed_sheet, ...can_stock]);

      if (canView('Weekly Report | Export')) {
        getReportData()
      }
    }
  }

  const getReportData = async () => {
    let query = buildSearchQuery(dateRange);
    let url = WEEKLY_REPORT_EXPORT + `?${query}&customer=${selectedCustomer}`;
    let res = await getData(url);

    if (res) {
      let masterData = res.data.data;

      console.log("masterData", masterData);
      console.log("reportData", reportData);

      setExportData(masterData || [])
    }
  }

  const generateReport = async () => {
    // =======================================================================================================
    // const doc = new jsPDF();

    // //get table html
    // const pdfTable = document.getElementById('divToPrint');
    // //html to pdf format
    // var html = htmlToPdfmake(pdfTable.innerHTML);

    // const documentDefinition = { content: html };
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.createPdf(documentDefinition).open();

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

    TableToExcel.convert(document.getElementById("divToPrint"), {
      name: `Weekly-report-${moment().format('YYYY-MM-DD--HH-mm-ss')}.xlsx`,
      sheet: {
        name: "Sheet 1"
      }
    });
  }

  const sarchByCustomer = (e) => {
    console.log(e);
    setSelectedCustomer(e);
  }

  const getCustomer = async () => {
    let res = await postData(DROPDOWN_LIST, {
      data_type: "customer"
    })

    if (res) {
      setCustomer(res.data.data);
    }
  }

  const numberRound = (num = 0.00) => {
    if (num) return parseFloat(num).toFixed(1);
  }

  useEffect(() => {
    getCustomer();
  }, [])

  useEffect(() => {
    if (!canView('Weekly Report | Filter By Customer')) {
      setSelectedCustomer(user?.id);
    }
  }, [user])

  useEffect(() => {
    if (selectedCustomer) getReport();
  }, [dateRange, selectedCustomer])

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
            {/* <span>
                        <DatePicker size="large" onChange={onChange} defaultValue={moment()} className="mr-20" 
                          allowClear={false} picker="week" style={{width: "300px"}} />
                      </span> */}

            <span className="">
              {
                canView('Weekly Report | Filter By Customer') ? <Select
                  size="large"
                  allowClear
                  // mode="multiple"
                  dropdownMatchSelectWidth={false}
                  style={{ width: '300px' }}
                  placeholder="Search Customer"
                  onChange={sarchByCustomer}
                >
                  {
                    customer?.length && customer.map(role => <Option key={role.id} value={role.id}>{role.name}</Option>)
                  }
                </Select> : ''
              }

            </span>
            {
              canView('Weekly Report | Export') &&
                (exportData?.can_stock?.length || exportData?.printed_sheet?.length) ? <div className="float-right">
                <Button type="primary" className="btn-brand btn-block float-right mb-20"
                  onClick={() => generateReport()} size="large">Generate Report</Button>
              </div> : null
            }
          </div>
          {
            selectedCustomer ? <Table dataSource={report}
              columns={columns} /> : <div className='pt-40 text-center'><h3 >Please first select customer</h3></div>
          }
        </div>
      </div>

      <div id="divToPrint" className="export-weekreprot " data-cols-width="10, 30, 20, 20, 30, 20">
        <table style={{ border: "3px" }}>
          <tr>
            <td class="text-center font12" data-a-h="center" data-f-bold="true"
              style={{ textAlign: "center", border: "none", width: "475.50pt" }} colspan="6">
              <h3>CANPAC VIETNAM Co.,LTD.</h3>
            </td>
          </tr>
          <tr>
            <td colspan="6" data-a-h="center">
              <p>Address (Địa chỉ): No.09, Vsip II-A, 15 road, Viet Nam -Singapore Industrial Park II-A, Tan Uyen Town, Binh Duong Provine</p>
            </td>
          </tr>
          <tr>
            <td data-a-h="center" colspan="6">
              <p>Tel (ĐT): 0650 380 1166 Fax: 0650.380 1169</p>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
          <tr>
            <td data-f-bold="true" data-f-sz="14" colspan="7" data-a-h="center" class="text-center" style={{ textAlign: "center", border: "none" }}>
              <br />
              <h1>WEEKLY STOCK ADVICE</h1>
              <br />
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </table>

        <table>
          <tr>
            <th>To:</th>
            <th colspan="3">{exportData?.customer?.name}</th>
          </tr>
          <tr>
            <th>Phone:</th>
            <th colspan="3">{exportData?.customer?.phone}</th>
          </tr>
          <tr>
            <th>Date:</th>
            <th colspan="3">{moment(exportData?.customer?.report_print_date).format("DD/MM/YYYY")}</th>
          </tr>
          <tr>
            <td></td>
          </tr>
        </table>
        <br />

        <table class="table-border" border="0" cellspacing="0">
          <tr data-height="60" data-b-a-s="BORDER_STYLES">
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">No.</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle" rowspan="1">Description</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Pending Printing order</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Can Stock</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Weight Standard(+5g)</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Thickness(mm)</th>
          </tr>
          <tr data-height="60" data-b-a-s="BORDER_STYLES">
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Stt</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Diễn Giải</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">SL Đơn hàng in</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">SL Lon TP</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Trọng Lượng chuẩn(+5g)</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Độ dày</th>

            <th  data-f-bold="false" data-a-v="middle" 
              style={{width: '3rem'}}></th>

            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">NO</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Product name</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Can Stock</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Total Can Stock & Printed Sheet</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">QTY per sheet</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Weight Standard(g)</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Thikness(mm)</th>
          </tr>
          {
            exportData?.can_stock?.map((data, i) => <>
              <tr key={'first-' + i}>
                <td>{i + 1}</td>
                <td>
                  {data.ItemName} - {data.ItemCode}
                </td>
                <td></td>
                <td>{numberRound(data.CmpltQty)}</td>
                <td>{numberRound(data.SWeight1)}</td>
                <td>{numberRound(data.SWidth1)}</td>
                <td></td>

                <td>{i + 1}</td>
                <td>
                  {data?.product_stock?.product_display_name}
                </td>
                <td>{data?.product_stock?.stock}</td>
                <td>{data?.product_stock?.quantity_of_product_per_sheet}</td>
                <td>{data?.product_stock?.qty_per_sheet}</td>
                <td>{numberRound(data?.product_stock?.weight)}</td>
                <td>{numberRound(data?.product_stock?.thickness)}</td>
              </tr>
            </>)
          }

          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>

        <br />
        <br />

        <table class="table-border" border="0" data-b-r-s="medium">
          <tr data-height="60" data-b-r-s="medium">
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">No.</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Description</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Printed Sheet (Body Blank)</th>
            <th data-b-a-s="medium" data-b-r-s="medium" data-f-bold="true" data-a-v="middle">Total of body blank & can stock</th>
          </tr>
          <tr data-height="60">
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Stt</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Diễn Giải</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">SL Tấm Thép đã in</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Tổng SL tấm thép đã in & lon TP</th>
          
            <th  data-f-bold="false" data-a-v="middle" 
              style={{width: '3rem'}}></th>

            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">NO</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Product name</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Can Stock</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Total Can Stock & Printed Sheet</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">QTY per sheet</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Weight Standard(g)</th>
            <th data-b-a-s="medium" data-f-bold="true" data-a-v="middle">Thikness(mm)</th>
          </tr>
          {
            exportData?.printed_sheet?.map((data, i) => <tr key={i} style={{ border: ".5px solid black", borderCollapse: "collapse" }}>
              <td class="xl89">{i + 1}</td>
              <td className="xl88" width="500" style={{ width: "500px" }}>
                {data.ItemName} - {data.ItemCode}
              </td>
              <td>{numberRound(data.CmpltQty)}</td>
              <td></td>
              <td></td>

              <td>{i + 1}</td>
              <td>
                {data?.product_stock?.product_display_name}
              </td>
              <td>{data?.product_stock?.stock}</td>
              <td>{data?.product_stock?.quantity_of_product_per_sheet}</td>
              <td>{data?.product_stock?.qty_per_sheet}</td>
              <td>{numberRound(data?.product_stock?.weight)}</td>
              <td>{numberRound(data?.product_stock?.thickness)}</td>
            </tr>)
          }
        </table>
      </div>
    </Fragment>
  )
}
