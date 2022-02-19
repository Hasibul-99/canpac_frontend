import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { authContext } from "../../context/AuthContext";
import { checkUserPermission } from "../../scripts/helper";

export default function Page404() {
    const { permissions } = useContext(authContext);

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    };

    return (
        <Fragment>
            <div class="rui-page-preloader" role="status">
                    <div class="rui-page-preloader-inner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            <div class="rui-main">
                <div class="rui-page-error container">
                    <div class="row text-center">
                        <div class="col-12"></div>
                        <div class="col-12">
                            {
                                window.location.pathname === '/' && permissions?.length && !canView('Dashboard Report') ? <h2 style={{color: "red"}}>There seems to be a problem with your access to the Dashboard data report. Although this is possible for non-Premium Merchants. For access, please contact us.</h2> : <Fragment>
                                    <h1 class="mnb-30">404</h1>
                                    <p class="display-2 mb-50 text-grey-5">Page Not Found</p>
                                    <div>
                                        <Link to="/" class="btn btn-brand btn-long">Back Home</Link>
                                    </div>
                                </Fragment>
                            } 
                            
                        </div>
                        <div class="col-12">
                            <div class="rui-footer pt-30 pb-25">
                                <p class="mb-0">2020 &copy; Design by Dexad and nK.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
