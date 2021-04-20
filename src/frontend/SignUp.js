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
import { signUp } from './Redux/actions/action-creators';

import './SignUp.css';

function mapStateToProps(state) {
  return {
    Authenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => ({
  createuser: (firstname, lastname, username, password) => dispatch(
    signUp({
      firstname, lastname, username, password,
    }),
  ),
});

const SignUp = ({ createuser }) => {
  const [value, setValue] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  });
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeFname(e) {
    console.log(e.target.value);
    setFirstname(e.target.value);
    console.log(username);
  }

  function handleChangeLname(e) {
    console.log(e.target.value);
    setLastname(e.target.value);
    console.log(password);
  }

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
  SignUp.propTypes = {
    // eslint-disable-next-line react/no-deprecated
    createuser: PropTypes.func.isRequired,
  };
  return (
    <form
      className="Center"
      value={value}
      onChange={(nextValue) => setValue(nextValue)}
      onSubmit={(e) => {
        e.preventDefault();
        createuser(firstname, lastname, username, password);
      }}
    >
      <div className="form-inner">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="fname">First Name:</label>
          <input type="text" name="fname" id="fname" onChange={handleChangeFname} />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name:</label>
          <input type="text" name="lname" id="lname" onChange={handleChangeLname} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Username:</label>
          <input type="email" name="email" id="email" onChange={handleChangeEmail} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" onChange={handleChangePass} />
        </div>
        <input type="submit" value="SIGN UP" />
      </div>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
