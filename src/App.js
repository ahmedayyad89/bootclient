import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/statics/header.component.js"
class App extends Component {
  
  render() {
    return (
      // <div className="App">
      //   <div className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h2>Welcome to React</h2>
      //   </div>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

<div>
      <Header />
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
            {/* <Department allDepartments={this.state.allDepartments} addDepartmentClick= {this.addDepartmentClick.bind(this)} /> */}
          </div>
          {/* <div className="col-md-6">
            <Employee allDepartments={this.state.allDepartments}/>
          </div> */}
        </div>
      </div>
      </section>
      </div>
      
    );
  }
}

export default App;
