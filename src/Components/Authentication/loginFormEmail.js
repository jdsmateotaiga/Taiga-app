import React, { Component } from 'react';

import { connect } from 'react-redux';
import { modalOpenAction } from '../../Reducers/actions/modalAction';
import { loginAction, removeAlertsOnChange, loginSocialAction }  from '../../Reducers/actions/authAction';

import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';

class AuthForm extends Component {

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

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <React.Fragment>
                <Form onSubmit={this.handleSubmit} className="login-form" id="LoginComponent">
                    <Form.Item>
                        {getFieldDecorator('email', {
                        rules: [
                            {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                            },
                            {
                            required: true,
                            message: 'Please input your E-mail!',
                            },
                        ],
                        })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-Mail"
                            onChange={this.onChange}
                            autoComplete="on"
                        />
                        )}
                    </Form.Item>
                    <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Password"
                            type="password"
                            autoComplete="off"
                            onChange={this.onChange}
                        />,
                    )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="#forgot-password" onClick={(e) => { this.handleClick(e, 'forgot-password', 'Forgot Password') }} >
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <a href="#signup" onClick={(e) => { this.handleClick(e, 'signup', 'Register') }}>Register now!</a>
                        { this.props.error ? <Alert message={this.props.error} type="error" /> : '' }
                    </Form.Item>
                </Form>
                <p><a href="#login-facebook" onClick={(e) => {this.handleSocialLogin(e, 'facebook')}}>Login Facebook</a></p>
                <p><a href="#login-google" onClick={(e) => {this.handleSocialLogin(e, 'google')}}>Login Google</a></p>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.authReducer.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (credentials) => { dispatch(loginAction(credentials)) },
        removeAlert: () => { dispatch(removeAlertsOnChange()) },
        modalOpen: (mode, title) => { dispatch(modalOpenAction(mode, title)) },
        loginSocial: (mode) => { dispatch(loginSocialAction(mode)) }
    }
}

const LoginFormEmail = Form.create({ name: 'login' })(AuthForm);

export default connect(mapStateToProps,mapDispatchToProps)(LoginFormEmail);
