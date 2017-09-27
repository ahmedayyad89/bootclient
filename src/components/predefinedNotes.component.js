import React, { Component } from "react";
import { getAllPredefinedNotes, saveAllPredefinedNotes } from "../services/predefnotes.service";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
class predefinedNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predefinedNotes: [],
            noUser: false
        }

    }
    componentWillMount() {
        getAllPredefinedNotes().then(res => {
            this.setState({ predefinedNotes: res.data });
        })

    }

    updateClicked(e) {
        e.preventDefault();
        saveAllPredefinedNotes(this.state.predefinedNotes).then(res => {
            this.setState(res.data);
        }).catch(err => { })
    }

    makeBindingMethods() {
        console.log(this.state.predefinedNotes);
        let bindingMethodsHolder = this.state.predefinedNotes.map((predef, index) => {
            return ((e) => {
                let notes = this.state.predefinedNotes;
                notes[index].message = e.target.value;
                this.setState({ predefinedNotes: notes });
            }).bind(this);
        });
        console.log(bindingMethodsHolder);
        this.setState({ bindingMethods: bindingMethodsHolder })

    }

    renderPredefinedNotes() {
       
        if(this.state.bindingMethods === undefined)
        {
            this.makeBindingMethods();
        }
        if (this.state.predefinedNotes.length > 0
            && this.state.bindingMethods.length !== this.state.predefinedNotes.length) {
            this.makeBindingMethods();
        }
        return this.state.predefinedNotes.map((predef, index) => {
            return (
                <div className="row" key={index}>
                    <div className="col-md-12">

                        <label htmlFor={index.toString()} >
                            {this.state.predefinedNotes[index].minimumTemperature} - {this.state.predefinedNotes[index].maximumTemperature}
                        </label>
                        <input type="text" name={index.toString()} className="form-control" value={this.state.predefinedNotes[index].message} 
                        onChange={this.state.bindingMethods[index]} />
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
                            {this.renderPredefinedNotes()}
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
export default connect(mapGlobalStateToProps, {})(predefinedNotes);