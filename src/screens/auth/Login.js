import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import Login from 'FinanceBakerZ/src/components/login/Login'

export default class LoginScreen extends Component {
    render() {
        return (
            <Login {...this.props}/>
        );
    }
}