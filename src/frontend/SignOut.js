/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from './Redux/actions/action-creators';
// import { render } from '@testing-library/react';

function mapStateToProps(state) {
  return {
    Authenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = (dispatch) => ({
  userSignOut(history) {
    dispatch(signOut(history));
  },
});

function SignOut({ userSignOut }) {
  console.log('in signout');
  const history = useHistory();
  userSignOut(history);
  SignOut.propTypes = {
    // eslint-disable-next-line react/no-deprecated
    userSignOut: PropTypes.func.isRequired,
  };
  return (
      <div>
              <h2>You Have been signed out.. hopefully</h2>
      </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SignOut);
