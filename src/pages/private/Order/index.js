import React, { Fragment } from 'react';
import {Link} from "react-router-dom";

export default function OrderCreate() {
    return (
        <Fragment>
            <div class="rui-page-title">
                <div class="container-fluid">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                        </ol>
                    </nav>
                    <h1>Create Order</h1>
                </div>
            </div>
        </Fragment>
    )
}
