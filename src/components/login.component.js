import { login } from "../services/login.service";
import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatchLogin } from "../actions/users.actions";
import { Redirect } from "react-router-dom";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: "",
            loginfailed: false
        }
    }
    emailChanged(e) {
        this.setState({ email: e.target.value })
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value })
    }
    loginClicked(e) {
        e.preventDefault();
        login({ username: this.state.email, password: this.state.password }).then(res => {
            this.props.dispatchLogin(res.data);
            window.localStorage.setItem('user', JSON.stringify(res.data));
            window.localStorage.setItem('auth', res.config.headers.Authorization);
            this.setState({ redirect: "dayweather" });
        }).catch(error => {
            this.setState({ loginfailed: true })
        })

    }
    loginError() {
        if (this.state.loginfailed) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ color: 'red' }}>Login Failed, check your credentials</p>
                    </div>
                </div>
            );
        }
    }
    render() {

        if (this.state.redirect === "dayweather" || Object.keys(this.props.globalState.user).length > 0) {
            return (
                <Redirect to="/dayweather" />
            )
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading panel-heading-transparent">
                    <h2 className="panel-title bold">Login</h2>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            {this.loginError()}
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="email">
                                        Email
                    </label>
                                    <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.emailChanged.bind(this)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="password">
                                        Password
                    </label>
                                    <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.passwordChanged.bind(this)} >
                                    </input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3">
                                    <br />
                                    <button onClick={this.loginClicked.bind(this)} className="btn btn-primary"  ><i ></i>Login</button>
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
export default connect(mapGlobalStateToProps, { dispatchLogin })(Login);