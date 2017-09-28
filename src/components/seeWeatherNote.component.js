import React, { Component } from "react";
import { getTodaysNote, saveTodaysNote } from "../services/note.service";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
            noUser: "",
            loaded: false
        };
    }
    noteChanged(e) {
        this.setState({ dayNote: { ...this.state.dayNote, note: e.target.value } });
    }
    componentWillMount() {
        if (Object.keys(this.props.globalState.user).length === 0) {
            this.setState({ noUser: "true" });
        }
        getTodaysNote().then(res => {
            this.setState({ dayNote: res.data });
            this.setState({ loaded: true })
        }).catch(err => { });

    }
    submitClicked(e) {
        e.preventDefault();
        saveTodaysNote({ note: this.state.dayNote.note }).then(res => {
            this.setState({ dayNote: res.data });
        }).catch(err => { });

    }
    renderNote() {
        if (Object.keys(this.props.globalState.user).length === 0) {
            this.setState({ noUser: "true" });
            return (<div />);
        }
        if (this.props.globalState.user.role === "ROLE_ADMIN") {
            return (
                <form> <input className="form-control" type="textfield" name="noteText" value={this.state.dayNote.note} onChange={this.noteChanged.bind(this)} ></input>
                    <button className="btn btn-primary" onClick={this.submitClicked.bind(this)}><i ></i>Update Note</button>
                </form>
            )
        }
        if (this.props.globalState.user.role === "ROLE_USER") {
            return (
                <h2>
                    <span style={{fontWeight:'bold' , color:'black' , fontSize:'25px'}}>System Note: </span>
                    <span style={{fontWeight:'normal' , color:'red' , fontSize:'20px'}}>{this.state.dayNote.note}</span>
                </h2>
            )
        }
    }
    render() {
        if (this.state.noUser === "true") {
            return (
                <div>
                    <p>
                        You're not logged in, please go to <Link to="/login">Login</Link> and enter your credetials.
                </p>
                </div>
            );
        }

        if (this.state.loaded !== true) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        return (
            <div>
                <h1>{(new Date(this.state.dayNote.date)).toDateString()}</h1>
                {this.renderNote()}
                <table className="table table-hover">
                    <h1 style={{fontWeight:'bold' , color:'black'}}>Weather Details:</h1>
                    <tbody>
                        <tr>
                            <td style={{fontWeight:'bold' , color:'black' , fontSize:'20px'}}>Temperature: </td>
                            <td style={{fontWeight:'normal' , color:'red' , fontSize:'15px'}}>{(this.state.dayNote.weatherModel.temp).toPrecision(4)}<span> </span>&#8451;</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold' , color:'black' , fontSize:'20px'}}>Pressure: </td>
                            <td style={{fontWeight:'normal' , color:'red' , fontSize:'15px'}}>{this.state.dayNote.weatherModel.pressure}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold' , color:'black' , fontSize:'20px'}}>Humidity: </td>
                            <td style={{fontWeight:'normal' , color:'red' , fontSize:'15px'}}>{this.state.dayNote.weatherModel.humidity}</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold' , color:'black' , fontSize:'20px'}}>Minimum - Temperature: </td>
                            <td style={{fontWeight:'normal' , color:'red' , fontSize:'15px'}}>{(this.state.dayNote.weatherModel.temp_min).toPrecision(4)}<span> </span>&#8451;</td>
                        </tr>
                        <tr>
                            <td style={{fontWeight:'bold' , color:'black' , fontSize:'20px'}}>Maximum - Temperature: </td>
                            <td style={{fontWeight:'normal' , color:'red' , fontSize:'15px'}}>{(this.state.dayNote.weatherModel.temp_max).toPrecision(4)}<span> </span>&#8451;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapGlobalStateToProps(globalState) {
    return {
        globalState: globalState.user
    };
}
export default connect(mapGlobalStateToProps, {})(SeeWeatherNote);