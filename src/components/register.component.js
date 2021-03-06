import { register } from "../services/register.service";
import { login } from "../services/login.service";
import React, { Component } from "react";
import { connect } from "react-redux";
import { dispatchLogin } from "../actions/users.actions"
import { Redirect } from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            redirect: "",
            errors:{},
            registerationFailed: false
        }
    }
    emailChanged(e) {
        this.setState({ email: e.target.value })
    }
    passwordChanged(e) {
        this.setState({ password: e.target.value })
    }
    mobileNumberChanged(e) {
        this.setState({ mobileNumber: e.target.value })
    }
    nameChanged(e) {
        this.setState({ name: e.target.value })
    }
    makeErrors(subErrors)
    {
        subErrors.forEach((subError)=>{
            let errors = this.state.errors
            errors[subError.field] = subError.message
            this.setState({errors: errors});
            return subError.field;
        })
    }
    registerClicked(e) {
        e.preventDefault();
        register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobileNumber: this.state.mobileNumber
        }).then(res => {
            login({ username: this.state.email, password: this.state.password })
                .then(res => {
                    this.props.dispatchLogin(res.data);
                    window.localStorage.setItem('user', JSON.stringify(res.data));
                    window.localStorage.setItem('auth', res.config.headers.Authorization);
                    this.setState({ redirect: "dayweather" });
                })

        }).catch(err => {
            this.setState({ registerationFailed: true })
            this.makeErrors(err.response.data.subErrors)
        })

    }
    renderFailure() {
        if (this.state.registerationFailed === true) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <p style={{ color: 'red' }}>Registeration Failed, Check your information.</p>
                    </div>
                </div>
            );
        }
    }
    render() {
        if (this.state.redirect === "dayweather") {
            return (
                <Redirect to="/dayweather" />
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
                            {this.renderFailure()}
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="name">
                                        Name
                    </label>
                                    <input type="text" style={(this.state.errors.name !== undefined)? {borderColor: 'red'}:{}} className="form-control" name="name" value={this.state.name} onChange={this.nameChanged.bind(this)} >
                                    </input>
                                    {(this.state.errors.name !== undefined)?(<span style={{color:'red'}} >{this.state.errors.name}</span>):null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="email">
                                        Email
                    </label>
                                    <input type="email" className="form-control" style={(this.state.errors.email !== undefined)? {borderColor: 'red'}:{}} name="email" value={this.state.email} onChange={this.emailChanged.bind(this)} >
                                    </input>
                                    {(this.state.errors.email !== undefined)?(<span style={{color:'red'}} >{this.state.errors.email}</span>):null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="password">
                                        Password
                    </label>
                                    <input type="password" className="form-control" style={(this.state.errors.password !== undefined)? {borderColor: 'red'}:{}} name="password" value={this.state.password} onChange={this.passwordChanged.bind(this)} >
                                    </input>
                                    {(this.state.errors.password !== undefined)?(<span style={{color:'red'}} >{this.state.errors.password}</span>):null}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlFor="mobileNumber">
                                        Mobile Number
                    </label>
                                    <input type="text" className="form-control" style={(this.state.errors.mobileNumber !== undefined)? {borderColor: 'red'}:{}} name="mobileNumber" value={this.state.mobileNumber} onChange={this.mobileNumberChanged.bind(this)} >
                                    
                                    </input>
                                    {(this.state.errors.mobileNumber !== undefined)?(<span style={{color:'red'}} >{this.state.errors.mobileNumber}</span>):null}
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