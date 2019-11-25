import React, { Component } from 'react';
// import Button from 'antd/es/button';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import { connect } from 'react-redux';

import ModalUI from './Components/Modal/index';
import AccountHeader from './Components/Account/accountHeader';

import { watchUserAuth } from './Reducers/actions/authAction';


class App extends Component {
    state = {  }

    componentDidMount() {
        this.props.watchUserAuth();
    }

    render() {
        return (
            <React.Fragment>
                <AccountHeader></AccountHeader>
                <ModalUI/>
            </React.Fragment>
         );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchUserAuth : () => { dispatch(watchUserAuth()) }
    }
}

export default connect(null, mapDispatchToProps)(App);
