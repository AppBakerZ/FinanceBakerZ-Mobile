import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Picker, Platform, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import countries from 'FinanceBakerZ/src/countries';
import bankFonts from 'FinanceBakerZ/src/bankFonts';
import Modal from 'react-native-modalbox';
import {alterName, chunk, showAlert} from 'FinanceBakerZ/src/customLibrary';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import _ from 'underscore';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import Meteor  from 'react-native-meteor';




export default class AddAccount extends Component{


  constructor(props){
    super(props);
    this.state = {
      country: 'PK',
      number: '',
      bank: '',
      loading: false
    };

    //get all countries that have banks.
    let availableBankCountries = Object.keys(bankFonts);

    //filter country according to availableBankCountries.
    let bankCountries = countries.filter((obj) => {
      return availableBankCountries.includes(obj.value)
    });

    //sort countries in alphabetically order.
    this.countries = _.sortBy(bankCountries, 'label');
    this.countries = [{value: 'All', label: 'All Countries'}, ...this.countries];
    this.bankFonts = bankFonts;
  }

  setBanks(country){
    return (country == 'All' ? Object.values(bankFonts).reduce((prev, curr) => [...prev, ...curr]) : bankFonts[country]);
  }

  getCountries(){
    let countryItems = this.countries.map((country, i) => {
      return <Picker.Item label={country.label} value={country.value} key={i}/>
    });
    return(
      <Picker
        selectedValue={this.state.country}
        onValueChange={(lang) => this.setState({country: lang})}>
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

  renderBankIcons(){
    let {country} = this.state;
    let bankFonts = country == 'All' ? this.setBanks(country) : this.bankFonts[country];
    let bankIcons = chunk(bankFonts, 3);

      return bankIcons.map((bank, i) => {
        return(
          <View style={AccountsStyles.bankIconCon} key={i}>
            {bank.map((bankName, index) => {
              let icon_name = bankName.value.replace('bank-' , '');
              return(
                <TouchableOpacity style={AccountsStyles.bankIcon} onPress={() => this.setState({bank: bankName})} activeOpacity={0.75} key={index}>
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
              {(Platform.OS !== 'ios') ? this.getCountries() :
                <TouchableOpacity style={AccountsStyles.bankCardTxtAndIcon} activeOpacity={0.75} onPress={() => this.refs.modal.open()}>
                  <Text style={[AccountsStyles.textBold, AccountsStyles.textLeft]}>{this.getCountryName()}</Text>
                  <Icon size={10} name="down-arrow" style={AccountsStyles.iconRight} />
                </TouchableOpacity>
              }
            </View>
            <View style={AccountsStyles.bankCardCon}>
              <View style={AccountsStyles.bankCardTxtAndIcon}>
                <Text style={[AccountsStyles.textBold, AccountsStyles.textLeft]}>{this.state.bank ? this.state.bank.label : 'Select Bank / Card'}</Text>
                <Icon size={10} name="down-arrow" style={AccountsStyles.iconRight} />
              </View>
            </View>
            <View style={AccountsStyles.bankIconsCon}>
              <ScrollView>
                {this.renderBankIcons.bind(this)()}
              </ScrollView>
            </View >
            <View style={AccountsStyles.accountNoCon}>
              <KeyboardAvoidingView>
                <TextInput
                  placeholder='Enter Account Number'
                  style={AccountsStyles.input}
                  maxLength = {30}
                  autoCorrect={false}
                  onChangeText={(number) => this.setState({number})}
                  underlineColorAndroid="transparent"
                />
              </KeyboardAvoidingView>
            </View>
            <View style={AccountsStyles.checkMarkCon}>
              <View style={AccountsStyles.loaderCon}>
                {this.state.loading ? <Loader size={35} color="#008142" /> : <Text></Text>}
              </View>
              <View style={AccountsStyles.BtnCon}>
                <MaterialIcon name="done" size={40} color="#fff" onPress={this.submit.bind(this)} disabled={this.state.loading}/>
              </View>
            </View>
          </View>
        </Image>
        <Modal style={AccountsStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <View style={AccountsStyles.renderListCon}>
            {this.getCountries()}
          </View>
        </Modal>
      </ViewContainer>
    );
  }
}