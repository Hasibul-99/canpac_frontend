import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Button} from 'antd';
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
              { record.product_name }
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

    const getProducts = async () => {
      let res = await postData(PRODUCT_STOCK_LOW, {});

      if (res) {
        setProducts(res.data.data);
        getProductLowExportData();
      }
    }

    const getProductLowExportData = async () => {
      let res = await getData(PRODUCT_STOCK_LOW_EXPORT);

      if (res) {
        console.log("res?.data?.data", res?.data?.data);

          setExportData(res?.data?.data || []);
      }
    };

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

            {
                canView('Product - Low Stock | Export') ? <div className="float-right mb-20 pt-10">
                    {/* <Button type="primary" onClick={() => generateReport()} size="large">Generate Report</Button> */}
                    <CSVLink data={exportData} headers={headers} target="_blank" filename={`Product-low-Stock-${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`}>
                        <Button type="primary" style={{width: "300px"}} size="large" className="btn-brand btn-block float-right mb-20">
                            Generate Report
                        </Button>
                    </CSVLink>
                </div> : ''
            }

            <div className="rui-page-content">
                <div className="container-fluid">
                    <Table dataSource={products} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
