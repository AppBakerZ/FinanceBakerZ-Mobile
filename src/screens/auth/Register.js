import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Text
} from 'react-native';

export default class RegisterScreen extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'darkgreen', flex: 1}}>
                <Text>
                    Route: Register
                </Text>
                <TouchableHighlight
                    onPress={this.props.onPopRoute}>
                    <Text>
                        Login
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

