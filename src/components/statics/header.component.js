import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/login.service";
import { connect } from "react-redux";
import { dispatchLogout, dispatchLogin } from "../../actions/users.actions";
import axios from "axios";
class HeaderComponent extends Component {



    logoutClicked(e) {
        logout().then(res => {
            /**Proof of concept, don't want it in the actual demo */
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('auth');
            //axios.defaults.headers.common['Authorization'] = null;
         }).catch(err => console.log(err));
        this.props.dispatchLogout();
    }
    componentWillMount() {
        var user = window.localStorage.getItem('user');
        var authToken = window.localStorage.getItem('auth');
        console.log(user);
        console.log(authToken);
        if (user !== null) {
            this.props.dispatchLogin(JSON.parse(user));
        }
        if (authToken !== null) {
            axios.defaults.headers.common['Authorization'] = authToken;
        }
    }
    renderChoices() {
        if (Object.keys(this.props.globalState.user).length === 0) {
            return (
                <ul id="topMain" className="nav nav-pills nav-main">
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            Register
                        </Link>
                    </li>
                </ul>
            );
        }
        if (this.props.globalState.user.role === "ROLE_ADMIN") {
            return (
                <ul id="topMain" className="nav nav-pills nav-main">
                    <li>
                        <Link to="/predefnotes">
                            Predefined Notes
                        </Link>
                    </li>
                    <li>
                        <Link to="/allnotes">
                            All Notes
                        </Link>
                    </li>
                    <li>
                        <Link to="/dayweather">
                            Today's Weather
                        </Link>
                    </li>
                    <li >
                        <Link to="/" onClick={this.logoutClicked.bind(this)}>
                            Logout
                        </Link>
                    </li>
                </ul>
            )
        }
        if (this.props.globalState.user.role === "ROLE_USER") {
            return (
                <ul id="topMain" className="nav nav-pills nav-main">

                    <li>
                        <Link to="/dayweather">
                            Today's Weather
                        </Link>
                    </li>
                    <li >
                        <Link to="/" onClick={this.logoutClicked.bind(this)}>
                            Logout
                        </Link>
                    </li>
                </ul>
            )
        }
    }
    render() {
        return (
            <div id="header" className="sticky clearfix">
                <header id="topNav">
                    <div className="container">
                        <button className="btn btn-mobile" data-toggle="collapse" data-target=".nav-main-collapse">
                            <i className="fa fa-bars"></i>
                        </button>
                        <Link className="logo pull-left scrollTo" to="/">
                            <img src="Orange-logo.png" alt="" />
                        </Link>
                        <div className="pull-right navbar-collapse  nav-main-collapse collapse submenu-dark">
                            <nav className="nav-main">
                                {this.renderChoices()}
                            </nav>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}

function mapGlobalStateToProps(globalState) {
    return {
        globalState: globalState.user
    };
}
export default connect(mapGlobalStateToProps, { dispatchLogout, dispatchLogin })(HeaderComponent);