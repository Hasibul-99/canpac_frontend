import React from 'react';
import {Link} from "react-router-dom";
import tick from "../../../assets/images/progress-and-tick-icon-animation.gif";

export default function VerifyEmail() {
    return (
        <div className="rui-main">
            <div className="rui-sign align-items-center justify-content-center">
            <div className="bg-image">
                    <div className="bg-grey-1" />
                </div>
                <div className="form rui-sign-form rui-sign-form-cloud">
                    <div className="row vertical-gap sm-gap justify-content-center">
                        <div className="col-12">
                            <h1 className="display-4 mb-10 text-center">Email Verified</h1>
                            <hr/>
                            <img src={tick} style={{width: "100%"}} />
                        </div>
                        <div className="col-12">
                            <div className="rui-sign-or">or</div>
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-grey-5">
                    Move to <Link to="/auth/login" className="text-2">Sign In</Link>
                </div>
            </div>
        </div>
    )
}
