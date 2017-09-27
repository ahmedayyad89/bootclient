import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import seeWeatherNote from "./components/seeWeatherNote.component";
import AllNotes from "./components/allNotes.component";
import PredefinedNotes from "./components/predefinedNotes.component";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
const Routes = () => (
    <Router>
        <div>
            <App>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/dayweather" component={seeWeatherNote} />
                    <Route path="/allnotes" component={AllNotes} />
                    <Route path="/predefnotes" component={PredefinedNotes} />
                    <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
                </Switch>
            </App>

        </div>
    </Router>
)
const createStoreMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(<Provider store={createStoreMiddleware(reducers)}>
    <Routes />
</Provider>
    , document.getElementById('root'));
registerServiceWorker();
