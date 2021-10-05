import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
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
                            <h1 class="mnb-30">404</h1>
                            <p class="display-2 mb-50 text-grey-5">Page Not Found</p>
                            <div>
                                <Link to="/" class="btn btn-brand btn-long">Back Home</Link>
                            </div>
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
