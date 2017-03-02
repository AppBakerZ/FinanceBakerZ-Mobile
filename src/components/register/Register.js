import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { RegisterStyles } from 'FinanceBakerZ/src/components/register/RegisterStyle'

export default class Register extends Component {
    render() {
        return (
            <View style={RegisterStyles.container}>
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

