import React, { Component } from 'react';

import { connect } from 'react-redux';

import LoginForm from '../Authentication/loginForm';
import LoginFormEmail from '../Authentication/loginFormEmail';

import SignupForm from '../Authentication/signupForm';
import SignupFormEmail from '../Authentication/signupFormEmail';

import ForgotPasswordForm from '../Authentication/forgotPasswordForm';


import { modalCloseAction } from '../../Reducers/actions/modalAction';

import { Modal, Form } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends Component {

    handleForm(mode) {
      switch(mode) {
          case 'login':
            return <LoginForm></LoginForm>
          case 'login-email':
            return <LoginFormEmail></LoginFormEmail>
          case 'signup':
            return <SignupForm></SignupForm>
          case 'signup-email':
            return <SignupFormEmail></SignupFormEmail>
          case 'forgot-password':
            return <ForgotPasswordForm></ForgotPasswordForm>
          default :
            return 'Modal'
      }
    }

    render() {

      const { visible, onCancel, mode, title } = this.props;
      return (
        <Modal
          visible={visible}
          title={title}
          onCancel={onCancel}
          footer={null}
        >
          { this.handleForm(mode) }
        </Modal>
      );
    }
  },
);

class ModalUI extends Component {

  handleCancel = () => {
    this.props.modalClose();
  };

  render() {
    const { modalIsOpen, modalMode, modalTitle } = this.props.modal;
    return (
      <div>
        <CollectionCreateForm
          visible={modalIsOpen}
          mode={modalMode}
          title={modalTitle}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      modal: state.modalReducer
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
      modalClose: () => { dispatch( modalCloseAction() )
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUI);
