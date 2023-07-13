import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { Route } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { useHistory } from 'react-router-dom';
import ListPropertyComponent from './component/ListPropertyComponent';
import AddPropertyComponent from './component/AddPropertyComponent';
import EditPropertyComponent from './component/EditPropertyComponent';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-24876482.okta.com/oauth2/default',
  clientId: '0oaa9faljmhBelRjv5d7',
  redirectUri: window.location.origin + '/implicit/callback'
});

const App = () => {
  
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };
  const onAuthRequired = function() {
    history.push('/login')
  }

  return (
    <div className="App">
     
      <div className="container">
          <Security oktaAuth={oktaAuth}
                    restoreOriginalUri={restoreOriginalUri}
                    onAuthRequired={onAuthRequired}>
            <Header/>
            
            <Route path='/login' exact={true} component={Login}/>
              <SecureRoute path='/home' exact={true} component={Home}/>
              <SecureRoute path="/listProperty" exact={true} component={ListPropertyComponent} />
              <SecureRoute path="/editProperty" exact={true} component={EditPropertyComponent} />
              <SecureRoute path="/addProperty" exact={true} component={AddPropertyComponent} />
            <Route path='/implicit/callback' component={LoginCallback}/>
          </Security>
        </div>
      </div>
  );
}

export default App;
