import React, {Fragment, useEffect, useState} from 'react'
import logo from "../../assets/images/logo.svg";
import avatar1 from "../../assets/images/avatar-1.png";
import $ from "jquery";
import { Menu, Dropdown, Modal } from 'antd';
import { LogoutOutlined, UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Form, Input, Button } from "antd";
import { Link } from 'react-router-dom';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
};

export default function TopNavbar() {
    const [changepassModal, setChangepassModal] = useState(false);
    const toggleContent = () => {
        if ($( "#main-wrapper" ).hasClass( "yay-hide" )) {
            $( "#main-wrapper" ).removeClass( "yay-hide" );
            $('#left-sidebar-cici-4565').css("z-index", 1004);
        } else {
            $( "#main-wrapper" ).addClass( "yay-hide" );
            $('#left-sidebar-cici-4565').css("z-index", 10000);
        }
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <a rel="noopener noreferrer" onClick={() => {setChangepassModal(true)}}>
                <KeyOutlined /> Change Password
            </a>
          </Menu.Item>
          <Menu.Item>
            <Link to="/update-profile">
                <UserOutlined /> Update Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            <LogoutOutlined /> Sign Out
            </a>
          </Menu.Item>
        </Menu>
    );

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        function handleResize() {
            let {width} = getWindowDimensions();
            if (width <= 614) {
                $('#left-sidebar-cici-4565').addClass('yay-overlay');
            } else {
                $('#left-sidebar-cici-4565').removeClass('yay-overlay')
            }
        } 
        
        handleResize();
        window.addEventListener('resize', handleResize);
      }, []);

    return (
        <Fragment>
        <nav className="rui-navbar rui-navbar-top rui-navbar-sticky">
            <div className="rui-navbar-brand">
                <a href="dashboard.html" className="rui-navbar-logo">
                    <img src={logo} alt="" width="45" /> 
                </a>
                <button className="yay-toggle rui-yaybar-toggle" type="button" onClick={toggleContent}><span></span></button>
            </div>

            <div className="container-fluid">
                <div className="rui-navbar-content">
                    <ul className="nav">
                        {/* <li className="dropdown dropdown-hover dropdown-keep-open dropdown-triangle"><a href="#actions"
                                className="dropdown-item" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false"><span data-feather="layers"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Actions</span> <span
                                    className="rui-dropdown-circle"></span></a>
                            
                            <ul className="nav dropdown-menu">
                                <li><a href="#create-post" className="nav-link"><span data-feather="plus-circle"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Create Post</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li><a href="#create-page" className="nav-link"><span data-feather="plus-circle"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Create Page</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li><a href="#manage-users" className="nav-link"><span data-feather="users"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Manage Users</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li className="dropdown dropdown-hover dropdown-keep-open dropdown-triangle"><a
                                        href="#manage-sites" className="dropdown-item" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false"><span data-feather="sidebar"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Manage Sites</span> <span
                                            className="rui-dropdown-circle"></span></a>
                                    <ul className="nav dropdown-menu">
                                        <li><a href="#my-site-1" className="nav-link">My Site 1</a></li>
                                        <li><a href="#my-site-2" className="nav-link">My Site 2</a></li>
                                        <li><a href="#my-site-3" className="nav-link">My Site 3</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li> */}
                    </ul>

                    <ul className="nav rui-navbar-right">
                        <li className="nav-item"><a className="d-flex" data-fancybox data-keyboard="false" data-auto-focus="false"
                                data-touch="false" data-close-existing="true" data-src="#messenger"
                                href="javascript:;"><span className="btn btn-custom-round"><span data-feather="message-circle"
                                        className="rui-icon rui-icon-stroke-1_5"></span></span></a></li>
                        <li className="dropdown dropdown-hover dropdown-triangle dropdown-keep-open">
                        <Dropdown overlay={menu} placement="bottomRight" arrow>
                            <a className="dropdown-item rui-navbar-avatar mnr-6">
                                    <img src={avatar1} alt="" />
                            </a>
                        </Dropdown>
                            
                            {/* <ul className="nav dropdown-menu">
                                <li><a href="profile.html" className="nav-link"><span data-feather="plus-circle"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Create new Post</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li><a href="profile.html" className="nav-link"><span data-feather="users"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Manage Users</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li><a href="profile.html" className="nav-link"><span data-feather="check-circle"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Check Updates</span> <span
                                            className="rui-nav-circle"></span></a></li>
                                <li><a href="profile.html" className="nav-link"><span data-feather="log-out"
                                            className="rui-icon rui-icon-stroke-1_5"></span> <span>Exit</span> <span
                                            className="rui-nav-circle"></span></a></li>
                            </ul> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div className="rui-navbar rui-navbar-mobile">
            <div className="rui-navbar-head">
                <button onClick={toggleContent} className="rui-yaybar-toggle rui-yaybar-toggle-inverse yay-toggle"
                    type="button" aria-label="Toggle side navigation"><span></span>
                </button>
                <a className="rui-navbar-logo mr-auto" href="dashboard.html">
                    <img src={logo} alt="" width="45"/>
                </a>
                <div className="dropdown dropdown-triangle">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="dropdown-item rui-navbar-avatar" >
                            <img src={avatar1} alt=""/>
                    </a>
                </Dropdown>,
                    {/* <ul className="dropdown-menu nav">
                        <li><a href="profile.html" className="nav-link"><span data-feather="plus-circle"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Create new Post</span> <span
                                    className="rui-nav-circle"></span></a></li>
                        <li><a href="profile.html" className="nav-link"><span data-feather="users"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Manage Users</span> <span
                                    className="rui-nav-circle"></span></a></li>
                        <li><a href="profile.html" className="nav-link"><span data-feather="check-circle"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Check Updates</span> <span
                                    className="rui-nav-circle"></span></a></li>
                        <li><a href="profile.html" className="nav-link"><span data-feather="log-out"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Exit</span> <span
                                    className="rui-nav-circle"></span></a></li>
                    </ul> */}
                </div><button className="navbar-toggler rui-navbar-toggle" type="button" data-toggle="collapse"
                    data-target="#navbarMobile" aria-controls="navbarMobile" aria-expanded="false"
                    aria-label="Toggle navigation"><span></span></button>
            </div>
            
            <div className="collapse navbar-collapse rui-navbar-collapse" id="navbarMobile">
                <div className="rui-navbar-content">
                    <ul className="nav">
                        
                        <li className="dropdown dropdown-keep-open"><a className="dropdown-item" href="#" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false"><span data-feather="flag"
                                    className="rui-icon rui-icon-stroke-1_5"></span> <span>Language</span> <span
                                    className="rui-dropdown-circle"></span></a>
                            <ul className="nav dropdown-menu rui-navbar-dropdown-language">
                                <li><a href="#" className="rui-navbar-language active"><span
                                            className="rui-navbar-language-img"><img
                                                src="assets/images/united-states-of-america.svg" alt=""/></span>USA</a></li>
                                <li><a href="#" className="rui-navbar-language"><span className="rui-navbar-language-img"><img
                                                src="assets/images/china.svg" alt=""/></span>China</a></li>
                                <li><a href="#" className="rui-navbar-language"><span className="rui-navbar-language-img"><img
                                                src="assets/images/germany.svg" alt=""/></span>Germany</a></li>
                                <li><a href="#" className="rui-navbar-language"><span className="rui-navbar-language-img"><img
                                                src="assets/images/japan.svg" alt=""/></span>Japan</a></li>
                                <li><a href="#" className="rui-navbar-language"><span className="rui-navbar-language-img"><img
                                                src="assets/images/spain.svg" alt=""/></span>Spain</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <Modal title="Basic Modal"
            visible={changepassModal}
            width="50vw"
            onCancel={() => {setChangepassModal(false);}}
            footer={false}
        >
            <Form style={{width: "100%", marginTop: "2rem"}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size="large" placeholder="Old Password"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size="large" placeholder="Password"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password size="large" placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button className="btn-brand btn-block" size="large" type="primary" htmlType="submit" style={{width: "100%", marginTop: "1rem"}} >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </Fragment>
    )
}