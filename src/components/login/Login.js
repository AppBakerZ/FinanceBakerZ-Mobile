import React, { Component } from 'react';
import { Alert, View, Text, Image,  TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator  } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

import Meteor, { createContainer } from 'react-native-meteor';
export default class Login extends Component {


  constructor(props) {
    super(props);

    this.state = {
      usernameOrEmail: '',
      password: '',
      loading: false,
    }
  }

  showAlert(title, message){
    Alert.alert(
      title,
      message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ],
      {
        cancelable: false,
      }
    )
  }

  onChange(stateName, val){
       this.setState({[stateName]: val});
  }

  onSubmit(){
    const {usernameOrEmail, password} = this.state;

    if(usernameOrEmail.length && password.length){
      let user;
      if (typeof usernameOrEmail === 'string')
        if (usernameOrEmail.indexOf('@') === -1)
          user = {username: usernameOrEmail};
        else
          user = {email: usernameOrEmail};


      Meteor.loginWithPassword(user, password, (err) => {
        if(err){
          console.log('err1:', err);
        }else{
          var useraccount = {account: {owner: Meteor.user()._id}};
          Meteor.call('profileAssets', useraccount, function (err, result) {
              console.log('err:', err);
              console.log('result:', result);
          });
          setTimeout(() => {
            // this.props.history.push('/app/dashboard');
          }, 1000);
        }
      });


    }else {
      this.showAlert('Warning', 'All fields are required.');
    }

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
                    <View >
                      <Icon size={15} name="Person" style={LoginStyles.inputIcon} ></Icon>
                      <TextInput
                      placeholder='Username'
                      style={[LoginStyles.input]}
                      returnKeyType="next"
                      onSubmitEditing={() => {this.pass.focus()}}
                      maxLength = {30}
                      value={this.state.usernameOrEmail}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'usernameOrEmail')}
                      />
                    </View>
                    <View>
                      <Icon size={15} name="Password"  style={LoginStyles.inputIcon} ></Icon>
                      <TextInput
                        placeholder='Password'
                        style={LoginStyles.input}
                        returnKeyType="next"
                        ref={(ref) => this.pass = ref}
                        value={this.state.password}
                        secureTextEntry={true}
                        maxLength = {20}
                        autoCorrect={false}
                        onChangeText={this.onChange.bind(this, 'password')}
                        onSubmitEditing={() => this.onSubmit.bind(this)()}
                      />
                    </View>
                      <View style={LoginStyles.textRightContainer}>
                      <TouchableOpacity>
                      <Text style={LoginStyles.textRight} >Forgot Password</Text>
                      </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </KeyboardAvoidingView>
                  <Button
                      title="Sign In"
                      style={LoginStyles.btn}
                      onPress={this.onSubmit.bind(this)}
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
