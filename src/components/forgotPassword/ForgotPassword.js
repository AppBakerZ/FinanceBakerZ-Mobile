import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import {ForgotPasswordStyle}  from 'FinanceBakerZ/src/components/forgotPassword/ForgotPasswordStyle'
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import {validateEmail, showAlert} from 'FinanceBakerZ/src/customLibrary';


import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {Accounts} from 'react-native-meteor';


export default class ForgotPassword extends Component {
    constructor(){
        super();
        this.state = {
            email : '',
            loading: false
        };
    }
    onChange(val){
        this.setState({email: val})
    }
    onSubmit(){
        const {email} = this.state;
        this.setState({loading: true});
        if(email.length){
            if(validateEmail(email)){
                Accounts.forgotPassword({email}, (err) => {
                    if(!err){
                        showAlert('Success', 'Please check your inbox at ' + email);
                        this.setState({loading: false});
                    }else{
                        showAlert('Error', email + ' does not exist.');
                        this.setState({loading: false});
                    }
                });
            }else {
                showAlert('Invalid format', 'Invalid email format.');
                this.setState({loading: false});
            }
        }else{
            showAlert('Validation', 'Email is required!');
            this.setState({loading: false});
        }
    }
    render() {
        const { navigate } = this.props.navigation;
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
                                onChangeText={this.onChange.bind(this)}
                                />
                        </View>
                    </View>
                    <View style={ForgotPasswordStyle.btnContainer}>
                        <Button
                            title="Send"
                            style={ForgotPasswordStyle.btn}
                            onPress={this.onSubmit.bind(this)}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                            />
                    </View>
                    <View style={ForgotPasswordStyle.bottomTextContainer}>
                        <Text style={ForgotPasswordStyle.bottomText}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity
                            disabled={this.state.loading}
                            onPress={() => navigate('Login')}>
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

