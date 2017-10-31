import React, { Component } from 'react';
import { View, Text, Image,  TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard, ActivityIndicator  } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import {showAlert, validateEmail} from 'FinanceBakerZ/src/customLibrary';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

import Meteor from 'react-native-meteor';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            loading: false
        };
    }
    onChange(stateName, val){
        this.setState({[stateName]: val});
    }
    onSubmit(){
        let user;
        const {email, password} = this.state;
        this.setState({loading: true});
        if(email.length && password.length){
            if(validateEmail(email)) {
                user = {email: email};
                Meteor.loginWithPassword(user, password, (err) => {
                    if(err){
                        showAlert('Error', err.reason);
                        this.setState({loading: false});
                    }else{
                        this.setState({loading: false});
                        var useraccount = {account: {owner: Meteor.user()._id}};
                        Meteor.call('profileAssets', useraccount, function (err, result) {
                        });
                    }
                });
            }
            else {
                showAlert('Invalid format', 'Invalid email format.');
                this.setState({loading: false});
            }

        }else {
            showAlert('Warning', 'All fields are required.');
            this.setState({loading: false});
        }

    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={LoginStyles.backgroundImage} >
                    <View style={LoginStyles.logoContainer} >
                        <Image source={require('FinanceBakerZ/src/images/logo-final.png')} resizeMode='stretch' style={LoginStyles.logo} />
                    </View>
                    <View style={LoginStyles.formContainer}>
                        <KeyboardAvoidingView>
                            <View style={LoginStyles.borderBottom}>
                                <Icon size={18}  name="email" style={LoginStyles.inputIcon}/>
                                <TextInput
                                    placeholder='Email'
                                    style={[LoginStyles.input]}
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    onSubmitEditing={() => {(this.state.password.length ?  this.onSubmit.bind(this)() : this.pass.focus() )}}
                                    maxLength = {30}
                                    value={this.state.email}
                                    autoCorrect={false}
                                    onChangeText={this.onChange.bind(this, 'email')}
                                    ref={(ref) => this.username = ref}
                                    underlineColorAndroid="transparent"
                                    />
                            </View>
                            <View style={LoginStyles.borderBottom}>
                                <Icon size={18} name="password"  style={LoginStyles.inputIcon}/>
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
                                    onSubmitEditing={() => {(this.state.email.length ? this.onSubmit.bind(this)() : this.username.focus() )}}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    <View style={LoginStyles.textRightContainer}>
                        <TouchableOpacity
                            disabled={this.state.loading}
                            onPress={() => navigate('ForgotPassword')}>
                            <Text style={LoginStyles.textRight} >Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={LoginStyles.btnContainer}>
                        <Button
                            title="Sign In"
                            style={LoginStyles.btn}
                            onPress={this.onSubmit.bind(this)}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                            />
                    </View>
                    <View style={LoginStyles.bottomTextContainer}>
                        <Text style={LoginStyles.bottomText}>
                            Don't have an account?
                        </Text>
                        <TouchableOpacity
                            disabled={this.state.loading}
                            onPress={() => navigate('Register')}>
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