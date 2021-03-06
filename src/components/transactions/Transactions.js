import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity,Image} from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import TransactionTabScreen from 'FinanceBakerZ/src/components/transactions/TransactionTabScreen';
import { TabNavigator, TabBarTop} from 'react-navigation';
import Meteor, {createContainer, ReactiveDict} from 'react-native-meteor';
import _ from 'underscore';
import {alterName, formatDate} from 'FinanceBakerZ/src/customLibrary';

let query = new ReactiveDict('transactionsDict');


class Transactions extends Component {
  constructor(props) {

    super(props);
    this.state = {
      updateParentState: (childState) => {this.setState(childState)},
      incomes: props.incomes || [],
      expenses: props.expenses || [],
      transactions: props.transactions || [],
      transactionsLoading: props.transactionsLoading
    };
    this.setDefaultAccounts = this.setDefaultAccounts.bind(this);
    setTimeout(() => query.set('query', {
      limit: 25,
      accounts: []
    }));
    this.updateQuery = this.updateQuery.bind(this);
  }

  componentWillReceiveProps(props){
    this.setState({
      incomes: props.incomes,
      expenses: props.expenses,
      transactions: props.transactions,
      transactionsLoading: props.transactionsLoading
    });
    this.setDefaultAccounts(this.props.accounts);
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

  updateQuery(updatedQuery){
    setTimeout(() => query.set('query', updatedQuery));
    this.setState({transactionsLoading: true});
    this.forceUpdate();
  }


  render() {

    const { navigate } = this.props.navigation;
    let {incomes, expenses, transactions, transactionsLoading} = this.state;
    let {multiple, bankAcc} = this.state;
    let updateParentState = this.state.updateParentState;
    let params = this.state.childState || []; // date and bankList from TransactionSelection's state
    let bankList = params.bankList || [];
    let date = params.date || [];
    let transactionQuery = query.get('query');
    let updateQuery = this.updateQuery;
      return(
        <ViewContainer>
          <View style={TransactionsStyles.filterContainer}>
            <Image source={require('FinanceBakerZ/src/images/filterBg.png')} style={TransactionsStyles.transitionFilterBg}>
              <TouchableOpacity style={TransactionsStyles.filterMainContainer}  activeOpacity={0.7} onPress={() => navigate('Selection', {params, multiple, bankAcc, updateParentState, transactionQuery, updateQuery})} >
                <View style={TransactionsStyles.filterContainerTxt}>
                  {bankList.length || date.length ?
                      <Text style={TransactionsStyles.filterApplied}>Filters Applied</Text>
                      :
                      <View>
                        <Text style={TransactionsStyles.text}>Accounts: All</Text>
                        <Text style={TransactionsStyles.text}>
                          Custom: {formatDate({type: 'startOf', duration: 'month', format: 'MMM DD, YYYY'}) + ' - ' + formatDate({format: 'MMM DD, YYYY'})}
                        </Text>
                      </View>
                  }
                </View>
                <View style={TransactionsStyles.filterIconContainer}>
                  <Icon name="filter" size={25} />
                </View>
              </TouchableOpacity>
            </Image>
          </View>
          <View style={TransactionsStyles.tabContainer}>
            <TransactionTabNavigator screenProps={{incomes, expenses, transactions, transactionsLoading, navigate}} />
          </View>
        </ViewContainer>
      )
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
  tabBarComponent: TabBarTop,
  lazy: true,
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

  let transactionsHandle = Meteor.subscribe('transaction', query.get('query'));
  Meteor.subscribe('accounts');

  let incomes, expenses, transactions;
  incomes =  Meteor.collection('transactions').find({type: 'income'}).reverse();
  expenses = Meteor.collection('transactions').find({type: 'expense'}).reverse();
  transactions =  Meteor.collection('transactions').find();
  transactions = _.sortBy(transactions, 'transactionAt').reverse();
  const transactionsLoading = !transactionsHandle.ready();

  return {
    transactionsLoading,
    accounts: Meteor.collection('accounts').find({}),
    incomes: incomes.reverse(),
    expenses: expenses.reverse(),
    transactions
  };
}, Transactions);