import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle'

export default class Login extends Component {
    render() {
        return (
            <View style={LoginStyles.container}>
                <Text>
                    Route: Login
                </Text>
                <TouchableHighlight
                    onPress={this.props.onPushRoute.bind(null, {type: 'push', key: 'register'})}>
                    <Text>
                        Register
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

