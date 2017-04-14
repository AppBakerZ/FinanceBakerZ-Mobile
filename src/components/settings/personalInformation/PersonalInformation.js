import React, { Component, PropTypes } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput} from 'react-native';
import { PersonalInformationStyle } from 'FinanceBakerZ/src/components/settings/personalInformation/PersonalInformationStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {showAlert, validateEmail} from 'FinanceBakerZ/src/customLibrary';
import  Meteor, { createContainer } from 'react-native-meteor';

class PersonalInformation extends Component {
    constructor(props) {
        super(props);
        let { user } = this.props;
        this.state = {
            username: user.username,
            name : user.profile.fullName,
            number: user.profile.contactNumber,
            email: user.emails ? user.emails[0].address : '',
            address: user.profile.address,
            avatar: user.profile.avatar,
            loading: false
        };
    }
    update() {
        const {name, number, email, address, username} = this.state;
        let info = {users: {name, number, email, address, username}};
        this.setState({loading: true});
        if(validateEmail(email)){
            Meteor.call('updateProfile', info, (err) => {
                if(!err){
                    showAlert('Success', 'Profile updated successfully');
                    this.setState({name: '', number: '', email: '', address: '', username: ''});
                    this.setState({loading: false});
                    this.props.navigation.goBack();
                } else{
                    showAlert('Error', err.reason);
                    this.setState({loading: false});
                }
            });
        } else {
            showAlert('Error', 'Email address is not valid');
            this.setState({loading: false});
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
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style = {PersonalInformationStyle.backgroundImage}>
                    <View style = {PersonalInformationStyle.inputContainer}>
                        <View style = {PersonalInformationStyle.avatarContainer}>
                            <Image source = {require('FinanceBakerZ/src/images/default-avatar.gif')} style = {PersonalInformationStyle.userAvatar}></Image>
                        </View>

                        <View style = {PersonalInformationStyle.borderBottom}>
                            <Icon size = {18} name = "person" style = {PersonalInformationStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Name'
                                style = {[PersonalInformationStyle.input]}
                                returnKeyType = "next"
                                maxLength = {25}
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'name')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.name}
                            />
                        </View>
                        <View style = {PersonalInformationStyle.borderBottom}>
                            <Icon size = {18} name = "phone-iphone" style = {PersonalInformationStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Contact Number'
                                style = {[PersonalInformationStyle.input]}
                                returnKeyType = "next"
                                maxLength = {50}
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'number')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.number}
                            />
                        </View>

                        <View style={PersonalInformationStyle.borderBottom}>
                            <Icon size={18} name="email" style={PersonalInformationStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder='Email'
                                style={[PersonalInformationStyle.input]}
                                returnKeyType="next"
                                autoCorrect={false}
                                onChangeText={this.onChange.bind(this, 'email')}
                                underlineColorAndroid="transparent"
                                value={this.state.email}
                            />
                        </View>

                        <View style={PersonalInformationStyle.borderBottom}>
                            <Icon size={18} name="person" style={PersonalInformationStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder='User Name'
                                style={[PersonalInformationStyle.input]}
                                returnKeyType="next"
                                autoCorrect={false}
                                onChangeText={this.onChange.bind(this, 'username')}
                                underlineColorAndroid="transparent"
                                value={this.state.username}
                            />
                        </View>

                        <View style = {PersonalInformationStyle.borderBottom}>
                            <Icon size = {18} name = "location-on" style = {PersonalInformationStyle.inputIcon}></Icon>
                            <TextInput
                                placeholder = 'Address'
                                style = {[PersonalInformationStyle.input]}
                                returnKeyType = "next"
                                autoCorrect = {false}
                                onChangeText = {this.onChange.bind(this, 'address')}
                                underlineColorAndroid = "transparent"
                                value = {this.state.address}
                            />
                        </View>
                    </View>

                    <View style={PersonalInformationStyle.btnContainer}>
                        <Button
                            title="Update"
                            style={PersonalInformationStyle.btn}
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

PersonalInformation.propTypes = {
    user: PropTypes.object.isRequired
};

export default createContainer((props) => {
    const {params} = props.navigation.state;
    return {
        user: Meteor.user()
    };
}, PersonalInformation);