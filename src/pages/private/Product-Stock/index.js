import React, { Fragment, useEffect, useState, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { getData, postData } from '../../../scripts/api-service';
import { PRODUCT_STOCK, PRODUCT_STOCK_EXPORT } from '../../../scripts/api';
import { checkUserPermission } from '../../../scripts/helper';
import { authContext } from '../../../context/AuthContext';
import { CSVLink } from "react-csv";
import moment from 'moment';
import { HourglassOutlined } from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const headers = [
    { label: "Product Code of SAP", key: "product_code_of_sap" },
    { label: "Product name", key: "product_name" },
    { label: "Quantity of Product Per Sheet", key: "quantity_of_product_per_sheet" },
    { label: "Stock", key: "stock" },
    { label: "Thickness", key: "thickness" },
    { label: "Weight", key: "weight" },
];

export default function ProductDelivery() {
    const { permissions } = useContext(authContext);
    const [products, setProducts] = useState();
    const [exportData, setExportData] = useState([]);
      
    const columns = [
        {
            title: '',
            key: 'name',
            render: (text, record) => <>
                {
                    record.has_low_stock ? <HourglassOutlined style={{color: "red", fontSize: '2rem'}} title="This product is in low stock"/> : ''
                }
            </>
        },
        {
            title: 'Product name',
            dataIndex: 'product_display_name',
            key: 'address',
        },
        //   {
        //     title: 'Date',
        //     dataIndex: 'name',
        //     key: 'name',
        //   },
        //   {
        //     title: 'Printed Sheet (Body Blank)',
        //     dataIndex: 'age',
        //     key: 'age',
        //   },
        {
            title: 'Can Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Total Can Stock & Printed Sheet',
            dataIndex: 'quantity_of_product_per_sheet',
            key: 'quantity_of_product_per_sheet',
        },
        {
            title: 'Weight Standard (g)',
            dataIndex: 'weight',
            key: 'weight',
        },
        {
            title: 'Thickness(mm)',
            dataIndex: 'thickness',
            key: 'thickness',
        },
    ];

    const getProductDetails = async () => {
        let res = await postData(PRODUCT_STOCK, {});

        if (res) {
            setProducts(res.data.data);

            getProductExportData();
        }
    }

    const getProductExportData = async () => {
        let res = await getData(PRODUCT_STOCK_EXPORT);

        if (res) {
            setExportData(res?.data?.data || []);
        }
    };

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    useEffect(() => {
        getProductDetails();
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Product Stock</h1>
                </div>
            </div>

            {
                canView('Product - Stock | Export') ? <div className="float-right mb-20 pt-10">
                    {/* <Button type="primary" onClick={() => generateReport()} size="large">Generate Report</Button> */}
                    <CSVLink data={exportData} headers={headers} target="_blank" filename={`Product-Stock-${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`}>
                        <Button type="primary" style={{width: "300px"}} size="large" className="btn-brand btn-block float-right mb-20">
                            Generate Report
                        </Button>
                    </CSVLink>
                </div> : ''
            }

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="d-none">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-10 mb-30">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Name" />
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Status"
                                        >
                                        {children}
                                    </Select>
                                        
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Customers"
                                        >
                                        {children}
                                    </Select>
                            </div>

                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <Select
                                        size="large"
                                        // mode="multiple"
                                        allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Select Models"
                                        >
                                        {children}
                                    </Select>
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <RangePicker size="large" style={{width: "100%"}} />
                            </div>
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-light btn-block" size="large" 
                                        type="primary">
                                        Reset Filter
                                </Button>
                            </div>
                            <div className="col col-sm-12 col-lg-3 mb-10">
                                <Button className="btn-brand btn-block float-right" size="large" 
                                    type="primary">
                                    Filter
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Table dataSource={products} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
