import React from 'react';
import "semantic-ui-css/semantic.min.css";
import logo from '../../assets/images/images.png'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {withRouter} from "react-router";

class MyNavbar extends React.Component {
    render() {
        const name = sessionStorage.getItem('name');
        return (
                    <Menu color="red" inverted>
                <Menu.Item color="black">
                    <Link to='/employee'>
                        <img src={logo} width='32' height='32' alt="logo"/></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/employee'>Employee Management</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to='/staff'>Staff Management</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/attendance">Attendance</Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Link to='/myProfile'>{name}</Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

export default withRouter(MyNavbar);