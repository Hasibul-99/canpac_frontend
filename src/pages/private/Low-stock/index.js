import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Table, Button, Input } from 'antd';
import { getData, postData } from '../../../scripts/api-service';
import { PRODUCT_STOCK_LOW, PRODUCT_STOCK_LOW_EXPORT } from '../../../scripts/api';
import { checkUserPermission } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';
import { CSVLink } from "react-csv";
import moment from 'moment';


const headers = [
  { label: "Product Code of SAP", key: "ItemCode" },
  { label: "Product name", key: "Itemname" },
  { label: "Low Stock", key: "Low Stock" },
];

export default function LowStock() {
  const [products, setProducts] = useState();
  const { permissions } = useContext(authContext);
  const [exportData, setExportData] = useState([]);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product',
      key: 'id',
      render: (record) => <>
        {record?.product_display_name}
      </>
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Quantity (can)',
      dataIndex: 'low_stock',
      key: 'low_stock',
    }
  ];

  const canView = (context) => {
    return checkUserPermission(context, permissions);
  };

  const getProducts = async (query = {}) => {
    let res = await postData(PRODUCT_STOCK_LOW, query);

    if (res) {
      setProducts(res.data.data);
      getProductLowExportData(query);
    }
  }

  const getProductLowExportData = async (query) => {
    let url = PRODUCT_STOCK_LOW_EXPORT;
        if (query?.filter_by) url = url + '?filter_by=' + query?.filter_by; 
        
    let res = await getData(url);

    if (res) {
      console.log("res?.data?.data", res?.data?.data);

      setExportData(res?.data?.data || []);
    }
  };

  const titleEnter = (e) => {
    getProducts({filter_by: e.target.value});
}

const titleChange = (e) => {
    if (!e.target.value) getProducts({});
}

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <Fragment>
      <div className="rui-page-title">
        <div className="container-fluid">
          <h1>Low Stock</h1>
        </div>
      </div>


      <div className="rui-page-content">
        <div className="container-fluid">
          <div className="">
            <h3>Filter</h3>
            <div className="row xs-gap mt-10 mb-30">
              <div className="col  col-sm-12 col-lg-3 mb-10">
                <Input size="large" placeholder="Title" allowClear={true}
                  onPressEnter={titleEnter} onChange={titleChange} />
              </div>
            </div>
          </div>

          {
            canView('Product - Low Stock | Export') ? <div className="float-right mb-20 pt-10">
              {/* <Button type="primary" onClick={() => generateReport()} size="large">Generate Report</Button> */}
              <CSVLink data={exportData} headers={headers} target="_blank" filename={`Product-low-Stock-${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`}>
                <Button type="primary" style={{ width: "300px" }} size="large" className="btn-brand btn-block float-right mb-20">
                  Generate Report
                </Button>
              </CSVLink>
            </div> : ''
          }

          <Table dataSource={products} columns={columns} />
        </div>
      </div>
    </Fragment>
  )
}
