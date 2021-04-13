/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './frontend/NavBar/NavBar';
import Home from './frontend/home';
import LoginForm from './frontend/LoginForm';
import Sport from './frontend/Sport';
import About from './frontend/About';
import Forum from './frontend/Forum';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route path="/home" component={Home} />
        <Route path="/Sports" component={Sport} />
        <Route path="/About" component={About} />
        <Route path="/Forum" component={Forum} />
        <Route path="/Sign-in" component={LoginForm} />
      </div>
    </Router>
  );
}

export default App;