import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import VerticalBar from "./verticalBar";
import DoughnutChart from "./Doughnut";
import { Card } from 'antd';


export default function Dashboard() {
    return (
        <Fragment>
            <div classNameName="rui-page-title">
                <div classNameName="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol classNameName="breadcrumb">
                            <li classNameName="breadcrumb-item"> <strong>Name:</strong> Mr Brain Sung</li>
                        </ol>
                        <ol classNameName="breadcrumb">
                            <li classNameName="breadcrumb-item"> <strong>Company:</strong> King Show Vietnam Co., Ltd. </li>
                        </ol>
                        <ol classNameName="breadcrumb">
                            <li classNameName="breadcrumb-item"> <strong>Phone:</strong> 0272.3871807 </li>
                        </ol>
                        <ol classNameName="breadcrumb">
                            <li classNameName="breadcrumb-item"> <strong>Email:</strong> brain@kingshow.co </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="row xs-gap mt-20 px-20">
                <div className="col  col-sm-12 col-lg-3 mb-10">
                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                        <h1>Product Stock</h1>
                        <Link><h2>9500</h2></Link>
                    </div>
                </div>
                <div className="col  col-sm-12 col-lg-3 mb-10">
                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                        <h1>Product Order</h1>
                        <Link><h2>25</h2></Link>
                    </div>
                </div>
                <div className="col col-sm-12 col-lg-3 mb-10">
                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                        <h1>Low Stock</h1>
                        <Link><h2>6</h2></Link>
                    </div>
                </div>
                <div className="col  col-sm-12 col-lg-3 mb-10">
                    <div className="bg-grey-1 pt-15 pr-20 pb-15 pl-20 br-4 text-center">
                        <h1>Product Delivery</h1>
                        <Link><h2>95</h2></Link>
                    </div>
                </div>
            </div>

            <div className="row xs-gap mt-20 px-20">
                <div className="col col-sm-12 col-lg-6 mb-10">
                    <Card >
                        <VerticalBar></VerticalBar>
                    </Card >
                </div>
                <div className="col col-sm-12 col-lg-6 mb-10">
                    <Card >
                        <DoughnutChart></DoughnutChart>
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}
