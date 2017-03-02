import Routes from './Routes.js';
import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';

export default class FinanceBakerZ extends Component {
    render() {
        return (
            <Routes />
        );
    }
}

AppRegistry.registerComponent('FinanceBakerZ', () => Routes);
