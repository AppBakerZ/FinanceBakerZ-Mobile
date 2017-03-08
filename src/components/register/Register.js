import React, { Component } from 'react';
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';

import { RegisterStyles } from 'FinanceBakerZ/src/components/register/RegisterStyle'
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

import Meteor, {Accounts} from 'react-native-meteor';


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

  showAlert(title, message){
    Alert.alert(
      title,
      message,
      [
        {text: 'OK'},
      ],
      {
        cancelable: false,
      }
    )
  }


  onSubmit(){
    this.setState({loading: true});
    const {fullName, usernameOrEmail, password} = this.state;
    let selector;
    if (typeof usernameOrEmail === 'string')
      if (usernameOrEmail.indexOf('@') === -1)
        selector = {username: usernameOrEmail};
      else
        selector = {email: usernameOrEmail};

    const key = Object.keys(selector)[0];
    let currency = {symbol: "$", name: "Dollar", symbol_native: "$", decimal_digits: 2, rounding: 0},
      emailNotification = true;

    Accounts.createUser({
      [key]: selector[key],
      password,
      profile: {fullName, currency, emailNotification }
    }, (err) => {
      console.log('err1: ', err);
      if(err){
        this.setState({loading: false});
        this.showAlert('Error', err.reason);
      }else{
        this.setState({loading: false});
        this.showAlert('Congratulation', selector.username + ' you have registered!');
      }
    });
  }

  render() {
      return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={RegisterStyles.backgroundImage} >
                    <View style={RegisterStyles.formContainer}>
                      <KeyboardAvoidingView>
                        <ScrollView>
                      <View>
                           <Icon size={15} name="Person" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Username'
                             style={RegisterStyles.input}
                             autoCorrect={false}
                             onSubmitEditing={()=> {this.email.focus()}}
                             maxLength={ 30 }
                             onChangeText={this.onChange.bind(this, 'fullName')}

                           />
                       </View>
                       <View>
                           <Icon size={15} name="Email" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Email'
                             keyboardType="email-address"
                             style={RegisterStyles.input}
                             placeholderStyle={RegisterStyles.input}
                             autoCorrect={false}
                             ref={(ref) => {this.email = ref}}
                             onSubmitEditing={()=> {this.pass.focus();}}
                             maxLength={ 30 }
                             onChangeText={this.onChange.bind(this, 'usernameOrEmail')}

                           />
                       </View>
                       <View>
                           <Icon size={15} name="Password" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Password'
                             secureTextEntry
                             autoCorrect={false}
                             style={RegisterStyles.input}
                             placeholderStyle={RegisterStyles.input}
                             ref={(ref) => {this.pass = ref}}
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
                          <TouchableOpacity disabled={this.state.loading} onPress={this.props.navigate.bind(null, 'pop')}>
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

