import React, { Component } from "react";
import { getTodaysNote, saveTodaysNote } from "../services/note.service";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
class SeeWeatherNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dayNote:
            {
                date: 0,
                note: "",
                weather: {
                    temp: 0.0,
                    pressure: 0.0,
                    humidity: 0.0,
                    temp_min: 0.0,
                    temp_max: 0.0
                }
            },
            noUser : "", 
            loaded : false
        };
    }
    noteChanged(e) {
        this.setState({ dayNote: {...this.state.dayNote , note:e.target.value} });
    }
    componentWillMount() {
        if(Object.keys(this.props.globalState.user).length === 0)
        {
            this.setState({noUser:"true"});
        }
        getTodaysNote().then(res => {
            this.setState({dayNote:res.data});
            this.setState({loaded:true})
        }).catch(err => {});

    }
    submitClicked(e) {
        e.preventDefault();
        saveTodaysNote(this.state.dayNote).then(res => {
            this.setState({dayNote:res.data});
        }).catch(err => {});

    }
    renderNote()
    {
        if(Object.keys(this.props.globalState.user).length === 0)
        {
            this.setState({noUser:"true"});
            return (<div/>);
        }
        if(this.props.globalState.user.role === "ROLE_ADMIN")
        {
            return (
                <form> <input className="form-control" type="textfield" name="noteText" value={this.state.dayNote.note} onChange={this.noteChanged.bind(this)} ></input>
                <button className="btn btn-primary" onClick={this.submitClicked.bind(this)}><i ></i>Update Note</button>
            </form>
            )
        }
        if(this.props.globalState.user.role === "ROLE_USER")
        {
            return (
               <h2>
                   {this.state.dayNote.note}
               </h2>
            )
        }
    }
    render() {
        if(this.state.noUser === "true")
        {
            return (
                <div>
                <p>
                    You're not logged in, please go to <Link to="/login">Login</Link> and enter your credetials.
                </p>
                </div> 
            );
        }
        
        if(this.state.loaded !== true)
        {
            return(
            <div>
            {/* <img src="../../logo.svg"/> */}
            <h1>Loading...</h1>
            </div>
            );
        }
        return (
            <div>
                <h1>{(new Date(this.state.dayNote.date)).toDateString()}</h1>
                {this.renderNote()}
                <h3>Temperature: </h3><h3>{(this.state.dayNote.weatherModel.temp - 273.15).toPrecision(4)}</h3>
                <h3>Pressure: </h3><h3>{this.state.dayNote.weatherModel.pressure}</h3>
                <h3>Humidity: </h3><h3>{this.state.dayNote.weatherModel.humidity}</h3>
                <h3>Minimum - Temperature: </h3><h3>{(this.state.dayNote.weatherModel.temp_min - 273.15).toPrecision(4)}</h3>
                <h3>Maximum - Temperature: </h3><h3>{(this.state.dayNote.weatherModel.temp_max - 273.15).toPrecision(4)}</h3>

            </div>
        );
    }
}
function mapGlobalStateToProps(globalState) {
    return {
        globalState: globalState.user
    };
}
export default connect(mapGlobalStateToProps, {  })(SeeWeatherNote);