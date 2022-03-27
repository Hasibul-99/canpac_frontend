import React, { Fragment, useState, useEffect, useContext } from 'react';
import {Link} from "react-router-dom";
import {Table, Space, Select, Modal, Button, Spin, Input, DatePicker  } from 'antd';
import { ROLE_LIST, ROLE_DELETE } from "../../../scripts/api";
import {postData} from "../../../scripts/api-service";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {alertPop, checkUserPermission} from "../../../scripts/helper";
import { authContext } from '../../../context/AuthContext';

const { confirm } = Modal;
const { Option } = Select;
const { RangePicker } = DatePicker;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function Roles() {
    const { permissions } = useContext(authContext);
    const [roles, setRoles] = useState([]);
    const [search, setSearch] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Gyard Name',
          dataIndex: 'guard_name',
          key: 'age',
        },
        {
            title: 'Permissions',
            render: (text, record) => (
                <Space size="middle">
                  <a>{record?.permissions?.length}</a>
                </Space>
            ),
            key: 'id',
        },
        {
            title: 'Action',
            render: (text, record) => (
                <Space size="middle" >
                    <Button type="primary" className="btn-brand" disabled={!canView('Role - Update')}>
                        <Link to={'update-role/'+ record.id}>Update</Link>
                    </Button>
                    <Button danger onClick={() => showDeleteConfirm(record.id)} disabled={!canView('Role - Delete')}>
                        Delete
                    </Button>
                </Space>
            )
        },
    ];

    
    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const showDeleteConfirm = (roleId) => {
        confirm({
            title: 'Are you sure delete this role?',
            icon: <ExclamationCircleOutlined />,
            content: 'You will not get this role back.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              let res = postData(ROLE_DELETE, {id: roleId});

              if (res) {
                alertPop("success", "Role Deleted Successfully");
                setTimeout(() => {
                    getRoles();
                }, 500);
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const getRoles = async () => {
        setIsLoading(true);
        let res = await postData(ROLE_LIST, search);

        if (res) {
            setRoles(res.data.data);
            setIsLoading(false);
        }
    };

    const generateSearchObj = (name, value) => {
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }))
    };

    useEffect(() => {
        getRoles()
    }, [search])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Roles</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-4 mb-10">
                                <Input size="large" placeholder="Type Role Name" onPressEnter={(e) => generateSearchObj('name', e.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    {
                        canView("Role - Creat") ? <div className="my-20">
                            <Link to="/create-role">
                                <Button className="btn-brand btn-block float-right mb-20" size="large" 
                                    type="primary" style={{width: "300px"}}>Create Role</Button>
                            </Link>
                        </div> : ''
                    }
                    
                    {
                        isLoading ? <div className="loading-content">
                            <Spin size="large" className="mr-20" />
                            <Spin size="large" className="mr-20"/>
                            <Spin size="large" className="mr-20"/>
                        </div> : <Table dataSource={roles} columns={columns} />
                    }
                </div>
            </div>
        </Fragment>
    )
}
