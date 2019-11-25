import React, { Component } from 'react';
import './AccountHeader.scss';
import { connect } from 'react-redux';
import { modalOpenAction } from '../../Reducers/actions/modalAction';
import { signOutAction } from '../../Reducers/actions/authAction';


class AccountHeader extends Component {

    handleClick = (e, mode, title) => {
        e.preventDefault();
        this.props.modalOpen(mode, title);
    }

    handleLogout = (e) => {
        e.preventDefault();
        this.props.signOut();
    }

    render() {
      
        let data = (this.props.isLoading === true) ?
            <ul><li><a href="#loading">Loading</a></li></ul>
            :
            (this.props.userAuth === null) ?
                 <ul>
                   <li><a href="#login" onClick={(e) => this.handleClick(e, 'login', 'Login')}>Login</a></li>
                   <li><a href="#signup" onClick={(e) => this.handleClick(e, 'signup', 'Register')}>SignUp</a></li>
                 </ul>
            :
                <ul>
                    { this.props.userAuth !== null ? <li><a href="#profile">{ this.props.userAuth.displayName }</a></li> : '' }
                    <li><a href="#logout" onClick={(e) => this.handleLogout(e)}>Logout</a></li>
                </ul>
            ;
          ;

        return (
            <div className="account-navigation-area">
                <div className="container">
                {data}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userAuth: state.authReducer.userAuth,
        isLoading: state.authReducer.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modalOpen: (mode, title) => { dispatch(modalOpenAction(mode, title)) },
        signOut: () => { dispatch(signOutAction()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountHeader);
