import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import Login from './components/auth/Login';

import './App.css';
import FilterPage from './components/pages/FilterPage';

function onAuthRequired({ history }) {
  history.push('/login');
}

class App extends Component {
    render() {
        return (
            <Router>
                <Security
                    issuer="https://dev-77765312.okta.com/oauth2/default"
                    client_id="0oaa967n8bjsX21Z85d7"
                    redirect_uri={window.location.origin + '/implicit/callback'}
                    onAuthRequired={onAuthRequired}
                >
                    <div className="App">
                        <Navbar />
                        <div className="container">
                            <Route path="/" exact={true} component={Home} />
                            <SecureRoute path="/staff" exact={true} component={Staff} />
                            <SecureRoute path="/filterPage" exact={true} component={FilterPage} />

                            <Route
                                path="/login"
                                render={() => (
                                    <Login baseUrl="https://dev-77765312.okta.com" />
                                )}
                            />
                            <Route path="/implicit/callback" component={ImplicitCallback} />
                        </div>
                    </div>
                </Security>
            </Router>
        );
    }
}


export default App;
