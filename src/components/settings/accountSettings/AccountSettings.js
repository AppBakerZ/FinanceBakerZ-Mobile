import React, { Component, PropTypes } from 'react';
import { View, Text, Image, Picker, StyleSheet} from 'react-native';
import { AccountSettingsStyle } from 'FinanceBakerZ/src/components/settings/accountSettings/AccountSettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {showAlert} from 'FinanceBakerZ/src/customLibrary';
import currencyIcon from 'FinanceBakerZ/src/currencyIcon';
import { MKRadioButton } from 'react-native-material-kit';

import Meteor, { createContainer } from 'react-native-meteor';

class AccountSettings extends Component {
    constructor(props) {
        super(props);
        let userInfo = Meteor.user();
        let { user } = this.props;
        this.radioGroup = new MKRadioButton.Group();
        this.state = {
            userCurrency: userInfo.profile.currency ? userInfo.profile.currency.value : '',
            currencyObj: userInfo.profile.currency.label,
            languageSelected: user.profile.language,
            loading: false
        };
        console.warn('=====>userCurrency', this.state.userCurrency);
    }

    //setCurrency(currency){
    //    currencyItem = _.findWhere(currencyIcon, {value: currency});
    //    this.setState({currencyObj:currencyItem});
    //}

    currencies(){
        let currencyItems = currencyIcon.map((currency, i) => {
            return <Picker.Item label = {currency.label} value = {currency.value}/>;
        });
        return(
            <Picker
                selectedValue= {this.state.userCurrency}
                onValueChange={this.onChange.bind(this)}
                mode='dropdown'>
                {currencyItems}
            </Picker>
        )
    }

    update() {
        const {currencyObj, languageSelected} = this.state;
        let accountinfo = {settings: {currencyObj, languageSelected }};
        this.setState({loading: true});
        Meteor.call('updateAccountSettings', accountinfo, (err) => {
            if(!err){
                showAlert('Success', 'Account updated successfully');
                this.setState({currencyObj: '', languageSelected: ''});
                this.setState({loading: false});
                this.props.navigation.goBack();
            }
            else{
                showAlert('Error', err.reason);
                this.setState({loading: false});
            }
        });
    }

    onChange (name, val) {
        this.setState({
            userCurrency : name
        });
        console.log('=====>Name', name);
        console.log('=====>Val', val);
    }

    render() {
        const { navigate } = this.props.navigation;
        let { user } = this.props;
        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style = {AccountSettingsStyle.backgroundImage}>
                    <View style = {AccountSettingsStyle.inputContainer}>
                        <View style = {[AccountSettingsStyle.borderBottom, AccountSettingsStyle.pickerContainer]}>
                            <Text>Select your currency</Text>
                            {this.currencies.bind(this)()}
                        </View>

                        <View style = {[AccountSettingsStyle.borderBottom, AccountSettingsStyle.pickerContainer]}>
                            <Text>Select language</Text>
                            <Picker
                                selectedValue={this.state.language}
                                onValueChange={(lang) => this.setState({language: lang})}>
                                <Picker.Item label="English" value="en" />
                                <Picker.Item label="Arabic" value="ar" />
                            </Picker>
                        </View>

                        <View style = {AccountSettingsStyle.row}>

                            <View style = {AccountSettingsStyle.row}>
                                <Icon size = {18} name = "notifications" style = {AccountSettingsStyle.notificationIcon}></Icon>
                                <Text style = {AccountSettingsStyle.notificationText}>Email Notification:</Text>
                            </View>

                            <View style = {AccountSettingsStyle.notificationRadio}>
                                <MKRadioButton
                                    checked={user.profile.emailNotification}
                                    group={this.radioGroup}
                                />
                                <Text>On</Text>
                                <MKRadioButton
                                    checked={!user.profile.emailNotification}
                                    group={this.radioGroup}
                                />
                                <Text>Off</Text>
                            </View>
                        </View>

                    </View>

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