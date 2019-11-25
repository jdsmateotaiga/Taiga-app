import React, { Component } from 'react';

import { connect } from 'react-redux';
import { modalOpenAction } from '../../Reducers/actions/modalAction';
import { loginAction, removeAlertsOnChange, loginSocialAction }  from '../../Reducers/actions/authAction';

import { Form } from 'antd';

class AuthFormEmail extends Component {

    handleClick = (e, mode, title) => {
        e.preventDefault();
        this.props.modalOpen(mode, title);
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitForm(values);
            }
        });
    }

    handleSocialLogin = (e, type) => {
        e.preventDefault();
        this.props.loginSocial(type)
    }

    onChange = () => {
        this.props.removeAlert();
    }

    render() {
        return (
            <React.Fragment>
                <p><a href="#login-email" onClick={(e) => { this.handleClick(e, 'login-email', 'Login via Email') }}>Login Email</a></p>
                <p><a href="#login-phone" onClick={(e) => { this.handleClick(e, 'login-phone', 'Login via Phone') }}>Register Phone</a></p>
                <p><a href="#login-facebook" onClick={(e) => { this.handleSocialLogin(e, 'facebook') }}>Login Facebook</a></p>
                <p><a href="#login-google" onClick={(e) => { this.handleSocialLogin(e, 'google') }}>Login Google</a></p>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm  : (credentials) => { dispatch(loginAction(credentials)) },
        removeAlert : ()            => { dispatch(removeAlertsOnChange()) },
        modalOpen   : (mode, title) => { dispatch(modalOpenAction(mode, title)) },
        loginSocial : (mode)        => { dispatch(loginSocialAction(mode)) }
    }
}

const LoginForm = Form.create({ name: 'login-email' })(AuthFormEmail);

export default connect(null,mapDispatchToProps)(LoginForm);
