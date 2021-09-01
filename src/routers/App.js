import React, { Component } from 'react';

import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import PrivateLayout from "../layouts/Private";
import AuthLayout from "../layouts/Auth";
import authContextProvider from "../context/AuthContext";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            isAdmin: false,
        }
    }
    componentDidMount() {
        // store.dispatch(loadUser());
    }

    render() {
        return (
            <>
                <authContextProvider>
                    <Switch>
                        <Route path="/auth" render={props => <AuthLayout {...props} />}></Route> 
                        <Route path="/" render={props => <PrivateLayout {...props} />}></Route>
                        <Redirect path="*" to="/" /> 
                    </Switch>
                </authContextProvider>
            </>
        )
    }
}

export default App;