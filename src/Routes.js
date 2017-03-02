import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';

import ExNavigator from './ExNavigator.js';

const {
    CardStack: NavigationCardStack,
    StateUtils: NavigationStateUtils,

    } = NavigationExperimental;




export default class Routes extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // This defines the initial navigation state.
            navigationState: {
                index: 0, // Starts with first route focused.
                routes: [{key: 'login'}] // Starts with only one route.
            }
        };

        // We'll define this function later - hang on
        this._onNavigationChange = this._onNavigationChange.bind(this);
    }

    _onNavigationChange(route) {
        console.log('type :', route);
        // Extract the navigationState from the current state:
        let {navigationState} = this.state;

        switch (route.type) {
            case 'push':
                // Use the push reducer provided by NavigationStateUtils
                navigationState = NavigationStateUtils.push(navigationState, route);
                break;

            case 'pop':
                // Pop the current route using the pop reducer.
                navigationState = NavigationStateUtils.pop(navigationState);
                break;
        }

        // NavigationStateUtils gives you back the same `navigationState` if nothing
        // has changed. We will only update state if it has changed.
        if (this.state.navigationState !== navigationState) {
            // Always use setState() when setting a new state!
            this.setState({navigationState});
            // If you are new to ES6, the above is equivalent to:
            // this.setState({navigationState: navigationState});
        }
    }

    render() {
        return (
            <ExNavigator
                navigationState={this.state.navigationState}
                onNavigationChange={this._onNavigationChange}
                onExit={this._exit}
                />
        );
    }
}