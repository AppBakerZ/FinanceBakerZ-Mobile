import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { SettingsStyles } from 'FinanceBakerZ/src/components/settings/SettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import { MKRadioButton } from 'react-native-material-kit';
import { capitalizeFirstLetter } from 'FinanceBakerZ/src/customLibrary';

import Meteor, { createContainer } from 'react-native-meteor';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.radioGroup = new MKRadioButton.Group();
        this.state = {};
    }

    render() {
        const { navigate } = this.props.navigation;
        let { user } = this.props;
        let userAvatar = user.profile.avatar ? {uri: user.profile.avatar} : require('FinanceBakerZ/src/images/default-avatar.gif');
        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={SettingsStyles.backgroundImage}>
                    <ScrollView>
                        <View>
                            <TouchableOpacity
                                style = {[SettingsStyles.contentContainer, SettingsStyles.borderBottom]}
                                onPress = {() => navigate('PersonalInformation')}>
                                <Text style = {SettingsStyles.headingText}>Personal Information</Text>
                                <View style = {[SettingsStyles.row, SettingsStyles.notificationRadio]}>
                                    <Image source={userAvatar} style = {SettingsStyles.userAvatar}></Image>
                                    <Text style = {SettingsStyles.contentText}>Change Image | Remove</Text>
                                </View>
                                <Text style = {SettingsStyles.contentText}>User Name: {user.profile.fullName}</Text>
                                <Text style = {SettingsStyles.contentText}>Contact Number: {user.profile.contactNumber ? user.profile.contactNumber : 'Not Available'}</Text>
                                <Text style = {SettingsStyles.contentText}>Email: {user.emails ? user.emails[0].address : 'Not Available'}</Text>
                                <Text style = {SettingsStyles.contentText}>User Name: {user.username ? user.username : 'Not Available'}</Text>
                                <Text style = {SettingsStyles.contentText}>Address: {user.profile.address ? user.profile.address : 'Not Available'}</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style = {[SettingsStyles.contentContainer, SettingsStyles.borderBottom]}
                                onPress = {() => navigate('AccountSettings')}>
                                <Text style = {SettingsStyles.headingText}>Accout Settings</Text>
                                <Text style = {SettingsStyles.contentText}>Currency: {user.profile.currency.label ? user.profile.currency.label : 'Not Available'}</Text>
                                <Text style = {SettingsStyles.contentText}>Language: {user.profile.language ? capitalizeFirstLetter(user.profile.language) : 'Not Available'}</Text>
                                <View style = {SettingsStyles.row}>
                                    <Text style = {SettingsStyles.contentText}>Email Notification:</Text>

                                    <View style = {SettingsStyles.notificationRadio}>
                                        <MKRadioButton
                                            checked={user.profile.emailNotification}
                                            group={this.radioGroup}
                                            disabled
                                            style={SettingsStyles.radioButton}
                                        />
                                        <Text>On</Text>
                                        <MKRadioButton
                                            checked={!user.profile.emailNotification}
                                            group={this.radioGroup}
                                            disabled
                                            style={SettingsStyles.radioButton}
                                        />
                                        <Text>Off</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity
                                style = {SettingsStyles.contentContainer}
                                onPress = {() => navigate('ChangePassword')}>
                                <Text style = {SettingsStyles.headingText}>Change Password</Text>
                                <Text style = {SettingsStyles.contentText}>Password: **********</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Image>
            </ViewContainer>
        );
    }
}

Settings.propTypes = {
    user: PropTypes.object.isRequired
};

export default createContainer((props) => {
    const {params} = props.navigation.state;
    return {
        user: Meteor.user()
    };
}, Settings);