import React, {Fragment} from 'react';
import './App.css';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import LoginScreen from './screen/login/login_screen';
import DaftarHadirScreen from './screen/daftar_hadir/daftar_hadir';
import MyProfile from './screen/myProfile/myProfile'
import MainScreen from './screen/main/main_screen';
import AddEmployee from './screen/addEmployee/addEmployee'
import DetailEmployee from './screen/detailEmployee/detailEmployee'
import StaffScreen from './screen/staff/staff';
import DetailStaff from './screen/staff/detailStaff'
import addStaff from './screen/staff/addStaff';
import jwtDecode from "jwt-decode";

class App extends React.Component {

    routeGuard = (Component) => {
        
        if (sessionStorage.getItem('token')) {
            let token = sessionStorage.getItem('token')
            const { exp } = jwtDecode(token)
            const expirationTime = (exp * 1000) - 60000
            if (Date.now() >= expirationTime) {
                return <Redirect to="/login"></Redirect>
            }
            else{
                return <Component/>
            }
            
        } else {
            return <Redirect to="/login"></Redirect>
        }
    };

    render() {
        return (
            <Fragment>
                <Router>
                    <Switch>
                        <Route exact path="/"
                               render={() => {
                                   return this.routeGuard(LoginScreen)
                               }}></Route>
                        <Route path="/employee" render={() => {
                            return this.routeGuard(MainScreen)
                        }}></Route>
                        <Route path="/staff" render={() => {
                            return this.routeGuard(StaffScreen)
                        }}></Route>
                        <Route path="/staffdetail/:id" render={() => {
                            return this.routeGuard(DetailStaff)
                        }}></Route>
                        <Route path="/myprofile" render={() => {
                            return this.routeGuard(MyProfile)
                        }}></Route>
                        <Route path="/employeedetail/:id" render={() => {
                            return this.routeGuard(DetailEmployee)
                        }}></Route>
                        <Route path='/login' component={LoginScreen}></Route>
                        <Route path='/attendance' render={() => {
                            return this.routeGuard(DaftarHadirScreen)
                        }}></Route>
                        <Route path='/addemployee' render={() => {
                            return this.routeGuard(AddEmployee)
                        }}/>
                        <Route path='/addstaff' render={() => {
                            return this.routeGuard(addStaff)
                        }}/>
                    </Switch>
                </Router>
            </Fragment>
        )
    };
}

export default App;