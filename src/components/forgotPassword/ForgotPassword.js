import React, { Component } from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { ForgotPasswordStyle } from 'FinanceBakerZ/src/components/forgotPassword/ForgotPasswordStyle'

export default class ForgotPassword extends Component {
    render() {
        return (
            <View style={ForgotPasswordStyle.container}>
                <Text>
                    Route: ForgotPassword
                </Text>
            </View>
        );
    }
}

