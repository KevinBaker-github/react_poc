import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>SRD 3.0 POC</h1>
      
          <p className="lead">
            You have logged in using OKTA. 
            <br/>
            Please select the menu options to view Property Info.
          </p>
    </div>
  );
}

export default Home;
