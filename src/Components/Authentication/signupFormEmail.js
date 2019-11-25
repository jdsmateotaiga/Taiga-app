import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupAction, removeAlertsOnChange } from '../../Reducers/actions/authAction';

import firebase from 'firebase/app';
import 'firebase/auth';

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Select,
    Button,
    Alert
} from 'antd';

  const { Option } = Select;


  class RegistrationForm extends Component {
    state = {
      confirmDirty: false,
      recaptcha: null
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let details = {
            ...values,
            recaptcha: this.state.recaptcha
          }
          this.props.submitForm(details);
        }
      });
    };

    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };

    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };

    onChange = () => {
        this.props.removeAlert();
    }

    componentDidMount() {
        firebase.auth().languageCode = 'en';
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible'
        });
        window.recaptchaVerifier.render();
        this.setState({ recaptcha: window.recaptchaVerifier });
    }


    render() {
      const { getFieldDecorator } = this.props.form;


      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '+63',
      })(
        <Select style={{ width: 70 }}>
          <Option value="+63">+63</Option>
          <Option value="+87">+87</Option>
        </Select>,
      );

      return (
        <React.Fragment>

          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <div id="recaptcha-container"></div>
            <Form.Item
              label={
                <span>
                  Fullname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('fullname', {
                rules: [{ required: true, message: 'Please input your fullname!', whitespace: true }],
              })(<Input
                onChange={this.onChange}
                />)}
            </Form.Item>
            <Form.Item label="E-mail">
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
              })(<Input
                onChange={this.onChange}
                />)}
            </Form.Item>
            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password
                onChange={this.onChange}
                />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password
                onBlur={this.handleConfirmBlur}
                onChange={this.onChange}
                 />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
            { this.props.success ?
                <Alert message={this.props.success} type="success" /> :
              this.props.error ?
                <Alert message={this.props.error} type="error" /> : ''
            }
          </Form>
        </React.Fragment>
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
        submitForm: (userdetails) => { dispatch(signupAction(userdetails)) },
        removeAlert: () => { dispatch(removeAlertsOnChange()) }
    }
}

const SignupFormEmail = Form.create({ name: 'register' })(RegistrationForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormEmail);