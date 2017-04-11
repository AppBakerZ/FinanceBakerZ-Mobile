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



class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: props.transactions ? false : true
    }
  }


  render() {

    const { navigate } = this.props.navigation;
    let {incomes, expenses, transactions} = this.props;
    let {loading} = this.state;

    if(!loading){
      return(
        <ViewContainer>
          <View style={TransactionsStyles.filterContainer}>
            <TouchableOpacity style={TransactionsStyles.filterMainContainer}  activeOpacity={0.7} onPress={() => navigate('Selection')} >
              <View style={TransactionsStyles.filterContainerTxt}>
                <Text style={TransactionsStyles.text}>Accounts: All </Text>
                <Text style={TransactionsStyles.text}>This Week: Mar 10 to 20</Text>
              </View>
              <View style={TransactionsStyles.filterIconContainer}>
                <Icon name="filter" size={25} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={TransactionsStyles.tabContainer}>
            <TransactionTabNavigator screenProps={{incomes, expenses, transactions}} />
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
  Meteor.subscribe('incomes', 100);
  Meteor.subscribe('expenses', 100);

  let incomes, expenses;
  incomes =  Meteor.collection('incomes').find({}).reverse();
  expenses = Meteor.collection('expenses').find({}).reverse();

  return {
    incomes: incomes.reverse(),
    expenses: expenses.reverse(),
    transactions: _.sortBy(incomes.concat(expenses), function(transaction){return transaction.receivedAt || transaction.spentAt }).reverse()
  };
}, Transactions);