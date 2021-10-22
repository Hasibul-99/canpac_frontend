import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import VerticalBar from "./verticalBar";
import DoughnutChart from "./Doughnut";
import { Card, Skeleton, Button  } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { authContext } from "../../../context/AuthContext";
import { postData } from '../../../scripts/api-service';
import { DASHBOARD } from '../../../scripts/api';
import * as htmlToImage from 'html-to-image';
import moment from 'moment';


export default function Dashboard() {
    const {t, i18n} = useTranslation();
    const {user, getUserInfo, setUserInfo} = useContext(authContext);
    const [dashboard, setDashboard] = useState();

    const getDashboardData = async () => {
        let res = await postData(DASHBOARD, {});

        if (res) {
            setDashboard(res.data.data);
        }
    };

    const generateReport = () => {
        htmlToImage.toBlob(document.getElementById('my-node'))
            .then(function (blob) {
                window.saveAs(blob, `generale-report-${moment().format('YYYY-MM-DD--HH-mm-ss')}.png`);
        });
    }

    useEffect(() => {
        getDashboardData()
    }, [])

    return (
        <Fragment>
            {
                dashboard ? <>
                {
                    user && <div className="rui-page-title">
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb" style={{"listStyleType": "none"}}>
                                    <li className="breadcrumb-item"> <strong>
                                        {t("common.name")}: </strong> {user?.name}</li>
                                </ol>
                                <ol className="breadcrumb" style={{"listStyleType": "none"}}>
                                    <li className="breadcrumb-item"> <strong>Company:</strong> {user.company_name} </li>
                                </ol>
                                <ol className="breadcrumb" style={{"listStyleType": "none"}}>
                                    <li className="breadcrumb-item"> <strong>Phone:</strong> {user.phone} </li>
                                </ol>
                                <ol className="breadcrumb" style={{"listStyleType": "none"}}>
                                    <li className="breadcrumb-item"> <strong>Email:</strong> {user.email} </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                }
                
                <div>
                    <Button onClick={generateReport} type="primary" size="large" style={{width: "300px"}}
                    className="btn-brand btn-block float-right mb-20">Generate Report</Button>
                </div>

                <div className="rui-page-content" id="my-node">
                    <div className="container-fluid">
                        {
                            dashboard && <div className="row xs-gap mt-20 px-20">
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                                        <h1>Product Stock</h1>
                                        <Link to="/product-stock"><h2>{dashboard.product_stock}</h2></Link>
                                    </div>
                                </div>
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                                        <h1>Product Order</h1>
                                        <Link to="/product-order"><h2>{dashboard.product_order}</h2></Link>
                                    </div>
                                </div>
                                <div className="col col-sm-12 col-lg-3 mb-10">
                                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                                        <h1>Low Stock</h1>
                                        <Link to="/low-stock"><h2>{dashboard.low_stock}</h2></Link>
                                    </div>
                                </div>
                                <div className="col  col-sm-12 col-lg-3 mb-10">
                                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                                        <h1>Product Delivery</h1>
                                        <Link to="/product-delivery"><h2>{dashboard.product_delivery}</h2></Link>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className="row xs-gap mt-20 px-20">
                            <div className="col col-sm-12 col-lg-12 mb-10">
                                <Card >
                                    <VerticalBar quantity={dashboard.product_quantity_model_wise}></VerticalBar>
                                </Card >
                            </div>
                            <div className="col col-sm-12 col-lg-12 mb-10">
                                <Card >
                                    <DoughnutChart products={dashboard.popular_product_model}></DoughnutChart>
                                </Card>
                            </div>
                        </div>

                    </div>
                </div>
                </> : Skeleton
            }
            
        </Fragment>
    )
}