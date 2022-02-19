import React, { Fragment, useEffect, useState, useContext } from 'react'
import { Form, Input, Button, Upload, Select, Card,Row, Col } from "antd";
import { alertPop, getBase64, checkUserPermission } from '../../../scripts/helper';
import { postData } from '../../../scripts/api-service';
import { UploadOutlined } from '@ant-design/icons';
import { MERCHENT_LIST, MARCHENT_PRODUCT_MODEL, ROLE_LIST, USER_CREATE, USER_LIST, MERCHENT_UPDATE } from '../../../scripts/api';
import demo from "../../../assets/images/avatar-1.png";
import { Link, useHistory, useParams } from "react-router-dom";
import { authContext } from '../../../context/AuthContext';

const { Option } = Select;
const style = { padding: '20px', 
    border: "1px solid #ccc",
    borderRadius: '5px',
    marginBottom: '10px'
};
export default function UpdateMarchent() {
    const { permissions } = useContext(authContext);
    const history = useHistory();
    let { marchentId } = useParams();
    const [form] = Form.useForm();
    const [file, setfile] = useState();
    const [imageBase64, setImageBase64] = useState();
    const [roles, setRoles] = useState();
    const [ userInfo, setUserInfo ] = useState();
    const [selectedRole, setSelectedRole] = useState('Merchant');
    const [marchentProducts, setMarchentProducts] = useState([]);


    const profilePreview = async ({file}) => {
        setfile(file.originFileObj);
        let preview = await getBase64(file.originFileObj);
        setImageBase64(preview);
    };

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const onFinish = async (values) => {
        let data = new FormData();
        
        if (file) data.append('image', file); 
        data.append('name', values.name);
        data.append('email', values.email); 
        data.append('phone', values.phone); 
        data.append('company_name', values.company_name); 
        data.append('role', values.role);
        data.append('sap_id', values.sap_id);

        data.append('id', marchentId);

        let res = await postData(MERCHENT_UPDATE, data);

        if (res) {
            alertPop('success', "Marchent Updated Successfully!");
            history.push('/merchents');
        }
    };

    const getMerchentss = async () => {
        let res = await postData(MERCHENT_LIST, {});

        if (res) {
            let masterData = res.data.data || [];
            let user = masterData.find(use => use.id == marchentId);
            if (user) {
                setUserInfo(user);

                form.setFieldsValue({
                    company_name: user.company_name,
                    email: user.email,
                    name: user.name,
                    phone: user.phone,
                    email: user.email,
                    role: user.roles[0].name,
                    sap_id: user.sap_id
                });

                setSelectedRole(user.roles[0].name);
            }
        }
    }

    const getMarchentProiductModel = async () => {
        let res = await postData(MARCHENT_PRODUCT_MODEL, {
            merchant_id: marchentId
        });

        if (res) {
            let masterData = res.data.data || [];
            setMarchentProducts(masterData);
        }
    }

    useEffect(() => {
        getMerchentss();
        if (canView("Merchant - Mapped Products")) getMarchentProiductModel()
    }, [])
    
    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Update Merchant</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%", marginTop: "2rem"}}
                        form={form}
                        layout={'vertical'}
                        onFinish={onFinish}
                    >
                        <div className="row xs-gap">
                            <div className="col-sm">
                                <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please Input Your Name!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Name" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ required: true, message: 'Please input email!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Email" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Phone"
                                        name="phone"
                                        rules={[{ required: true, message: 'Please input phone!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Phone" />
                                    </Form.Item>
                                    
                                    <Form.Item
                                        label="Company Name"
                                        name="company_name"
                                        rules={[{ required: true, message: 'Please input company name!' }]}
                                    >
                                        <Input size="large" placeholder="Enter Company Name" />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4">
                                    <Form.Item
                                            label="Role"
                                            name="role"
                                            rules={[{ required: true, message: 'Please input company name!' }]}
                                        >
                                            <Select
                                                size="large"
                                                showSearch
                                                placeholder="Select a role"
                                                optionFilterProp="children"
                                                onChange={(e) => setSelectedRole(e)}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option key={1} value="Merchant">Merchant</Option>
                                                <Option key={2} value="Premium Merchant">Premium Merchant</Option>
                                            </Select>
                                    </Form.Item>
                                    
                                    {
                                        selectedRole === 'Premium Merchant' ? <Form.Item
                                            label="SAP Id"
                                            name="sap_id"
                                            rules={[{ required: true, message: 'Please input SAP Id!' }]}
                                        >
                                            <Input size="large" placeholder="Enter SAP Id" />
                                        </Form.Item> : ''
                                    }
                                    
                                    <hr/>

                                    <div className="rui-profile mt-10">
                                        <div className="rui-profile-img m-auto">
                                            <img src={ imageBase64 ? imageBase64 : userInfo?.thumb_image_url ? userInfo?.thumb_image_url : demo} alt=""/>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <Upload accept="image/*" onChange={profilePreview}>
                                            <Button icon={<UploadOutlined />}>Upload Image</Button>
                                        </Upload>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row xs-gap">
                            <div className="col-sm">
                                <Form.Item>
                                    <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                                        Update
                                    </Button>
                                </Form.Item>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                    </Form>
                </div>
            </div>

            {
               selectedRole === "Premium Merchant" ? <div className='mb-5'>
                    {
                        marchentProducts?.length ? <Card title="Product Model" className='marchent-model'>
                            <Row gutter={{ xs: 8, sm: 16, md: 24}}>
                                {
                                    marchentProducts.map(product => <Col className="gutter-row" span={6} key={"product43-" + product.product_id}>
                                        <div style={style}>
                                            {product.product.product_display_name}
                                        </div>
                                    </Col>)
                                }
                            </Row>
                            {/* {
                                marchentProducts.map(product => {
                                    return <Card.Grid hoverable={false} style={gridStyle} key={"product43-" + product.product_id}>
                                        {product.product.product_display_name}
                                    </Card.Grid>
                                })
                            } */}
                        </Card> : ''
                    }
                    <Card>
                        <Row justify="end">
                            <Col span={4}>
                                <Button type="primary" size="large">
                                    <Link to={'/update-merchents-product-model/' + marchentId}>Assign Product Model</Link>
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </div> : ''
            }
        </Fragment>
    )
}
