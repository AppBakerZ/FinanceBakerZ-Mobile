import React, { Component, PropTypes } from 'react';
import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { PersonalInformationStyle } from 'FinanceBakerZ/src/components/settings/personalInformation/PersonalInformationStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {I18n,showAlert, validateEmail} from 'FinanceBakerZ/src/customLibrary';
import  Meteor, { createContainer } from 'react-native-meteor';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import Settings from 'FinanceBakerZ/settings.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
            loading: false,
            imageChanged: false
        };
    }
    update() {
        const {name, number, email, address, username, imageChanged} = this.state;
        let info = {users: {name, number, email, address, username}};
        this.setState({loading: true});
        Meteor.call('settings.updateProfile', info, (err) => {
            if(!err){
                if(imageChanged) {
                    setTimeout(()=> this.uploadImage());
                } else {
                    showAlert('Success', 'Profile updated successfully');
                    this.setState({loading: false});
                    this.props.navigation.goBack();
                }
            } else{
                showAlert('Error', err.reason);
                this.setState({loading: false});
            }
        });
    }

    onChange (name, val) {
        this.setState({
        [name] : val
        });
    }

    getImagePicker(){
        let options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                showAlert('Error', response.error);
            }
            else {
                let source = response.uri;
                this.setState({
                    avatar: source,
                    getImage: response,
                    imageChanged: true
                });
            }
        });
    }

    uploadImage(){
        let obj = this.state.getImage;
        const file = {
            uri: obj.uri,
            name: obj.fileName,
            type: obj.type
        };

        const options = {
            keyPrefix: "uploads/",
            bucket: "financebakerz",
            region: Settings.AWSRegion,
            accessKey: Settings.AWSAccessKeyId,
            secretKey: Settings.AWSSecretAccessKey,
            successActionStatus: 201
        };

        RNS3.put(file, options).then(response => {
            if (response.status !== 201){
                //throw new Error("Failed to upload image to S3");
                showAlert('Error', 'Failed to upload image to S3');
                this.setState({loading: false});
            } else {
                let update = {users: {imageUrl: response.body.postResponse.location}};
                Meteor.call('settings.updateProfileImage', update, (err) => {
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
            }
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        let userAvatar = this.state.avatar ? {uri: this.state.avatar} : require('FinanceBakerZ/src/images/default-avatar.gif');
        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style = {PersonalInformationStyle.backgroundImage}>
                    <KeyboardAwareScrollView>
                        <View style = {PersonalInformationStyle.inputContainer}>
                            <View style = {PersonalInformationStyle.avatarContainer}>
                                <TouchableOpacity onPress = {this.getImagePicker.bind(this)}>
                                    <Image source = {userAvatar} style = {PersonalInformationStyle.userAvatar}/>
                                </TouchableOpacity>
                            </View>

                            <View style = {PersonalInformationStyle.borderBottom}>
                                <Icon size = {18} name = "person" style = {PersonalInformationStyle.inputIcon}/>
                                <TextInput
                                    placeholder = {I18n("SETTINGS_NAME")}
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
                                <Icon size = {18} name = "phone-iphone" style = {PersonalInformationStyle.inputIcon}/>
                                <TextInput
                                    placeholder = {I18n("SETTINGS_CONTACT_NUMBER")}
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
                                <Icon size={18} name="email" style={PersonalInformationStyle.inputIcon}/>
                                <TextInput
                                    placeholder={I18n("SETTINGS_EMAIL")}
                                    style={[PersonalInformationStyle.input]}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    onChangeText={this.onChange.bind(this, 'email')}
                                    underlineColorAndroid="transparent"
                                    value={this.state.email}
                                />
                            </View>

                            <View style={PersonalInformationStyle.borderBottom}>
                                <Icon size={18} name="person" style={PersonalInformationStyle.inputIcon}/>
                                <TextInput
                                    placeholder={I18n("SETTINGS_USER_NAME")}
                                    style={[PersonalInformationStyle.input]}
                                    returnKeyType="next"
                                    autoCorrect={false}
                                    onChangeText={this.onChange.bind(this, 'username')}
                                    underlineColorAndroid="transparent"
                                    value={this.state.username}
                                />
                            </View>

                            <View style = {[PersonalInformationStyle.borderBottom]}>
                                <Icon size = {18} name = "location-on" style = {PersonalInformationStyle.inputIcon}/>
                                <TextInput
                                    placeholder = {I18n("SETTINGS_ADDRESS")}
                                    style = {[PersonalInformationStyle.input]}
                                    returnKeyType = "next"
                                    autoCorrect = {false}
                                    onChangeText = {this.onChange.bind(this, 'address')}
                                    underlineColorAndroid = "transparent"
                                    value = {this.state.address}
                                />
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
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