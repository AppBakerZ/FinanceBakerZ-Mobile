import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Picker, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import countries from 'FinanceBakerZ/src/countries';
import bankFonts from 'FinanceBakerZ/src/bankFonts';
import Modal from 'react-native-modalbox';
import {I18n, alterName, chunk, showAlert, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import _ from 'underscore';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import Meteor  from 'react-native-meteor';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';






export default class AddAccount extends Component{


  constructor(props){
    super(props);
    this.state = {
      country: 'PK',
      number: '',
      bank: '',
      loading: false,
      bankIcons: this.renderBankIcons(),
      checked: false
    };

    this.renderBankIcons = this.renderBankIcons.bind(this);

    //get all countries that have banks.
    let availableBankCountries = Object.keys(bankFonts);

    //filter country according to availableBankCountries.
    let bankCountries = countries.filter(obj => availableBankCountries.includes(obj.value));

    //sort countries in alphabetically order.
    this.countries = _.sortBy(bankCountries, 'label');
    this.countries = [{value: 'All', label: 'All Countries'}, ...this.countries];
  }

  setBanks(country){
    let bankIcons = country == 'All' ? Object.values(bankFonts).reduce((prev, curr) => [...prev, ...curr]) : bankFonts[country];
    return bankIcons.map((font, index) => {

      index++;
      //delete pre keys if attach.
      delete font.removeRightBorder;
      delete font.removeBottomBorder;
      if(index % 3 == 0){
        font.removeRightBorder = true
      }
      let lastItems = bankIcons.length % 3 == 0 ? 3 : bankIcons.length % 3;
      if(index > bankIcons.length - lastItems){
        font.removeBottomBorder = true
      }
      return font
    });
  }

  handleChange(country){
    this.setState({checked: true});
    setTimeout(() => {
      this.setState({checked: false, country, bankIcons: this.renderBankIcons(country)})
    });
  }

  getCountries(){
    let countryItems = this.countries.map((country, i) => {
      return <Picker.Item label={country.label} value={country.value} key={i}/>
    });
    return(
        <Picker
            selectedValue={this.state.country}
            onValueChange={country => this.handleChange(country)}>
          {countryItems}
        </Picker>
    );
  }

  getCountryName(){
    let {country} = this.state;
    return this.countries.find(countryName => countryName.value == country).label;
  }

  submit(){
    this.setState({loading: true});
    let {country, number, bank} = this.state;
    let {goBack} = this.props.navigation;
    bank = bank.value;
    if(country && number && bank){
      Meteor.call('accounts.insert', {
        account: { country, number, bank}
      }, (err, response) => {
        if(response){
          showAlert('Success', 'Account ' + number + ' has been added.');
          this.setState({loading: false});
          goBack();
        }else{
          console.warn(err.reason);
          this.setState({loading: false});
        }
      });
    }else{
      this.setState({loading: false});
      showAlert('Warning', 'All fields are required.')
    }
  }

  removeBorder(bankName){
    if(bankName.removeRightBorder) {
      return {borderRightColor: 'transparent', borderRightWidth: 0}
    }else if(bankName.removeBottomBorder){
      return {borderBottomColor: 'transparent', borderBottomWidth: 0}
    }
  }

  renderBankIcons(country = 'PK'){

    let bankFonts = this.setBanks(country);
    let bankIcons = chunk(bankFonts, 3);

    return bankIcons.map((bank, i) => {
      return(
          <View style={AccountsStyles.bankIconCon} key={i}>
            {bank.map((bankName, index) => {
              let icon_name = bankName.value.replace('bank-' , '');
              return(
                  <TouchableOpacity style={[AccountsStyles.bankIcon, this.removeBorder(bankName)]} onPress={() => this.setState({bank: bankName})} activeOpacity={0.75} key={index}>
                    <BankIcon name={icon_name } size={30}/>
                  </TouchableOpacity>
              );
            })}
          </View>
      );
    });
  }

  render(){
    return(
        <ViewContainer>
          <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={AccountsStyles.backgroundImage}>
            <View style={AccountsStyles.addAccCon}>
              <View style={AccountsStyles.pickerAndroidCon}>
                <View style={AccountsStyles.labelCon}>
                  <Text style={[AccountsStyles.textBold]}>{I18n("ACCOUNTS_SELECT_COUNTRY")}</Text>
                </View>
                {(Platform.OS !== 'ios') ? this.getCountries() :
                    <TouchableOpacity style={AccountsStyles.bankCardTxtAndIcon} activeOpacity={0.75} onPress={() => this.refs.modal.open()}>
                      <Text style={[AccountsStyles.text, AccountsStyles.textLeft]}>{this.getCountryName()}</Text>
                      <Icon size={10} name="down-arrow" style={AccountsStyles.iconRight} />
                    </TouchableOpacity>
                }
              </View>
              <View style={AccountsStyles.bankCardCon}>
                <View style={AccountsStyles.labelCon}>
                  <Text style={[AccountsStyles.textBold]}>{I18n("ACCOUNTS_SELECT_BANK")}</Text>
                </View>
                <View style={AccountsStyles.bankCardTxtAndIcon}>
                  <Text style={[AccountsStyles.textLeft, AccountsStyles.text]}>{this.state.bank.label}</Text>
                  <Icon size={10} name="down-arrow" style={AccountsStyles.iconRight} />
                </View>
              </View>
              {!this.state.checked ? <View style={AccountsStyles.bankIconsCon}>
                <ScrollView style={AccountsStyles.scrollViewCon}>{this.state.bankIcons}
                </ScrollView></View > :
                  <View style={AccountsStyles.loaderBank}><ActivityIndicator size="large" color="#008142" /></View>
              }
              <View style={AccountsStyles.accountNoCon}>
                <View style={AccountsStyles.labelCon}>
                  <Text style={[AccountsStyles.textBold]}>{I18n("ACCOUNTS_ACCOUNT_NUMBER")}</Text>
                </View>
                <KeyboardAvoidingView behavior={'padding'} >
                  <TextInput
                      placeholder={capitalizeFirstLetter(I18n("ACCOUNTS_ACCOUNT_NUMBER_"))}
                      style={AccountsStyles.input}
                      maxLength = {30}
                      autoCorrect={false}
                      onChangeText={number => this.setState({number})}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"
                  />
                </KeyboardAvoidingView>
              </View>
              <View style={AccountsStyles.checkMarkCon}>
                <View style={AccountsStyles.loaderCon}>
                  {this.state.loading ? <Loader size={35} color="#008142" /> : <Text></Text>}
                </View>
                <View style={AccountsStyles.BtnCon}>
                </View>
              </View>
            </View>
          </Image>
          <FabButton iconName="check" iconColor="#fff" onPress={this.submit.bind(this)} disabled={this.state.loading}/>
          <Modal style={AccountsStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
            <View style={AccountsStyles.renderListCon}>
              {this.getCountries()}
            </View>
          </Modal>
        </ViewContainer>
    );
  }
}
