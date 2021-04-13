/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable spaced-comment */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line react/no-deprecated
import React, { useState } from 'react';
import PropTypes from 'prop-types';
//import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from './Redux/actions/action-creators';

import './LoginForm.css';

function mapStateToProps(state) {
  return {
    Authenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch(signIn({ username, password })),
});

const LoginForm = ({ login }) => {
  const [value, setValue] = useState({
    username: '',
    password: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    console.log(e.target.value);
    setUsername(e.target.value);
    console.log(username);
  }

  function handleChangePass(e) {
    console.log(e.target.value);
    setPassword(e.target.value);
    console.log(password);
  }
  //const history = useHistory();
  LoginForm.propTypes = {
    // eslint-disable-next-line react/no-deprecated
    login: PropTypes.func.isRequired,
  };
  return (
    <form
      className="Center"
      value={value}
      onChange={(nextValue) => setValue(nextValue)}
      onSubmit={(e) => {
        e.preventDefault();
        console.log('HELLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOO');
        login(username, password);
      }}
    >
      <div className="form-inner">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input type="email" name="email" id="email" onChange={handleChangeEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={handleChangePass} />
        </div>
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
