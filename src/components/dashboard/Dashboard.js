import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import DashboardTabBottomScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabBottomScreen';
import { TabNavigator, TabView } from 'react-navigation';
import Meteor from 'react-native-meteor';
import { getTheme } from 'react-native-material-kit';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
const theme = getTheme();
import moment from 'moment';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableBalance: null,
      updateParentState: (childState) => {this.setState(childState)}
    };
    this.getAvailableBalance();
  }
  getAvailableBalance (accounts){
    accounts = accounts || [];
    Meteor.call('statistics.availableBalance', {accounts}, (err, ab) => {
      console.log('err, ab', err, ab);
      if(ab){
        this.setState({
          availableBalance: ab
        })
      }else{

      }
    });
  }
  render() {
    const { navigate } = this.props.navigation;

    let params = this.state.childState || [];
    let multiple = params.multiple || [];
    let date = params.date || [];

    return (
      <ViewContainer>
        <View style={DashboardStyles.imgContainer}>
          <Image style={DashboardStyles.img} source={require('FinanceBakerZ/src/images/dashboard/dollars.png')}>
            <Text style={DashboardStyles.textWhite}>Your Remaining Amount is</Text>
            <Text style={DashboardStyles.textPrice}>{this.state.availableBalance}</Text>
          </Image>
        </View>
        <View style={DashboardStyles.dateTabContainer}>
          <TouchableOpacity style={DashboardStyles.filterMainContainer} activeOpacity={0.7} onPress={() => navigate('Selection', [{params}, this.state.updateParentState])}>
            <View style={DashboardStyles.filterContainer}>
              <Text style={DashboardStyles.text}>Accounts: {(multiple.length ? multiple.map((val, i, arr) => ' '+ val.name + (i != arr.length - 1 ? ' |' : '')) : 'All')}</Text>
              <Text style={DashboardStyles.text}>
                {(date.length ? date.map((val, i, arr) => {
                    if(val.checked){
                      if(val.selected == 'Custom'){
                        let index = (i == arr.length - 2 ? i : i - 1);
                        return val.selected + ': '  + (arr[index].selectedDate ? arr[index].selectedDate : '')  + ' - ' + (arr[index + 1].selectedDate ? arr[index + 1].selectedDate : '');
                      }else{
                        return val.selected + ': ' + val.selectedDate;
                      }
                    }
                  }) : 'Custom: ' + moment().startOf('month').format('MMM DD') + ' - ' + moment().format('MMM DD'))}
              </Text>
            </View>
            <View style={DashboardStyles.filterIconContainer}>
              <Icon name="filter" size={25} />
            </View>
          </TouchableOpacity>
          <View style={[theme.cardStyle, DashboardStyles.card]} elevation={5}>
            <View style={[DashboardStyles.childContainer, DashboardStyles.childContainerBorder]}>
              <Text style={DashboardStyles.textHeading}>Your Incomes</Text>
              <Text style={DashboardStyles.greenText}>Rs. 4,354,155</Text>
            </View>
            <View style={DashboardStyles.childContainer}>
              <Text style={DashboardStyles.textHeading}>Your Expenses</Text>
              <Text style={DashboardStyles.redText}>Rs. 4,305,000</Text>
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

