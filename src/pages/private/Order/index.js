import React, { Fragment, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { Select, Form, Button, InputNumber  } from 'antd';
import { postData } from '../../../scripts/api-service';
import { DROPDOWN_LIST, ORDER_CREATE } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';
import { useHistory } from "react-router-dom";

const { Option } = Select;

export default function OrderCreate() {
    const [form] = Form.useForm();
    const history = useHistory();
    const [product, setProduct] = useState([]);

    const onFinish = async (values) => {
        let res = await postData(ORDER_CREATE, values);

        if (res) {
            alertPop('success', "Order Created Successfully!");
            history.push('/product-order');
            form.resetFields();
        }
    };

    const getProductModel = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: 'product_model'
        });

        if (res) {
            setProduct(res.data.data);
        }
    }

    useEffect(() => {
        getProductModel()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Create Order</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%", marginTop: "2rem"}}
                        form={form}
                        layout={'vertical'}
                        onFinish={onFinish}
                        >
                        <Form.Item
                            label="Product Model"
                            name="product_id"
                            rules={[{ required: true, message: 'Please Select Product!' }]}
                        >
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select Product Model"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    product?.length && product.map(pro => <Option value={pro.id} key={pro.id}>{pro.product_name}</Option>)
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name="quantity"
                            rules={[{ required: true, message: 'Please input Quantity!' }]}
                        >
                            <InputNumber placeholder="Quantity" size="large" min={1} style={{width: "100%"}}/>
                        </Form.Item>

                        <Form.Item>
                            <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                            Create Order
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
