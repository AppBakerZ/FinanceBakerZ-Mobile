import React, { Component } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity} from 'react-native';
import { ChangePasswordStyle } from 'FinanceBakerZ/src/components/settings/changePassword/ChangePasswordStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {showAlert} from 'FinanceBakerZ/src/customLibrary';
import  {Accounts} from 'react-native-meteor';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            alterPassword: '',
            loading: false
        };
    }

    update() {
        const {oldPassword, newPassword, alterPassword} = this.state;
        this.setState({loading: true});
        if ( alterPassword !== newPassword){
            showAlert('Error', 'Password do not match');
            this.setState({loading: false});
        } else {
            Accounts.changePassword(oldPassword, newPassword, (err)=> {
                    if(!err){
                        showAlert('Success', 'Password changed successfully');
                        this.setState({oldPassword: '', newPassword: '', alterPassword: ''});
                        this.setState({loading: false});
                        this.props.navigation.goBack();
                    }
                    else{
                        showAlert('Error', err.reason);
                        this.setState({loading: false});
                    }
                }
            )
        }

    }

    onChange (name, val) {
        this.setState({
        [name] : val
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style = {ChangePasswordStyle.backgroundImage}>
                    <View style = {ChangePasswordStyle.inputContainer}>
                        <View style = {ChangePasswordStyle.borderBottom}>
                            <Icon size = {18} name = "password" style = {ChangePasswordStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Current Password'
                                style = {[ChangePasswordStyle.input]}
                                returnKeyType = "next"
                                maxLength = {30}
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'oldPassword')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.oldPassword}
                            />
                        </View>
                        <View style = {ChangePasswordStyle.borderBottom}>
                            <Icon size = {18} name = "password" style = {ChangePasswordStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Enter New Password'
                                style = {[ChangePasswordStyle.input]}
                                returnKeyType = "next"
                                maxLength = {30}
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'newPassword')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.newPassword}
                            />
                        </View>
                        <View style = {ChangePasswordStyle.borderBottom}>
                            <Icon size = {18} name = "password" style = {ChangePasswordStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Re-Enter New Password'
                                style = {[ChangePasswordStyle.input]}
                                returnKeyType = "next"
                                maxLength = {30}
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'alterPassword')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.alterPassword}
                            />
                        </View>

                    </View>

                    <View style={ChangePasswordStyle.btnContainer}>
                        <Button
                            title="Update"
                            style={ChangePasswordStyle.btn}
                            onPress={this.update.bind(this)}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                        />
                    </View>
                </Image>
            </ViewContainer>
        );
    }
}