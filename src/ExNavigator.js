import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';

import LoginScreen from 'FinanceBakerZ/src/screens/auth/Login';
import RegisterScreen from 'FinanceBakerZ/src/screens/auth/Register';
import ForgotPasswordScreen from 'FinanceBakerZ/src/screens/auth/ForgotPassword';

const {
    CardStack: NavigationCardStack,
    StateUtils: NavigationStateUtils,

    } = NavigationExperimental;

export default class ExNavigator extends Component {

    // This sets up the methods (e.g. Pop, Push) for navigation.
    constructor(props, context) {
        super(props, context);

        this._onPopRoute = this.props.onNavigationChange.bind(null, {type: 'pop', key: 'login'});

    }

    // Now we finally get to use the `NavigationCardStack` to render the scenes.
    render() {
        return (
            <NavigationCardStack
                onNavigateBack={this._onPopRoute}
                navigationState={this.props.navigationState}
                renderScene={this._renderScene.bind(this)}
                />
        );
    }

    // Render a scene for route.
    // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
    // as type `NavigationSceneRendererProps`.
    // Here you could choose to render a different component for each route, but
    // we'll keep it simple.
    _renderScene(sceneProps) {
        let scene = '';

        switch (sceneProps.scene.key) {
            case 'scene_login':
                scene = <LoginScreen
                    onPushRoute={this.props.onNavigationChange}
                    onPopRoute={this._onPopRoute}
                    />;
                break;
            case 'scene_register':
                scene = <RegisterScreen
                    onPushRoute={this.props.onNavigationChange}
                    onPopRoute={this._onPopRoute}
                    />;
                break;
            case 'scene_forgotPassword':
                scene = <ForgotPasswordScreen
                    onPushRoute={this.props.onNavigationChange}
                    onPopRoute={this._onPopRoute}
                    />;
                break;
        }
        return scene
    }
}