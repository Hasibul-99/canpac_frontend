import React, { Fragment, useEffect, useState } from 'react';
import {Table, Space, Select, Form, Button, Input, Checkbox , Row, Col } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PERMISSION_LIST, ROLE_CREATE } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';
import { useHistory } from "react-router-dom";

export default function CreateRole() {
    const history = useHistory();
    const [permissions, setPermissions] = useState([]);

    const onFinish = async (values) => {
        let {name, permissions} = values;

        let data = {
            name: name,
            permissions: JSON.stringify(permissions)
        }

        let res = await postData(ROLE_CREATE, data);
        if (res) {
            alertPop('success', "Role Created Successfully!");
            history.push('/roles');
        }
    };

    const getPermissions = async () => {
        let res = await postData(PERMISSION_LIST, {});
        if (res) setPermissions(res.data.data);
    }

    useEffect(() => {
        getPermissions()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Create Role</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%"}}
                        layout={'vertical'}
                        onFinish={onFinish}
                        >
                        <div className="row xs-gap">
                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input role name' }]}
                                >
                                    <Input size="large" placeholder="Name" />   
                                </Form.Item>
                            </div>

                            <div className="col col-sm-12 col-lg-6 mb-10">
                                <Form.Item
                                    label="Permissions"
                                    name="permissions"
                                    rules={[{ required: true, message: "Required*" }]}
                                >
                                    <Checkbox.Group style={{ width: '100%', height: "350px", "overflowY": "scroll" }}>
                                        <Row>
                                            {
                                                permissions.length && permissions.map(per => <Col span={24}>
                                                    <Checkbox value={per.id} key={per.id}>{per.name}</Checkbox>
                                                </Col>)
                                            }
                                        </Row>
                                    </Checkbox.Group>  
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row xs-gap">
                            <div className="col  col-sm-12 col-lg-6 mb-10">
                                <Form.Item>
                                    <Button className="btn-brand btn-block float-right" size="large" 
                                        type="primary" htmlType="submit">
                                        Create Role
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
}
