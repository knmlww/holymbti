import React from 'react';
import logo from '../logo.svg';
import '../App.css';    

const Second = () => {
  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        This is second page
      </p>
      <a
        className="App-link"
        href="/second"
        target="_blank"
        rel="noopener noreferrer"
      >
        Let's Start!
      </a>
    </header>
  </div>
  );
}

export default Second;
