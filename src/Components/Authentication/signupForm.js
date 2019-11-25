import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginSocialAction } from '../../Reducers/actions/authAction';
import { modalOpenAction } from '../../Reducers/actions/modalAction';

class SignupForm extends Component {

  handleClick = (e, mode, title) => {
    e.preventDefault();
    this.props.modalOpen(mode, title);
  }

  handleSocialLogin = (e, mode) => {
    e.preventDefault();
    this.props.loginSocial(mode)
  }

  render() {
    return (
      <React.Fragment>
        <p><a href="#signup-email" onClick={(e) => { this.handleClick(e, 'signup-email', 'Register via Email') }}>Register Email</a></p>
        <p><a href="#signup-phone" onClick={(e) => { this.handleClick(e, 'signup-phone', 'Register via Phone') }}>Register Phone</a></p>
        <p><a href="#login-facebook" onClick={(e) => {this.handleSocialLogin(e, 'facebook') }}>Register with Facebook</a></p>
        <p><a href="#login-google" onClick={(e) => {this.handleSocialLogin(e, 'google') }}>Register with Google</a></p>
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        success : state.authReducer.authSuccess,
        error   : state.authReducer.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginSocial : (mode)        => { dispatch(loginSocialAction(mode)) },
        modalOpen   : (mode, title) => { dispatch(modalOpenAction(mode, title)) }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
