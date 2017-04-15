import React, { Component } from 'react';
import { View, Text, Image, Icon, ScrollView } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Meteor, { createContainer } from 'react-native-meteor';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import { getTheme } from 'react-native-material-kit';
import {currencyStandardFormat, loggedUserCurrency, alterIconName} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';

const theme = getTheme();

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableBalance: [],
      loading: true
    };
    this.getAvailableBalance = this.getAvailableBalance.bind(this);
  }

  componentWillReceiveProps(props){
    props.accounts.forEach(account => this.getAvailableBalance([account._id]))
  }

  getAvailableBalance (accounts){
    accounts = accounts || [];
    Meteor.call('statistics.availableBalance', {accounts}, (err, ab) => {
      this.setState({availableBalance: [...this.state.availableBalance, ab ? ab : 0]});
      this.state.availableBalance.length == this.props.accounts.length ? this.setState({loading: false}) : false
    });
  }

  accounts(){
    return this.props.accounts.map((accountData, i, arr) => {
      let icon_name = accountData.bank ? accountData.bank.replace('bank-' , "") : '';
      return(
        <View style={arr.length - 1 == i ? AccountsStyles.lastElementPadding : ''} key={i} >
          <View style={[theme.cardStyle, AccountsStyles.card]} elevation={3}>
            <View style={AccountsStyles.imgBox}>
              <BankIcon name ={icon_name} size={45} />
            </View>
            <View style={AccountsStyles.detailBox}>
              <Text style={AccountsStyles.text}>{icon_name.split('-').map(bankName => bankName  + ' ')}</Text>
              <Text style={AccountsStyles.accNo}>{accountData.number}</Text>
              <View style={AccountsStyles.currencyAndAmount}>
                <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={15} />
                <Text style={AccountsStyles.amount}>{currencyStandardFormat(this.state.availableBalance[i])}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    })
  }
  render() {

    let {navigate} = this.props.navigation;

    return (
      <ViewContainer>
        <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={AccountsStyles.backgroundImage}>
          {!this.state.loading ? <ScrollView style={AccountsStyles.scroll}>
              {
                this.accounts()
              }
            </ScrollView>: <View style={AccountsStyles.loaderView}><Loader size={35} color="#008142" /></View>

          }
        </Image>
        {!this.state.loading ? <FabButton iconName="add" iconColor="#fff" style={AccountsStyles.fabButtonBg} onPress={() => navigate('AddAccount')} /> : <Text></Text>}
      </ViewContainer>
    );
  }
}

export default createContainer(() => {
  const accountHandler = Meteor.subscribe('accounts');

  return {
    accountsReady: accountHandler.ready(),
    accounts: Meteor.collection('accounts').find({})
  };
}, Accounts);
