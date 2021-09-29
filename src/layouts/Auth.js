import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";

import routes from "../routers/auth-router";


class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
      // if (Cookies.get("canpacToken")) {
      //   window.location = "/";
      // }
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/auth") {
            return(<Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />)
          } else {
            return null;
          }
        });
    };

    render() {
        return (
            <div>
                <Switch>{this.getRoutes(routes)}</Switch>
            </div>
        )
    }
}

export default Auth;