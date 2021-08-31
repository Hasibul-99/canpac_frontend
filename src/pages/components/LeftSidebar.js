import React from 'react';
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
    UserSwitchOutlined
  } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// yay-overlay
export default function LeftSidebar() {
    const className = (location, path) => {
        let className = "";
        if (location === path) className = "yay-item-active";
        return className;
    };

    return (
            <div id="left-sidebar-cici-4565" className="yaybar yay-hide-to-small yay-shrink yay-gestures rui-yaybar">
                <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'scroll' } }}
                 extensions={['extensionA', 'extensionB']} >
                <div className="yay-wrap-menu">
                    <div className="yaybar-wrap">
                        <ul>
                            <li className="yay-label">Get Started</li>
                            <li className={className(window.location.pathname, "/")}>
                                <Link to="/">
                                    <span className="yay-icon">
                                        <HomeOutlined/>
                                    </span>
                                    <span>Dashboard</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/create-order")}>
                                <Link to="/create-order">
                                    <span className="yay-icon">
                                        <ShoppingCartOutlined />
                                    </span>
                                    <span>Create Order</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className="yay-label">Inventory</li>
                            <li className={className(window.location.pathname, "/product-stock")}>
                                <Link to="/product-stock">
                                    <span className="yay-icon">
                                        <StockOutlined />
                                    </span>
                                    <span>Product Stock</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/product-order")}>
                                <Link to="/product-order">
                                    <span className="yay-icon">
                                        <BorderlessTableOutlined />
                                    </span>
                                    <span>Product Order</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/order-draft")}>
                                <Link to="/order-draft">
                                    <span className="yay-icon">
                                        <CodeSandboxOutlined />
                                    </span>
                                    <span>Order Draft</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/low-stock")}>
                                <Link to="/low-stock">
                                    <span className="yay-icon">
                                        <LineChartOutlined />
                                    </span>
                                    <span>Low Stock</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li className={className(window.location.pathname, "/product-delivery")}>
                                <Link to="/product-delivery">
                                    <span className="yay-icon">
                                        <FileDoneOutlined />
                                    </span>
                                    <span>Product Delivery</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            
                            <li className="yay-label">Reports</li>
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
                            <li className={className(window.location.pathname, "/weekly-report")}>
                                <Link to="/weekly-report">
                                    <span className="yay-icon">
                                        <DiffOutlined />
                                    </span>
                                    <span>Weekly Report</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>

                            <li className="yay-label">Authentications</li>
                            <li>
                                <Link to="">
                                    <span className="yay-icon">
                                        <GroupOutlined />
                                    </span>
                                    <span>Roles</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span className="yay-icon">
                                        <ForkOutlined />
                                    </span>
                                    <span>Permisstions</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span className="yay-icon">
                                        <UsergroupAddOutlined />
                                    </span>
                                    <span>Users</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                            <li>
                                <Link to="">
                                    <span className="yay-icon">
                                        <UserSwitchOutlined />
                                    </span>
                                    <span>Merchents</span> 
                                    <span className="rui-yaybar-circle"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                </OverlayScrollbarsComponent>
            </div>
    )
}
