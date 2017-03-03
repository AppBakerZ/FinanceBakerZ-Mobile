import React, { Component } from 'react';
import { View, Text, Image,  TextInput, ScrollView, TouchableOpacity  } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

export default class Login extends Component {
    render() {
        return (

              <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={LoginStyles.backgroundImage} >
                  <View style={LoginStyles.logoContainer}>
                      <Image source={require('FinanceBakerZ/src/images/logo-final.png')} style={LoginStyles.logo} />
                    </View>
                    <ScrollView style={LoginStyles.formContainer}>
                      <TextInput
                      placeholder='Username'
                      placeholderStyle={LoginStyles.input}
                      returnKeyType="next"
                      onSubmitEditing={() => {this.pass.focus()}}
                      />
                      <TextInput
                        placeholder='Password'
                        placeholderStyle={LoginStyles.input}
                        returnKeyType="next"
                        ref={(ref) => this.pass = ref}
                        secureTextEntry
                      />
                      <TouchableOpacity>
                      <Text style={LoginStyles.textRight}>Forgot Password</Text>
                      </TouchableOpacity>
                      <Button
                      title="Sign In"
                      style={LoginStyles.btn}
                      />
                      <Text style={LoginStyles.bottomText}>
                        Don't have an account?
                        <Text
                          style={LoginStyles.textBold}
                          onPress={this.props.navigate.bind(null, 'push', {key: 'Register'})}> Sign Up
                        </Text>
                      </Text>
                    </ScrollView>
                 </Image>
              </ViewContainer>
        );
    }
}
