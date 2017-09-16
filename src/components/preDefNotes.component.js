import React, { Component } from "react";
//import {getAllNotes} from "../services/note.service";
import { getAllPreDefs, saveAllPreDefs } from "../services/predefnotes.service";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
class PreDefNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predef:{
                oneTo10:"",
            tenTo15:"",
            fifteenTo20:"",
            moreThat20:""}, 
            noUser:false
        }

    }
    componentWillMount() {

        getAllPreDefs().then(res => {
            this.setState({predef : res.data});
        }).catch(err => console.log(err));
        if(Object.keys(this.props.globalState.user).length === 0)
        {
            this.setState({noUser:true});
        }

    }
    oneTo10Changed(e)
    {
        this.setState({ predef :{...this.state.predef , oneTo10 : e.target.value}});
    }
    tenTo15Changed(e)
    {
        this.setState({ predef :{...this.state.predef , tenTo15 : e.target.value}});
    }
    fifteenTo20Changed(e)
    {
        this.setState({ predef :{...this.state.predef , fifteenTo20 : e.target.value}});
    }
    moreThat20Changed(e)
    {
        this.setState({ predef :{...this.state.predef , moreThat20 : e.target.value}});
    }
    updateClicked(e)
    {
        e.preventDefault();
        saveAllPreDefs(this.state.predef).then(res=>{
            this.setState(res.data);
        }).catch(err=>{})
    }


    render() {
        if(this.state.noUser === true)
        {
            return (
                <div>
                <p>
                    You're not logged in, please go to <Link to="/login">Login</Link> and enter your credetials.
                </p>
                </div> 
            );
        }
        return (
            <div className="panel panel-default">
                <div className="panel-heading panel-heading-transparent">
                    <h2 className="panel-title bold">Update Predefined Notes</h2>
                </div>
                <div className="panel-body">
                    <form>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">

                                    <label htmlFor="oneTo10">
                                        1 - 10
                    </label>
                                    <input type="text" name="oneTo10" className="form-control" value={this.state.predef.oneTo10} onChange={this.oneTo10Changed.bind(this)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

                                    <label htmlFor="tenTo15">
                                        10 - 15
            </label>
                                    <input type="text" name="tenTo15" className="form-control" value={this.state.predef.tenTo15} onChange={this.tenTo15Changed.bind(this)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

                                    <label htmlFor="fifteenTo20">
                                        15 - 20
                    </label>
                                    <input type="text" name="fifteenTo20" className="form-control" value={this.state.predef.fifteenTo20} onChange={this.fifteenTo20Changed.bind(this)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">

                                    <label htmlFor="moreThat20">
                                        20 -
                    </label>
                                    <input type="text" name="moreThat20" className="form-control" value={this.state.predef.moreThat20} onChange={this.moreThat20Changed.bind(this)} />
                                </div>
                            </div>
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
export default connect(mapGlobalStateToProps, {  })(PreDefNotes);