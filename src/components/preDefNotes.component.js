import React, { Component } from "react";
//import {getAllNotes} from "../services/note.service";
import { getAllPreDefs, saveAllPreDefs } from "../services/predefnotes.service";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class PreDefNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predef: [],
            noUser: false
        }

    }
    componentWillMount() {

        getAllPreDefs().then(res => {
            this.setState({ predef: res.data });
        }).catch(err => { });

    }

    updateClicked(e) {
        e.preventDefault();
        saveAllPreDefs(this.state.predef).then(res => {
            this.setState(res.data);
        }).catch(err => { })
    }

    makeBindingMethods() {
        let bindingMethodsHolder = this.state.predef.map((predef, index) => {
            return ((e) => {
                let notes = this.state.predef;
                notes[index].message = e.target.value;
                this.setState({ predef: notes });
            })
        });
        this.setState({ bindingMethods: bindingMethodsHolder })

    }

    renderPredefs() {
        if (this.state.predef.length >0 
            && (this.state.bindingMethods === undefined || this.state.bindingMethods.length !== this.state.predef.length)) {
            this.makeBindingMethods();
        }
        return this.state.predef.map((predef, index) => {
            return (
                <div className="row" key={index}>
                    <div className="col-md-12">

                        <label htmlFor={index.toString()} >
                            {this.state.predef[index].minimumTemperature} - {this.state.predef[index].maximumTemperature}
                        </label>
                        <input type="text" name={index.toString()} className="form-control" value={this.state.predef[index].message} onChange={this.state.bindingMethods[index].bind(this)} />
                    </div>
                </div>
            )
        })
    }

    render() {
        if (Object.keys(this.props.globalState.user).length === 0) {
            return (
                <div>
                    <p>
                        You're not logged in, please go to <Link to="/login">Login</Link> and enter your credetials.
                </p>
                </div>
            );
        }
        if (this.props.globalState.user.role !== "ROLE_ADMIN") {
            return (
                <Redirect to="/dayweather" />
            )
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading panel-heading-transparent">
                    <h2 className="panel-title bold">Update Predefined Notes</h2>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            {this.renderPredefs()}
                            <div className="row">
                                <div className="col-md-3">
                                    <br />
                                    <button onClick={this.updateClicked.bind(this)} className="btn btn-primary"  ><i ></i>Update</button>
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
export default connect(mapGlobalStateToProps, {})(PreDefNotes);