import {login, logout} from "../services/login.service";
import React,{Component} from "react";
import {connect} from "react-redux";
import {dispatchLogin} from "../actions/users.actions"
import {Redirect} from "react-router-dom";
class Login extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            username : "",
            password : "",
            redirect : ""
        }
    }
    usernameChanged(e)
    {
        this.setState({username: e.target.value})
    }
    passwordChanged(e)
    {
        this.setState({password: e.target.value})
    }
    loginClicked(e)
    {
        e.preventDefault();
        login({username: this.state.username, password: this.state.password}).then (res=> {
            this.props.dispatchLogin(res.data);
            this.setState({redirect : "dayweather"});
            console.log(res);
        }).catch(function(error) {
            console.log(error)
          }) 

    }
    logoutClicked(e)
    {
        e.preventDefault();
        logout().then(res=> console.log(res)).catch(err=>console.log(err));
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
                <h2 className="panel-title bold">Login</h2>
            </div>
            <div className="panel-body"> 
            <form>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                    
                    <label htmlFor="username">
                        Email
                    </label>
                    <input type="email" name = "username" className="form-control" value={this.state.username} onChange={this.usernameChanged.bind(this)} >
                    </input>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-12">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name = "password" className="form-control" value={this.state.password} onChange={this.passwordChanged.bind(this)} >
                    </input>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-3">
                    <br />
                <button  onClick={this.loginClicked.bind(this)} className="btn btn-primary"  ><i ></i>Login</button>
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