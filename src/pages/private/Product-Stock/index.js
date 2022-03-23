import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { Table, Space, Select, Form, Button, Input, DatePicker } from 'antd';
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
                    record.has_low_stock ? <HourglassOutlined style={{ color: "red", fontSize: '2rem' }} title="This product is in low stock" /> : ''
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

    const getProductDetails = async (query = {}) => {
        let res = await postData(PRODUCT_STOCK, query);

        if (res) {
            setProducts(res.data.data);

            getProductExportData(query);
        }
    }

    const getProductExportData = async (query) => {
        let url = PRODUCT_STOCK_EXPORT;
        if (query?.filter_by) url = url + '?filter_by=' + query?.filter_by; 
        
        let res = await getData(url);

        if (res) {
            setExportData(res?.data?.data || []);
        }
    };

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const titleEnter = (e) => {
        getProductDetails({filter_by: e.target.value});
    }

    const titleChange = (e) => {
        if (!e.target.value) getProductDetails({});
    }

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

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-10 mb-30">
                            <div className="col  col-sm-12 col-lg-3 mb-10">
                                <Input size="large" placeholder="Title" allowClear={true}
                                onPressEnter={titleEnter} onChange={titleChange}/>
                            </div>
                        </div>
                    </div>


                    {
                        canView('Product - Stock | Export') ? <div className="float-right mb-20 pt-10">
                            {/* <Button type="primary" onClick={() => generateReport()} size="large">Generate Report</Button> */}
                            <CSVLink data={exportData} headers={headers} target="_blank" filename={`Product-Stock-${moment().format('YYYY-MM-DD--HH-mm-ss')}.csv`}>
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
