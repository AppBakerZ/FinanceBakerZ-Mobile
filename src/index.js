import {Auth, Drawer} from './Routes.js';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen';

import Meteor, { createContainer } from 'react-native-meteor';

const SERVER_URL = 'ws://development-financebakerz.herokuapp.com/websocket';

class FinanceBakerZ extends Component {

  componentDidMount () {
    //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500
    })
  }

    componentWillMount() {
        Meteor.connect(SERVER_URL);
    }
    render() {
        console.log('this.props.user ', this.props.user);
        return this.props.user ? <Drawer screenProps={{...this.props}}/> : <Auth />
    }
}

const App  = createContainer(() => {
    return {
        user: Meteor.user(),
        status: Meteor.status()
    };
}, FinanceBakerZ);

AppRegistry.registerComponent('FinanceBakerZ', () => App);