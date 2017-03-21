import React, { Component } from 'react';
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { RegisterStyles } from 'FinanceBakerZ/src/components/register/RegisterStyle'
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import {validateEmail, showAlert} from 'FinanceBakerZ/src/customLibrary';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

import  {Accounts} from 'react-native-meteor';


export default class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      usernameOrEmail: '',
      password: '',
      loading: false
    }
  }

  onChange(stateName, val){
    this.setState({[stateName]: val});
  }

  onSubmit(){
    this.setState({loading: true});
    const {fullName, usernameOrEmail, password} = this.state;
    if(fullName, usernameOrEmail, password){
      if(validateEmail(usernameOrEmail)){
        let selector;
        selector = {email: usernameOrEmail};
        const key = Object.keys(selector)[0];
        let currency = {symbol: "$", name: "Dollar", symbol_native: "$", decimal_digits: 2, rounding: 0},
          emailNotification = true;
        Accounts.createUser({
          [key]: selector[key],
          password,
          profile: {fullName, currency, emailNotification }
        }, (err) => {
          if(err){
            this.setState({loading: false});
            showAlert('Error', err.reason);
          }else{
            this.setState({loading: false});
            showAlert('Congratulation', 'You have registered at ' + selector.email);
          }
        });
      }else {
        showAlert('Invalid format', 'Invalid email format.');
        this.setState({loading: false});
      }
    }else{
      showAlert('Warning', 'All fields are required.');
      this.setState({loading: false});
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <ViewContainer>
        <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={RegisterStyles.backgroundImage} >
          <View style={RegisterStyles.formContainer}>
            <KeyboardAvoidingView>
              <ScrollView>
                <View style={RegisterStyles.borderBottom}>
                  <Icon size={18} name="Person" style={RegisterStyles.inputIcon} ></Icon>
                  <TextInput
                    placeholder='Full Name'
                    style={RegisterStyles.input}
                    autoCorrect={false}
                    onSubmitEditing={() => this.usernameOrEmail.focus()}
                    maxLength={ 30 }
                    onChangeText={this.onChange.bind(this, 'fullName')}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={RegisterStyles.borderBottom}>
                  <Icon size={18} name="Email" style={RegisterStyles.inputIcon} ></Icon>
                  <TextInput
                    placeholder='Email'
                    keyboardType="email-address"
                    style={RegisterStyles.input}
                    placeholderStyle={RegisterStyles.input}
                    autoCorrect={false}
                    onSubmitEditing={() => this.password.focus()}
                    maxLength={ 30 }
                    onChangeText={this.onChange.bind(this, 'usernameOrEmail')}
                    ref={(ref) => {this.usernameOrEmail = ref}}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={RegisterStyles.borderBottom}>
                  <Icon size={18} name="Password" style={RegisterStyles.inputIcon} ></Icon>
                  <TextInput
                    placeholder='Password'
                    secureTextEntry
                    autoCorrect={false}
                    style={RegisterStyles.input}
                    placeholderStyle={RegisterStyles.input}
                    ref={(ref) => {this.password = ref}}
                    maxLength={ 20 }
                    onChangeText={this.onChange.bind(this, 'password')}
                  />
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          </View>
          <View style={RegisterStyles.btnContainer}>
            <Button
              title="Sign Up"
              style={RegisterStyles.btn}
              onPress={this.onSubmit.bind(this)}
              loading={this.state.loading}
              disabled={this.state.loading}
            />
          </View>
          <View style={RegisterStyles.bottomTextContainer}>
            <Text style={RegisterStyles.bottomText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              disabled={this.state.loading}
              onPress={() => navigate('Login')}>
              <Text
                style={RegisterStyles.textBold}
              > Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Image>
      </ViewContainer>


    );
  }
}

