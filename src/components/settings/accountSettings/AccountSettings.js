import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Picker, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import { AccountSettingsStyle } from 'FinanceBakerZ/src/components/settings/accountSettings/AccountSettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {showAlert} from 'FinanceBakerZ/src/customLibrary';
import currencyIcon from 'FinanceBakerZ/src/currencyIcon';
import { MKRadioButton } from 'react-native-material-kit';
import _ from 'underscore';
import Modal from 'react-native-modalbox';

import Meteor, { createContainer } from 'react-native-meteor';

let lanOrCurr;

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        let userInfo = Meteor.user();
        this.radioGroup = new MKRadioButton.Group();
        this.state = {
            userCurrency: userInfo.profile.currency ? userInfo.profile.currency.value : '',
            currencyObj: userInfo.profile.currency.label,
            languageSelected: userInfo.profile.language || '',
            check2: userInfo.profile.emailNotification,
            loading: false
        };

        this.languages = [
            { value: 'en', label: 'English' },
            { value: 'ar', label: 'Arabic'},
            { value: 'ch', label: 'Chinese'},
            { value: 'fr', label: 'French'},
            { value: 'hi', label: 'Hindi'},
            { value: 'sp', label: 'Spanish'}
        ];
    }

    languageOrCurrency(seletedItem, name, iosModal){
        lanOrCurr = seletedItem.map((lanOrCurr, i) => {
            return <Picker.Item label = {lanOrCurr.label} value = {lanOrCurr.value} key = {i}/>;
        });
        if(iosModal){
            return (
                <Picker
                    selectedValue={name == 'userCurrency'? this.state.userCurrency : this.state.languageSelected}
                    onValueChange={this.onChange.bind(this, name)}
                    mode='dropdown'>
                    {lanOrCurr}
                </Picker>
            )
        } else {
            if (Platform.OS === 'ios') {
                return (
                    <TouchableOpacity onPress={()=> this.refs.modal.open()}><Text>Dropdown</Text></TouchableOpacity>
                )
            } else {
                return (
                    <Picker
                        selectedValue={name == 'userCurrency'? this.state.userCurrency : this.state.languageSelected}
                        onValueChange={this.onChange.bind(this, name)}
                        mode='dropdown'>
                        {lanOrCurr}
                    </Picker>
                )
            }
        }
    }

    setCurrency(currency){
        return currencyItem = _.findWhere(currencyIcon, {value: currency});
    }

    emailNotify(){
        const {check2} = this.state;
        let useraccount = {account: {check2, owner: Meteor.user()._id}};
        Meteor.call('emailNotificaton', useraccount, (err) => {
            if(err){
                console.log(err);
            }
        });
    }

    update() {
        currencyObj = this.setCurrency(this.state.userCurrency);
        const {languageSelected} = this.state;
        let accountinfo = {settings: {currencyObj, languageSelected}};
        this.setState({loading: true});
        Meteor.call('updateAccountSettings', accountinfo, (err) => {
            if(!err){
                this.emailNotify();
                showAlert('Success', 'Account updated successfully');
                this.setState({loading: false});
                this.props.navigation.goBack();
            }
            else{
                showAlert('Error', err.reason);
                this.setState({loading: false});
            }
        });
    }

    onChange (state, name) {
        this.setState({
            [state] : name
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        let userInfo = Meteor.user();
        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style = {AccountSettingsStyle.backgroundImage}>
                    <ScrollView>
                        <View style = {AccountSettingsStyle.inputContainer}>
                            <View style = {[AccountSettingsStyle.borderBottom, AccountSettingsStyle.pickerContainer]}>
                                <Text>Select your currency</Text>
                                {this.languageOrCurrency(currencyIcon, 'userCurrency')}
                            </View>

                            <View style = {[AccountSettingsStyle.borderBottom, AccountSettingsStyle.pickerContainer]}>
                                <Text>Select language</Text>
                                {this.languageOrCurrency.bind(this, this.languages, 'languageSelected')()}
                            </View>

                            <View style = {AccountSettingsStyle.row}>

                                <View style = {AccountSettingsStyle.row}>
                                    <Icon size = {18} name = "notifications" style = {AccountSettingsStyle.notificationIcon}></Icon>
                                    <Text style = {AccountSettingsStyle.notificationText}>Email Notification:</Text>
                                </View>

                                <View style = {AccountSettingsStyle.notificationRadio}>
                                    <MKRadioButton
                                        checked={userInfo.profile.emailNotification}
                                        group={this.radioGroup}
                                        onPress = {() => this.setState({check2: true})}
                                    />
                                    <Text>On</Text>
                                    <MKRadioButton
                                        checked={!userInfo.profile.emailNotification}
                                        group={this.radioGroup}
                                        onPress = {() => this.setState({check2: false})}
                                    />
                                    <Text>Off</Text>
                                </View>
                            </View>

                        </View>
                    </ScrollView>

                    <View style={AccountSettingsStyle.btnContainer}>
                        <Button
                            title="Update"
                            style={AccountSettingsStyle.btn}
                            onPress={this.update.bind(this)}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                        />
                    </View>
                </Image>

                <Modal style={AccountSettingsStyle.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
                    <View style = {[AccountSettingsStyle.pickerContainer]}>
                        {this.languageOrCurrency(currencyIcon, 'userCurrency', true)}
                    </View>
                </Modal>
            </ViewContainer>
        );
    }
}

AccountSettings.propTypes = {
    user: PropTypes.object.isRequired
};

export default createContainer((props) => {
    const {params} = props.navigation.state;
    return {
        user: Meteor.user()
    };
}, AccountSettings);