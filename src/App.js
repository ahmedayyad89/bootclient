import React, { Component } from 'react';
import './App.css';
import Header from "./components/statics/header.component.js"
class App extends Component {
  
  render() {
    return (
      

<div>
      <Header />
      <section>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {this.props.children}
          </div>
        </div>
      </div>
      </section>
      </div>
      
    );
  }
}

export default App;
