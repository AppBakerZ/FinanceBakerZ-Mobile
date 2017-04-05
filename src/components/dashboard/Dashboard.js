import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import DashboardTabBottomScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabBottomScreen';
import { TabNavigator, TabView } from 'react-navigation';
import Meteor, {createContainer} from 'react-native-meteor';
import { getTheme } from 'react-native-material-kit';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
const theme = getTheme();
import {formatDate, filterDate, alterName, loggedUserCurrency, currencyStandardFormat, alterIconName} from 'FinanceBakerZ/src/customLibrary';
import moment from 'moment';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    let datetime = new Date();

    this.state = {
      availableBalance: null,
      totalIncomes: null,
      totalExpenses: null,
      loading: true,
      updateParentState: (childState) => {this.setState(childState)},
      dateFrom: new Date(moment(datetime).startOf('month').format()),
      dateTo: datetime,
      getTotalIncomesAndExpenses: this.getTotalIncomesAndExpenses
    };
    this.getAvailableBalance();
    this.filterByDate = this.filterByDate.bind(this);
    this.getTotalIncomesAndExpenses = this.getTotalIncomesAndExpenses.bind(this);
    this.getAvailableBalance = this.getAvailableBalance.bind(this);
    this.updateByAccount = this.updateByAccount.bind(this);
  }

  componentWillReceiveProps(props){
    this.setState({incomes: props.incomes, expenses: props.expenses});
    this.setDefaultAccounts(props);
  }

  setDefaultAccounts (props){
    let multiple = [];
    let bankAcc =  [];
    props.accounts.forEach((account) => {
      multiple.push(account._id);
      bankAcc.push(alterName(account.bank));
    });
    this.setState({multiple, bankAcc});
    this.updateByAccount(multiple)
  }

  updateByAccount(accounts){
    this.getAvailableBalance(accounts);
    this.getTotalIncomesAndExpenses(accounts);
  }

  getAvailableBalance (accounts){
    accounts = accounts || [];
    Meteor.call('statistics.availableBalance', {accounts}, (err, ab) => {
      if(ab){
        this.setState({availableBalance: ab})
      }
    });
  }

  filterByDate(){
    let setDate = {};
    if(this.state.childState){
      const {date}  = this.state.childState;
      let newDate;
      newDate = date.filter(date => date.checked);
      setDate = filterDate(newDate);
    }else{
      setDate.start = moment(this.state.dateFrom).startOf('day').format();
      setDate.end = moment(this.state.dateTo).endOf('day').format();
    }
    return setDate;
  }

  getTotalIncomesAndExpenses (accounts = this.state.multiple){
    let date = this.filterByDate();
    Meteor.call('statistics.totalIncomesAndExpenses', {accounts, date}, (err, totals) => {
      if(totals){
        this.setState({
          totalIncomes: totals.incomes,
          totalExpenses: totals.expenses,
          loading: false
        })
      }else{
        console.log(err.reason);
      }
    });
  }

  render() {

    const { navigate } = this.props.navigation;
    let params = this.state.childState || [];
    let bankList = params.bankList || [];
    let date = params.date || [];



    return (
      <ViewContainer>
        <View style={DashboardStyles.imgContainer}>
          <Image style={DashboardStyles.img} source={require('FinanceBakerZ/src/images/dashboard/dollars.png')}>
            <Text style={DashboardStyles.textWhite}>Your Remaining Amount is</Text>
            {(!this.state.loading  ?
              <View style={DashboardStyles.currencyCon}>
                <CurrencyIcon style={DashboardStyles.currencyIcon} size={30} color="#fff" name={alterIconName(loggedUserCurrency())} />

                <Text style={DashboardStyles.textPrice}>{currencyStandardFormat(this.state.availableBalance)}
              </Text>
              </View>: <ActivityIndicator size="large" color="#ff9c00" />)}
          </Image>
        </View>
        <View style={DashboardStyles.dateTabContainer} >
          <TouchableOpacity style={DashboardStyles.filterMainContainer} disabled={this.state.loading} activeOpacity={0.7} onPress={() => navigate('Selection', [{params}, this.state.updateParentState, this.updateByAccount, this.state.multiple, this.state.bankAcc])}>
            <View style={DashboardStyles.filterContainer}>
              <Text style={DashboardStyles.text}>Accounts: {(bankList.length ? bankList.map((val, i, arr) => (val.check ? ' ' + val.name + ' |' : '')) : 'All')}</Text>
              <Text style={DashboardStyles.text}>
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
            <View style={DashboardStyles.filterIconContainer}>
              <Icon name="filter" size={25} />
            </View>
          </TouchableOpacity>
          <View style={[theme.cardStyle, DashboardStyles.card]} elevation={5}>
            <View style={[DashboardStyles.childContainer, DashboardStyles.childContainerBorder]}>
              <Text style={DashboardStyles.textHeading}>Your Incomes</Text>
              {(!this.state.loading ?
                <View style={DashboardStyles.currencyCon}>
                  <CurrencyIcon style={DashboardStyles.currencyIcon} size={20} color="#1F9058" name={alterIconName(loggedUserCurrency())} />
                  <Text style={DashboardStyles.greenText}>{currencyStandardFormat(this.state.totalIncomes)}</Text>
                </View> : <ActivityIndicator size="large" color="#008142" />)}
            </View>
            <View style={DashboardStyles.childContainer}>
              <Text style={DashboardStyles.textHeading}>Your Expenses</Text>
              {(!this.state.loading ?
                <View style={DashboardStyles.currencyCon}>
                  <CurrencyIcon style={DashboardStyles.currencyIcon} size={20} color="#C71818" name={alterIconName(loggedUserCurrency())} />
                  <Text style={DashboardStyles.redText}>{currencyStandardFormat(this.state.totalExpenses)}</Text>
                </View>
                : <ActivityIndicator size="large" color="#008142" />)}
            </View>
          </View>
        </View>
        <View style={DashboardStyles.bottomTabContainer}>
          <DashboardBottomTabNavigator />
        </View>
      </ViewContainer>
    );
  }
}


const DashboardBottomTabNavigator = TabNavigator({
  'TRANSACTIONS': {
    screen: DashboardTabBottomScreen
  },
  'INCOMES': {
    screen: DashboardTabBottomScreen
  },
  'EXPENSES': {
    screen: DashboardTabBottomScreen
  }
}, {
  tabBarComponent: TabView.TabBarTop,
  lazyLoad: true,
  swipeEnabled: true,
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: 'INCOMES',
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

Dashboard.propTypes = {
  accounts: PropTypes.array.isRequired
};

export default createContainer(() => {

  const accountHandler = Meteor.subscribe('accounts');

  return {
    accountsReady: accountHandler.ready(),
    accounts: Meteor.collection('accounts').find({}),
    user: Meteor.user(),

  };
}, Dashboard);
