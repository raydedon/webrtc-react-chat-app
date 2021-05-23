import React from 'react'
import logo from './logo.svg'
import app from './App.scss'

function App() {
  return (
    <div className={app.app}>
      <header className={app.appHeader}>
        <img src={logo} className={app.appLogo} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={app.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
