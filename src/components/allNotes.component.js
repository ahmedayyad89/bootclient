import React, {Component} from "react";
import {getAllNotes} from "../services/note.service";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
class AllNotes extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            allNotes:[]

        }

    }
    componentWillMount()
    {
        getAllNotes().then(res=>{
            this.setState({allNotes:res.data});
        }).catch(err => {});

    }
    renderOldNotes()
    {
        //console.log(this.state.allNotes);
        if(this.state.allNotes.length !== 0)
        {
            //console.log(this.state.allNotes)
            return this.state.allNotes.map((note,index)=>{
            return(
                <tr key = {index}>
                <td>{(new Date(note.date)).toDateString()}</td>
                <td>{(note.weatherModel.temp_min - 273.1).toPrecision(2)}</td>
                <td>{(note.weatherModel.temp_max - 273.1).toPrecision(2)}</td>
                <td>{note.note}</td>
            </tr>);
            });
        }
        else return (
            <tr >
            <td>Still</td>
            <td>Loading</td>
            <td>..</td>
            <td>.</td>
        </tr>
        );
    }
    render()
    {
        if(Object.keys(this.props.globalState.user).length === 0)
        {
            return (
                <div>
                <p>
                    You're not logged in, please go to <Link to="/login">Login</Link> and enter your credetials.
                </p>
                </div> 
            );
        }
        if(this.props.globalState.user.role !== "ROLE_ADMIN")
        {
            return (
                <Redirect to="/dayweather" />
            )
        }
        return (
            <div className="table-responsive">
            <h4>All Notes Until Today</h4>
            <table className="table table-hover">
            <thead>
            <tr>
                <th>Date</th>
                <th>Min-Temprature</th>
                <th>Max-Temprature</th>
                <th>Note</th>
            </tr>
        </thead>
        <tbody>
        {this.renderOldNotes()}
        </tbody>
            </table>
        </div>
            
        )

        
    }
}

function mapGlobalStateToProps(globalState) {
    return {
        globalState: globalState.user
    };
}
export default connect(mapGlobalStateToProps, {  })(AllNotes);