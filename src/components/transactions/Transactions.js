import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import TransactionTabScreen from 'FinanceBakerZ/src/components/transactions/TransactionTabScreen';
import { TabNavigator, TabView } from 'react-navigation';
import Meteor, {createContainer} from 'react-native-meteor';
import _ from 'underscore';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import {alterName, formatDate} from 'FinanceBakerZ/src/customLibrary';



class Transactions extends Component {
  constructor(props) {

    super(props);
    this.state = {
      updateParentState: (childState) => {this.setState(childState)}
    };
    this.setDefaultAccounts = this.setDefaultAccounts.bind(this);
  }

  componentWillReceiveProps(props){
    this.setDefaultAccounts(props.accounts)
  }

  setDefaultAccounts (accounts){
    let multiple = [];
    let bankAcc =  [];
    accounts.forEach((account) => {
      multiple.push(account._id);
      bankAcc.push(alterName(account.bank));
    });
    this.setState({multiple, bankAcc});
  }


  render() {

    const { navigate } = this.props.navigation;
    let {incomes, expenses, transactions, transactionsLoading} = this.props;
    let {multiple, bankAcc} = this.state;
    let updateParentState = this.state.updateParentState;
    let params = this.state.childState || []; // date and bankList from TransactionSelection's state
    let bankList = params.bankList || [];
    let date = params.date || [];

    if(!transactionsLoading){
      return(
        <ViewContainer>
          <View style={TransactionsStyles.filterContainer}>
            <TouchableOpacity style={TransactionsStyles.filterMainContainer}  activeOpacity={0.7} onPress={() => navigate('Selection', {params, multiple, bankAcc, updateParentState})} >
              <View style={TransactionsStyles.filterContainerTxt}>
                <Text style={TransactionsStyles.text}>Accounts: {(bankList.length ? bankList.map((val, i, arr) => (val.check ? ' ' + val.name + ' |' : '')) : 'All')}</Text>
                <Text style={TransactionsStyles.text}>
                  {(date.length ? date.map((val, i, arr) => {
                      if(val.checked){
                        if(val.selected == 'Custom'){
                          return (i == arr.length - 1 ?  val.selected + ': ' + arr[i - 1].selectedDate + ' - ' + val.selectedDate : false);
                        }else{
                          return val.selected + ': ' + val.selectedDate;
                        }
                      }
                    }) : 'Custom: ' + formatDate({type: 'startOf', duration: 'month', format: 'MMM DD, YYYY'}) + ' - ' + formatDate({format: 'MMM DD, YYYY'}))}
                </Text>
              </View>
              <View style={TransactionsStyles.filterIconContainer}>
                <Icon name="filter" size={25} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={TransactionsStyles.tabContainer}>
            <TransactionTabNavigator screenProps={{incomes, expenses, transactions, transactionsLoading}} />
          </View>
        </ViewContainer>
      )
    }else{
      return <View style={TransactionsStyles.loadingCon}><Loader size={35} color="#008142" /></View>
    }
  }
}

const TransactionTabNavigator = TabNavigator({
  'TRANSACTIONS': {
    screen: TransactionTabScreen
  },
  'INCOMES': {
    screen: TransactionTabScreen
  },
  'EXPENSES': {
    screen: TransactionTabScreen
  }
}, {
  tabBarComponent: TabView.TabBarTop,
  lazyLoad: true,
  swipeEnabled: true,
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: 'TRANSACTIONS',
  tabBarOptions: {
    style: {
      backgroundColor: '#3b3b3b',
      height: 55
    },
    labelStyle: {
      fontFamily: 'QuicksandBold-Regular',
      fontSize: 11,
      color: '#ffffff',
      marginTop: 15
    }
  }
});

Transactions.propTypes = {
  incomes: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired
};

export default createContainer(() => {


  let transactionsHandle = Meteor.subscribe('incomes', 100);
  Meteor.subscribe('expenses', 100);
  Meteor.subscribe('accounts');

  let incomes, expenses;
  incomes =  Meteor.collection('incomes').find({}).reverse();
  expenses = Meteor.collection('expenses').find({}).reverse();
  const transactionsLoading = !transactionsHandle.ready();

  return {
    transactionsLoading,
    accounts: Meteor.collection('accounts').find({}),
    incomes: incomes.reverse(),
    expenses: expenses.reverse(),
    transactions: _.sortBy(incomes.concat(expenses), function(transaction){return transaction.receivedAt || transaction.spentAt }).reverse()
  };
}, Transactions);