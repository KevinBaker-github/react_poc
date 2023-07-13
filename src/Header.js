import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

function Header() {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => { await oktaAuth.signInWithRedirect(); }
  const logout = async () => { await oktaAuth.signOut(); }

  const userText = authState.isAuthenticated
    ? <button onClick={ logout }>Logout</button>
    : <button onClick={ login }>Log In</button>;

  return (
    <header>
      <div>SRD 3.0 React Login</div>
      <ul className="menu">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/listProperty">List Property</Link></li>
        <li><Link to="/editProperty">Create/Edit Property</Link></li>
      </ul>
      {userText}
    </header>
  );
}

export default Header;
