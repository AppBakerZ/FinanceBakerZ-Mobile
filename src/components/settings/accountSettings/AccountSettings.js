import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Picker, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import { AccountSettingsStyle } from 'FinanceBakerZ/src/components/settings/accountSettings/AccountSettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {I18n, showAlert} from 'FinanceBakerZ/src/customLibrary';
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
        this.languages = [
            { value: 'en', label: 'English', direction: 'ltr' },
            { value: 'ur', label: 'Urdu', direction: 'rtl' }
        ];
        this.state = {
            userCurrency: userInfo.profile.currency ? userInfo.profile.currency.value : '',
            currencyObj: userInfo.profile.currency.label,
            languageName : userInfo.profile.language.label,
            languageSelected: userInfo.profile.language.value || '',
            check2: userInfo.profile.emailNotification,
            loading: false,
            language: userInfo.profile.language,
            currency: userInfo.profile.currency
        };
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
                    <TouchableOpacity
                        onPress={()=> name == 'userCurrency' ? this.refs.modalForCurrency.open() : this.refs.modalForLanguage.open()}
                        style={AccountSettingsStyle.dropdownButton}>
                        <Text style = {[AccountSettingsStyle.notificationText, AccountSettingsStyle.dropdownText]}>
                            {name == 'userCurrency'? this.state.currencyObj : this.state.languageName}
                        </Text>
                        <Icon size = {22} name = "arrow-drop-down"/>
                    </TouchableOpacity>
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

    setCurrency(currency, name){
        let currencyItem = _.findWhere(name === 'userCurrency' ? currencyIcon : this.languages, {value: currency});
        name === 'userCurrency' && this.setState({currency: currencyItem});
        name !== 'userCurrency' && this.setState({language: currencyItem});
        return currencyItem
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
        currencyObj = this.setCurrency(this.state.userCurrency, 'userCurrency');
        const {languageSelected} = this.state;
        const {language, currency} = this.state;
        let accountInfo = {settings: {currency, language}};
        this.setState({loading: true});
        Meteor.call('settings.updateAccount', accountInfo, (err) => {
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
        if(state === 'userCurrency'){
            this.setState({
                [state] : name,
                currencyObj : this.setCurrency(name, 'userCurrency').label

            });
        } else{
            this.setState({
                [state] : name,
                languageName : this.setCurrency(name).label
            });
        }
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
                                <Text>{I18n("SETTINGS_SELECT_CURRENCY")}</Text>
                                {this.languageOrCurrency(currencyIcon, 'userCurrency')}
                            </View>

                            <View style = {[AccountSettingsStyle.borderBottom, AccountSettingsStyle.pickerContainer]}>
                                <Text>{I18n("SETTINGS_SELECT_LANGUAGE")}</Text>
                                {this.languageOrCurrency(this.languages, 'languageSelected')}
                            </View>

                            <View style = {AccountSettingsStyle.row}>

                                <View style = {AccountSettingsStyle.row}>
                                    <Icon size = {18} name = "notifications" style = {AccountSettingsStyle.notificationIcon}/>
                                    <Text style = {AccountSettingsStyle.notificationText}>{I18n("SETTINGS_EMAIL_NOTIFICATION")}</Text>
                                </View>

                                <View style = {AccountSettingsStyle.notificationRadio}>
                                    <MKRadioButton
                                        checked={userInfo.profile.emailNotification}
                                        group={this.radioGroup}
                                        onPress = {() => this.setState({check2: true})}
                                        style={AccountSettingsStyle.radioButton}
                                    />
                                    <Text>On</Text>
                                    <MKRadioButton
                                        checked={!userInfo.profile.emailNotification}
                                        group={this.radioGroup}
                                        onPress = {() => this.setState({check2: false})}
                                        style={AccountSettingsStyle.radioButton}
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

                <Modal style={AccountSettingsStyle.modal} position={"bottom"} ref={"modalForCurrency"} swipeArea={20}>
                    <View style = {[AccountSettingsStyle.modalViewContainer]}>
                        {this.languageOrCurrency(currencyIcon, 'userCurrency', true)}
                    </View>
                </Modal>

                <Modal style={AccountSettingsStyle.modal} position={"bottom"} ref={"modalForLanguage"} swipeArea={20}>
                    <View style = {[AccountSettingsStyle.modalViewContainer]}>
                        {this.languageOrCurrency(this.languages, 'languageSelected', true)}
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