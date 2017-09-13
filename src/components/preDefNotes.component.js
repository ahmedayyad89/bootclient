import React, { Component } from "react";
//import {getAllNotes} from "../services/note.service";
import { getAllPreDefs, saveAllPreDefs } from "../services/predefnotes.service";
export default class PreDefNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predef:{
                oneTo10:"",
            tenTo15:"",
            fifteenTo20:"",
            moreThat20:""}
        }

    }
    componentWillMount() {

        getAllPreDefs().then(res => {
            console.log(res);
            this.setState({predef : res.data});
        }).catch(err => console.log(err));

    }
    oneTo10Changed(e)
    {
        this.setState({ predef :{ ... this.state.predef , oneTo10 : e.target.value}});
    }
    tenTo15Changed(e)
    {
        this.setState({ predef :{ ... this.state.predef , tenTo15 : e.target.value}});
    }
    fifteenTo20Changed(e)
    {
        this.setState({ predef :{ ... this.state.predef , fifteenTo20 : e.target.value}});
    }
    moreThat20Changed(e)
    {
        this.setState({ predef :{ ... this.state.predef , moreThat20 : e.target.value}});
    }
    updateClicked(e)
    {
        e.preventDefault();
        saveAllPreDefs(this.state.predef
        //     {
        //     "oneTo10":this.state.oneTo10,
        //     "tenTo15":this.state.tenTo15,
        //     "fifteenTo20":this.state.fifteenTo20,
        //     "moreThat20":this.state.moreThat20
        // }
    ).then(res=>{
            this.setState(res.data);
            console.log(res);
        }).catch(err=>console.log(err))
    }

    render() {
        
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
