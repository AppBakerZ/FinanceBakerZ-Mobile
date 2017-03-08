import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';

import Header from 'FinanceBakerZ/src/components/header/Header';
import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';
import Meteor from 'react-native-meteor';

    Meteor.connect('ws://development-financebakerz.herokuapp.com/websocket');

const {
    CardStack: NavigationCardStack,
    StateUtils: NavigationStateUtils,
    } = NavigationExperimental;

export default class Routes extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            navState: this.reducer()
        }
    }

    reducer(state, action, route) {
        if (!state) {
            return {
                index: 0,
                routes: [{ key: 'Login', hideHeader: true }]
            };
        }
        switch (action) {
            case 'push': {
                return NavigationStateUtils.push(state, route);
            }
            case 'pop': {
                return NavigationStateUtils.pop(state);
            }
            default:
                return state
        }
    }
    _navigate (action, route) {
        const navState = this.reducer(this.state.navState, action, route);
        this.setState({
            navState
        })
    }
    _renderScene (props) {
        switch(props.scene.route.key) {
            case 'Login':
                return <LoginScreen navigate={this._navigate.bind(this)} />;
            case 'Register':
                return <RegisterScreen navigate={this._navigate.bind(this)} />
          case 'Forget Password':
            return <ForgotPasswordScreen navigate={this._navigate.bind(this)} />
        }
    }
    _renderHeader (sceneProps) {
        return (
            <Header
                navigate={this._navigate.bind(this)}
                {...sceneProps}
                />
        )
    }
    render() {
        const { navState } = this.state;
        return (
            <NavigationCardStack
                renderHeader={this._renderHeader.bind(this)}
                navigationState={navState}
                renderScene={this._renderScene.bind(this)}
                />
        )
    }
}