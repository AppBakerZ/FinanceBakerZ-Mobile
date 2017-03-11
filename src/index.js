import {Auth, Drawer} from './Routes.js';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';

const SERVER_URL = 'ws://development-financebakerz.herokuapp.com/websocket';

class FinanceBakerZ extends Component {
    componentWillMount() {
        Meteor.connect(SERVER_URL);
    }
    render() {
        console.log('this.props.user ', this.props.user);
        return this.props.user ? <Drawer /> : <Auth />
    }
}

const App  = createContainer(() => {
    return {
        user: Meteor.user(),
        status: Meteor.status()
    };
}, FinanceBakerZ);

AppRegistry.registerComponent('FinanceBakerZ', () => App);
