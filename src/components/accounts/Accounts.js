import React, { Component } from 'react';
import { View, Text, Image, Icon,ScrollView } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Meteor, { createContainer } from 'react-native-meteor';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import { getTheme } from 'react-native-material-kit';
import {currencyStandardFormat, loggedUserCurrency, alterIconName} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';


const theme = getTheme();

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableBalance: [],
      loading: true
    };
    this.getAvailableBalance = this.getAvailableBalance.bind(this);
    props.accounts.forEach(account => this.getAvailableBalance([account._id]))
  }

  getAvailableBalance (accounts){
    accounts = accounts || [];
    Meteor.call('statistics.availableBalance', {accounts}, (err, ab) => {
      this.setState({availableBalance: [...this.state.availableBalance, ab ? ab : 0]});
      this.state.availableBalance.length == this.props.accounts.length ? this.setState({loading: false}) : ''
    });
  }

  accounts(){
    return this.props.accounts.map((accountData, i) => {
      let icon_name = accountData.bank ? accountData.bank.replace('bank-' , "") : '';
      return(
        <View style={[theme.cardStyle, AccountsStyles.card]} key={i} elevation={3}>
          <View style={AccountsStyles.imgBox}>
            <BankIcon name ={icon_name} size={50} />
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
      )
    })
  }
  render() {

    return (
      <ViewContainer>
        {!this.state.loading ? <ScrollView style={AccountsStyles.scroll}>
            {
              this.accounts()
            }
          </ScrollView>: <View style={AccountsStyles.loaderView}><Loader size={35} color="#008142" /></View>}
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
