/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grommet } from 'grommet';
import NavBar from './frontend/NavBar/NavBar';
import Home from './frontend/home';
import LoginForm from './frontend/LoginForm';
import signUp from './frontend/SignUp';
import signOut from './frontend/SignOut';
import Sport from './frontend/Sport';
import Chat from './frontend/Chat';
import Forum from './frontend/Forum';
import Team from './frontend/Team';

import './App.css';

function App() {
  return (
    <Router>
      <Grommet>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/Sports" component={Sport} />
          <Route exact path="/Chat" component={Chat} />
          <Route exact path="/Forum" component={Forum} />
          <Route exact path="/Sign-in" component={LoginForm} />
          <Route exact path="/Sign-up" component={signUp} />
          <Route exact path="/Sign-out" component={signOut} />
          <Route exact path="/Team/:league" component={Team} />
        </div>
      </Grommet>
    </Router>
  );
}

export default App;
