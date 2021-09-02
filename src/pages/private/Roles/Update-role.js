import React, { Fragment, useEffect, useState } from 'react';
import {Table, Space, Select, Form, Button, Input, Checkbox , Row, Col } from 'antd';
import { postData } from '../../../scripts/api-service';
import { PERMISSION_LIST, ROLE_UPDATE, ROLE_LIST } from '../../../scripts/api';
import { alertPop } from '../../../scripts/helper';
import { useHistory, useParams } from "react-router-dom";

export default function UpdateRole() {
    const formRef = React.createRef();
    const history = useHistory();
    let { roleId } = useParams();
    const [permissions, setPermissions] = useState([]);
    const [role, setRole] = useState();

    const onFinish = async (values) => {
        let {name, permissions} = values;

        let data = {
            id: roleId,
            name: name,
            permissions: JSON.stringify(permissions)
        }

        let res = await postData(ROLE_UPDATE, data);
        if (res) {
            alertPop('success', "Role Updated Successfully!");
            history.push('/roles');
        }
    };

    const getPermissions = async () => {
        let res = await postData(PERMISSION_LIST, {});
        if (res) setPermissions(res.data.data);
    }

    const getRoles = async () => {
        let res = await postData(ROLE_LIST, {});

        if (res) {
            let masterData = res?.data?.data || [];
            let role = masterData.find(e => e.id == roleId);
            setRole(role);
        }
    }

    const onFill = () => {
        formRef.current.setFieldsValue({
            name: role?.name,
            permissions: role.permissions.map(e => e.id),
        });
    }

    useEffect(() => {
        getPermissions();
        getRoles();
    }, [])

    useEffect(() => {
        if (role) onFill()
    }, [role])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Update Role</h1>
                </div>
            </div>
            <div className="rui-page-content">
                <div className="container-fluid">
                    <Form style={{width: "100%"}}
                        ref={formRef}
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
                                    rules={[{ required: false }]}
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
                                        Update Role
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
