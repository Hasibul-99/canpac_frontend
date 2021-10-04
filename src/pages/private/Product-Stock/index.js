import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Form, Button, Input, DatePicker  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PRODUCT_STOCK } from '../../../scripts/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ProductDelivery() {
    const [products, setProducts] = useState();
      
    const columns = [
      {
        title: 'Product name',
        dataIndex: 'product_name',
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
        }
    }

    useEffect(() => {
        getProductDetails()
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
