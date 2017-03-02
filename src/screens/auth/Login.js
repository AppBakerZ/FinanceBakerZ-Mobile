import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

export default class Login extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'green', flex: 1}}>
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

