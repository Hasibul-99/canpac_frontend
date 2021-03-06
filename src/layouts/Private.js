import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../routers/private-router";
import Cookies from "js-cookie";
import LeftSidebar from "../pages/components/LeftSidebar";
import TopNavbar from "../pages/components/TopNavbar";
import $ from "jquery";
import {checkUserPermission} from "../scripts/helper";
import Page404 from "../pages/private/404";

class Private extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
      if (!Cookies.get("canpacToken")) {
        window.location = "/auth/login";
      };

      let permissions = JSON.parse(localStorage.getItem("canpacPermissions"));

      console.log(permissions);
      if (permissions?.length) {
        this.setState({permissions: permissions})
      }
    }

    getRoutes = routes => {
      return routes.map((prop, key) => {  
        if (prop.layout === "/") {
          return(<Route
              exact
              path={prop.layout + prop.path}
              component = {checkUserPermission( prop.permission, this.state.permissions ) ? prop.component : Page404}
              key={key}
            />)
        } else {
          return null;
        }
      });
    };

    processNavbar = () => {
      $('#left-sidebar-cici-4565').removeClass('yay-overlay');
      $('#left-sidebar-cici-4565').css("opacity", 0);
      $('#left-sidebar-cici-4565').css("z-index", 1);
    }

    render() {
        return (
            <div className="rui-navbar-autohide rui-section-lines rui-navbar-show" id="main-wrapper">
              <LeftSidebar></LeftSidebar>
              <div className="rui-yaybar-bg" onClick={this.processNavbar}></div>
              <TopNavbar></TopNavbar>
              
              <div className="rui-navbar-bg"></div>
              <div className="rui-page content-wrap">
                <Switch>
                  {this.getRoutes(routes)}
                </Switch>
              </div>
            </div>
        )
    }
}

export default Private;