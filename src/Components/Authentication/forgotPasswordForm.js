import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Alert } from 'antd';
import { sendPasswordResetEmailAction } from '../../Reducers/actions/authAction';

class ForgotPasswordAuth extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submitForm(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <Form onSubmit={this.handleSubmit} className="login-form" id="RegisterComponent">
            <Form.Item>
                <div id="recaptcha-container"></div>
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

                <Button type="primary" htmlType="submit" className="password-reset-form-button">
                    Reset Password
                </Button>
            </Form.Item>
            { this.props.success ?
                <Alert message={this.props.success} type="success" /> :
              this.props.error ?
                <Alert message={this.props.error} type="error" /> : ''
            }
        </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.authReducer.authSuccess,
        error: state.authReducer.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitForm: (credentials) => { dispatch(sendPasswordResetEmailAction(credentials)) },
    }
}

const ForgotPasswordForm = Form.create({ name: 'forgot_password' })(ForgotPasswordAuth);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
