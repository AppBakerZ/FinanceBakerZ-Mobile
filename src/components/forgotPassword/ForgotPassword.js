import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {ForgotPasswordStyle}  from 'FinanceBakerZ/src/components/forgotPassword/ForgotPasswordStyle'
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';



export default class ForgotPassword extends Component {
    render() {
        return (
          <ViewContainer>
            <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={ForgotPasswordStyle.backgroundImage} >
                <View style={ForgotPasswordStyle.container}>
                  <Text style={ForgotPasswordStyle.textEmail}>Enter your email address to get the recovery email.</Text>
                </View>
                <View style={ForgotPasswordStyle.inputContainer}>
                  <View>
                    <Icon size={15} name="Email" style={ForgotPasswordStyle.inputIcon} ></Icon>
                    <TextInput
                      placeholder='Email'
                      style={[ForgotPasswordStyle.input]}
                      returnKeyType="next"
                      maxLength = {30}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={ForgotPasswordStyle.btnContainer}>
                  <Button
                    title="Send"
                    style={ForgotPasswordStyle.btn}
                  />
                </View>
                <View style={ForgotPasswordStyle.bottomTextContainer}>
                  <Text style={ForgotPasswordStyle.bottomText}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity onPress={this.props.navigate.bind(null, 'pop')}>
                    <Text
                      style={ForgotPasswordStyle.textBold}
                    > Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
            </Image>
          </ViewContainer>
        );
    }
}

