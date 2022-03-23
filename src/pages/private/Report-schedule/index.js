import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { Table, Space, Select, Modal, Button, Input, DatePicker } from 'antd';
import { REPORT_SCHEDULE_CONFIG, DROPDOWN_LIST, REPORT_SCHEDULE_CONFIG_UPDATE } from "../../../scripts/api";
import { postData } from "../../../scripts/api-service";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { alertPop, checkUserPermission } from "../../../scripts/helper";
import { authContext } from '../../../context/AuthContext';
import { EditOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Option } = Select;

export default function ReportSchedule() {
    const { permissions } = useContext(authContext);
    const [schedule, setSchedule] = useState([]);
    const [scheduleDwop, setScheduleDwop] = useState([]);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Status',
            key: 'status',
            render: (text, record) => (
                <Button disabled={!canView("Report Email Schedule Config - Update")}
                    style={record.status === 0 ? { "color": "red", "border-color": "red", background: "#fff" } : {
                        "color": "#40a9ff", "border-color": "#40a9ff", background: "#fff"
                    }} shape="circle"
                    onClick={() => updateStatus(record)}>
                    {record.status_title}
                </Button>
            ),
        },
        {
            title: 'Run On',
            render: (text, record, index) => (
                <>
                    <Select
                        className="mr-20"
                        id={"js-run-on-" + record.id}
                        showSearch
                        placeholder="Select a run on"
                        optionFilterProp="children"
                        dropdownMatchSelectWidth={false}
                        disabled={!canView("Report Email Schedule Config - Update")}
                        onChange={(value) => onChangeRunon(value, record, index)}
                        // onSearch={onSearch}
                        defaultValue={record.run_on}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            scheduleDwop?.length ? scheduleDwop.map(d => <Option value={d.value}>{d.title}</Option>) : ''
                        }
                    </Select>
                    {/* onClick={() => updateQtySheet(record)} */}
                    {
                        canView("Report Email Schedule Config - Update") ? <EditOutlined className='p-20' onClick={() => updateRunOn(record)}/> : ''
                    }
                </>
            ),
            key: 'id',
        },
    ];

    const updateRunOn = async (row) => {
        let res = await postData(REPORT_SCHEDULE_CONFIG_UPDATE, {
            config_id: row.id,
            run_on: row.run_on,
            status: row.status
        });

        if (res) {
            alertPop("success", res?.data?.message);
        }
    }

    const onChangeRunon = (value, record, idx) => {
        let data = record;
        data.run_on = value;

        schedule[idx] = data

        setSchedule([...schedule]);
    }

    const updateStatus = (row) => {
        confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleOutlined />,
            content: 'You want to change.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
              let res = await postData(REPORT_SCHEDULE_CONFIG_UPDATE, {
                    config_id: row.id,
                    run_on: row.run_on,
                    status: row.status ? 0 : 1
                });

              if (res) {
                    alertPop("success", res?.data?.message);
                    setTimeout(() => {
                        getReportSchedule();
                    }, 500);
              }
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    const getReportSchedule = async () => {
        let res = await postData(REPORT_SCHEDULE_CONFIG);

        if (res) {
            let masterData = res?.data?.data;
            setSchedule(masterData);
        }
    };

    const getDropdownList = async () => {
        let res = await postData(DROPDOWN_LIST, {
            data_type: "report_schedule_config_run_on_dropdown"
        });

        if (res) {
            setScheduleDwop(res?.data?.data)
        }
    };

    useEffect(() => {
        getDropdownList()
        getReportSchedule()
    }, [])

    return (
        <Fragment>
            <div className="rui-page-title">
                <div className="container-fluid">
                    <h1>Report Schedule Config</h1>
                </div>
            </div>

            <div className="rui-page-content">
                <div className="container-fluid">
                    {/* <div className="">
                        <h3>Filter</h3>
                        <div className="row xs-gap mt-20 mb-20">
                            <div className="col  col-sm-12 col-lg-4 mb-10">
                                <Input size="large" placeholder="Type Role Name" onPressEnter={(e) => generateSearchObj('name', e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    {
                        canView("Role - Creat") ? <div className="my-20">
                            <Link to="/create-role">
                                <Button className="btn-brand btn-block float-right mb-20" size="large"
                                    type="primary" style={{ width: "300px" }}>Create Role</Button>
                            </Link>
                        </div> : ''
                    } */}

                    <Table dataSource={schedule} columns={columns} />
                </div>
            </div>
        </Fragment>
    )
}
