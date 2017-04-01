import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { SettingsStyles } from 'FinanceBakerZ/src/components/settings/SettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import { MKRadioButton } from 'react-native-material-kit';

import Meteor, { createContainer } from 'react-native-meteor';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.radioGroup = new MKRadioButton.Group();
        this.state = {};
    }

    editSetting() {
        console.warn('Button Pressed');
    }

    render() {
        const { navigate } = this.props.navigation;
        let { user } = this.props;
        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={SettingsStyles.backgroundImage}>
                    <View style = {[SettingsStyles.contentContainer, SettingsStyles.borderBottom]}>
                        <Text style = {SettingsStyles.headingText}>Personal Information</Text>
                        <Text style = {SettingsStyles.contentText}>User Name: {user.profile.fullName}</Text>
                        <Text style = {SettingsStyles.contentText}>Contact Number: {user.profile.contactNumber ? user.profile.contactNumber : 'Not Available'}</Text>
                        <Text style = {SettingsStyles.contentText}>Email: {(user.emails ? user.emails.map(email => email.address + ' ') : 'Not Available')}</Text>
                        <Text style = {SettingsStyles.contentText}>Address: {user.profile.address ? user.profile.address : 'Not Available'}</Text>
                    </View>

                    <View style = {[SettingsStyles.contentContainer, SettingsStyles.borderBottom]}>
                        <Text style = {SettingsStyles.headingText}>Accout Settings</Text>
                        <Text style = {SettingsStyles.contentText}>Currency: {user.profile.currency.label ? user.profile.currency.label : 'Not Available'}</Text>
                        <Text style = {SettingsStyles.contentText}>Language: {user.profile.language ? user.profile.language : 'Not Available'}</Text>
                        <View style = {SettingsStyles.row}>
                            <Text style = {SettingsStyles.contentText}>Email Notification:</Text>

                            <View style = {SettingsStyles.notificationRadio}>
                                <MKRadioButton
                                    checked={user.profile.emailNotification}
                                    group={this.radioGroup}
                                    disabled
                                />
                                <Text>On</Text>
                                <MKRadioButton
                                    checked={!user.profile.emailNotification}
                                    group={this.radioGroup}
                                    disabled
                                />
                                <Text>Off</Text>
                            </View>
                        </View>
                    </View>

                    <View style = {SettingsStyles.contentContainer}>
                        <Text style = {SettingsStyles.headingText}>Security Settings</Text>
                        <TouchableOpacity
                            onPress = {() => navigate('ChangePassword')}>
                            <Text style = {SettingsStyles.contentText}>Password: **********</Text>
                        </TouchableOpacity>
                    </View>
                </Image>

                <FabButton
                    onPress = {this.editSetting.bind(this)}
                    iconName="pencil-square-o"
                    iconColor="white"
                />
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