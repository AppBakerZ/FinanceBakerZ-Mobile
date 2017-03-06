import React, { Component } from 'react';
import {  View, Text, Image,  TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard  } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

export default class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      loading: false
    }
  }


  onChange(){
  }

  render() {
        return (
              <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={LoginStyles.backgroundImage} >
                  <View style={LoginStyles.logoContainer} >
                      <Image source={require('FinanceBakerZ/src/images/logo-final.png')} style={LoginStyles.logo} />
                    </View>
                  <KeyboardAvoidingView>
                  <ScrollView style={LoginStyles.formContainer}>
                      <TextInput
                      placeholder='Username'
                      style={LoginStyles.input}
                      placeholderStyle={LoginStyles.input}
                      returnKeyType="next"
                      onSubmitEditing={() => {this.pass.focus()}}
                      maxLength = {30}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'username')}
                      />
                      <TextInput
                        placeholder='Password'
                        style={LoginStyles.input}
                        placeholderStyle={LoginStyles.input}
                        returnKeyType="next"
                        ref={(ref) => this.pass = ref}
                        secureTextEntry
                        maxLength = {20}
                        autoCorrect={false}
                        onChange={this.onChange.bind(this)}
                      />
                      <View style={LoginStyles.textRightContainer}>
                      <TouchableOpacity>
                      <Text style={LoginStyles.textRight}>Forgot Password</Text>
                      </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </KeyboardAvoidingView>
                  <Button
                      title="Sign In"
                      style={LoginStyles.btn}
                    />
                    <View style={LoginStyles.bottomTextContainer}>
                      <Text style={LoginStyles.bottomText}>
                        Don't have an account?
                      </Text>
                      <TouchableOpacity onPress={this.props.navigate.bind(null, 'push', {key: 'Register'})}>
                        <Text
                          style={LoginStyles.textBold}
                        > Sign Up
                        </Text>
                      </TouchableOpacity>
                    </View>
                   </Image>
              </ViewContainer>

        );
    }
}
