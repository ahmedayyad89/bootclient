import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/login.service";
import {connect} from "react-redux";
import { dispatchLogout} from "../../actions/users.actions"
import {Redirect} from "react-router-dom";
 class HeaderComponent extends Component{



    logoutClicked(e)
    {
       // e.preventDefault();
        logout().then(
            res=> {
                this.props.dispatchLogout();
                console.log(res)
            }).catch(err=>console.log(err));
    }

    renderChoices()
    {
        if(Object.keys(this.props.globalState.user).length === 0)
        {
            return(
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
        if(this.props.globalState.user.role === "ROLE_ADMIN")
        {
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
        if(this.props.globalState.user.role === "ROLE_USER")
        {
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
    render(){
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
    
                    
                    <div className="navbar-collapse pull-right nav-main-collapse collapse submenu-dark">
                        <nav className="nav-main">

                                {/* <li>
                                    <a href="#">HOME</a>
                                </li> */}
                            
                            {/* <ul id="topMain" className="nav nav-pills nav-main"> */}
                                {/* <li>
                                    <Link to="/login">
                                        Login
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
                                </li> */}
                                {this.renderChoices()}
                            {/* </ul> */}
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
export default connect(mapGlobalStateToProps, { dispatchLogout })(HeaderComponent);