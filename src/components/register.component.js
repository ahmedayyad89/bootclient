import { register } from "../services/register.service";
import { login } from "../services/login.service";
import React, { Component } from "react";
import {connect} from "react-redux";
import {dispatchLogin} from "../actions/users.actions"
import {Redirect} from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            mobileNumber: "",
            role: "ROLE_USER",
            redirect : ""
        }
    }
    usernameChanged(e) {
        this.setState({ username: e.target.value })
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value })
    }
    mobileNumberChanged(e) {
        this.setState({ mobileNumber: e.target.value })
    }
    registerClicked(e) {
        e.preventDefault();
        register({username : this.state.username, 
            password:this.state.password, 
            mobileNumber:this.state.mobileNumber,
            role:this.state.role}).then(res => {
            console.log(res);
            login({ username: this.state.username, password: this.state.password })
                .then(res => {
                    this.props.dispatchLogin(res.data);
                    this.setState({redirect : "dayweather"});
                    console.log(res);
                })
                .catch(err => console.log(err))

        }).catch(function (error) {
            console.log(error)
        })

    }
    render() {
        if(this.state.redirect === "dayweather")
        {
            return (
                <Redirect to="/dayweather"/>
            )
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading panel-heading-transparent">
                    <h2 className="panel-title bold">Register New User</h2>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="username">
                                        Email
                    </label>
                                    <input type="email" className="form-control" name="username" value={this.state.username} onChange={this.usernameChanged.bind(this)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-12">
                                    <label htmlFor="password">
                                        Password
                    </label>
                                    <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.passwordChanged.bind(this)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-12">
                                    <label htmlFor="mobileNumber">
                                        Mobile Number
                    </label>
                                    <input type="text" className="form-control" name="mobileNumber" value={this.state.mobileNumber} onChange={this.mobileNumberChanged.bind(this)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <br />
                                    <button className="btn btn-primary" onClick={this.registerClicked.bind(this)}><i ></i> Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

function mapGlobalStateToProps(globalState) {
    return {
        globalState: globalState.user
    };
}
export default connect(mapGlobalStateToProps, { dispatchLogin })(Register);