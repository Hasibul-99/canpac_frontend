import React, { useContext } from 'react';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    StockOutlined,
    BorderlessTableOutlined,
    CodeSandboxOutlined,
    LineChartOutlined,
    FileDoneOutlined,
    DiffOutlined,
    GroupOutlined,
    ForkOutlined,
    UsergroupAddOutlined,
    UserSwitchOutlined,
    DotChartOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { authContext } from '../../context/AuthContext';
import { checkUserPermission } from "../../scripts/helper";

// yay-overlay
export default function LeftSidebar() {
    const { permissions } = useContext(authContext);

    const className = (location, path) => {
        let className = "";
        if (location === path) className = "yay-item-active";
        return className;
    };

    const canView = (context) => {
        return checkUserPermission(context, permissions);
    }

    return (
            <div id="left-sidebar-cici-4565" className="yaybar yay-hide-to-small yay-shrink yay-gestures rui-yaybar">
                <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }}
                 extensions={['extensionA', 'extensionB']} >
                <div className="yay-wrap-menu">
                    <div className="yaybar-wrap">
                        <ul>
                            {
                                (canView('Dashboard Report') 
                                || canView('Order - Creat') ) ? <li className="yay-label">Get Started</li> : ''
                            }
                            
                            {
                                canView('Dashboard Report') ? <li className={className(window.location.pathname, "/")}>
                                    <Link to="/">
                                        <span className="yay-icon">
                                            <HomeOutlined/>
                                        </span>
                                        <span>Dashboard</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                canView('Order - Creat') ? <li className={className(window.location.pathname, "/create-order")}>
                                    <Link to="/create-order">
                                        <span className="yay-icon">
                                            <ShoppingCartOutlined />
                                        </span>
                                        <span>Create Order</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {(canView('Product - Stock')
                                || canView("Product - Order") 
                                || canView('Order - Draft')
                                || canView('Product - Low Stock')
                                || canView('Product - Low Stock')
                                || canView('Product - Delivery')) ? <li className="yay-label">Inventory</li> : ''}
                            
                            {
                                canView('Product - Stock') ? <li className={className(window.location.pathname, "/product-stock")}>
                                    <Link to="/product-stock">
                                        <span className="yay-icon">
                                            <StockOutlined />
                                        </span>
                                        <span>Product Stock</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }

                                                        
                            {
                                canView('Order - Draft') ? <li className={className(window.location.pathname, "/order-draft")}>
                                        <Link to="/order-draft">
                                            <span className="yay-icon">
                                                <CodeSandboxOutlined />
                                            </span>
                                            <span>Order Draft</span> 
                                            <span className="rui-yaybar-circle"></span>
                                        </Link>
                                    </li> : ''
                            }
                            
                            {
                                canView('Product - Order') ? <li className={className(window.location.pathname, "/product-order")}>
                                    <Link to="/product-order">
                                        <span className="yay-icon">
                                            <BorderlessTableOutlined />
                                        </span>
                                        <span>Product Order</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                canView('Product - Low Stock') ? <li className={className(window.location.pathname, "/low-stock")}>
                                    <Link to="/low-stock">
                                        <span className="yay-icon">
                                            <LineChartOutlined />
                                        </span>
                                        <span>Low Stock</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                canView('Product - Delivery') ? <li className={className(window.location.pathname, "/product-delivery")}>
                                        <Link to="/product-delivery">
                                            <span className="yay-icon">
                                                <FileDoneOutlined />
                                            </span>
                                            <span>Product Delivery</span> 
                                            <span className="rui-yaybar-circle"></span>
                                        </Link>
                                    </li> : ''
                            }
                            
                            
                            {
                                canView('Weekly Report') ? <li className="yay-label">Reports</li> : ''
                            }
                            {/* <li className=""><a href="element-alerts.html" className="yay-sub-toggle"><span className="yay-icon"><span
                                            data-feather="layers" className="rui-icon rui-icon-stroke-1_5"></span></span>
                                    <span>Base</span> <span className="rui-yaybar-circle"></span> <span
                                        className="yay-icon-collapse"><span data-feather="chevron-right"
                                            className="rui-icon rui-icon-collapse rui-icon-stroke-1_5"></span></span></a>
                                <ul className="yay-submenu dropdown-triangle">
                                    <li><a href="element-alerts.html">Alerts</a></li>
                                    <li><a href="element-badge.html">Badge</a></li>
                                    <li><a href="element-breadcrumb.html">Breadcrumbs</a></li>
                                    <li><a href="element-buttons.html">Buttons</a></li>
                                    <li><a href="element-card.html">Card</a></li>
                                    <li><a href="element-carousel.html">Carousel</a></li>
                                    <li><a href="element-collapse.html">Collapse</a></li>
                                    <li><a href="element-dropdowns.html">Dropdowns</a></li>
                                    <li><a href="element-list-group.html">List group</a></li>
                                    <li><a href="element-media-object.html">Media object</a></li>
                                    <li><a href="element-modal.html">Modal</a></li>
                                    <li><a href="element-navs.html">Navs</a></li>
                                    <li><a href="element-pagination.html">Pagination</a></li>
                                    <li><a href="element-popovers.html">Popovers</a></li>
                                    <li><a href="element-progress.html">Progress</a></li>
                                    <li><a href="element-spinners.html">Spinners</a></li>
                                    <li><a href="element-tabs.html">Tabs</a></li>
                                </ul>
                            </li> */}
                            {
                                canView('Weekly Report') ? <li className={className(window.location.pathname, "/weekly-report")}>
                                    <Link to="/weekly-report">
                                        <span className="yay-icon">
                                            <DiffOutlined />
                                        </span>
                                        <span>Weekly Report</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                (canView('Role - List') 
                                || canView('Merchant - List')
                                || canView('Permission - List') 
                                || canView('User - List')) ? <li className="yay-label">Authentications</li> : '' 
                            }
                            
                            {
                                canView('Report Email Schedule Config - List') ? <li className={className(window.location.pathname, "/report_schedule_config")}>
                                    <Link to="/report_schedule_config">
                                        <span className="yay-icon">
                                            <DotChartOutlined />
                                        </span>
                                        <span>Report Schedule Config</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }

                            {
                                canView('Role - List') ? <li className={className(window.location.pathname, "/roles")}>
                                    <Link to="/roles">
                                        <span className="yay-icon">
                                            <GroupOutlined />
                                        </span>
                                        <span>Roles</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                canView('Permission - List') ? <li className={className(window.location.pathname, "/permissionts")}>
                                    <Link to="/permissionts">
                                        <span className="yay-icon">
                                            <ForkOutlined />
                                        </span>
                                        <span>Permisstions</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }

                            {
                                canView('User - List') ? <li className={className(window.location.pathname, "/users")}>
                                    <Link to="/users">
                                        <span className="yay-icon">
                                            <UsergroupAddOutlined />
                                        </span>
                                        <span>Users</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                            {
                                canView('Merchant - List') ? <li className={className(window.location.pathname, "/merchents")}>
                                    <Link to="/merchents">
                                        <span className="yay-icon">
                                            <UserSwitchOutlined />
                                        </span>
                                        <span>Merchents</span> 
                                        <span className="rui-yaybar-circle"></span>
                                    </Link>
                                </li> : ''
                            }
                            
                        </ul>
                    </div>
                </div>
                </OverlayScrollbarsComponent>
            </div>
    )
}
