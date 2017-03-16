import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import DashboardTabScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabScreen';
import DashboardTabBottomScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabBottomScreen';
import { TabNavigator } from 'react-navigation';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.props);

    return (
      <ViewContainer>
        <View style={DashboardStyles.imgContainer}>
          <Image style={DashboardStyles.img} source={require('FinanceBakerZ/src/images/dashboard/dollars.png')}>
            <Text style={DashboardStyles.text}>Your Remaining Amount is</Text>
            <Text style={DashboardStyles.textPrice}>Rs 2,30,000</Text>
          </Image>
        </View>
        <View style={DashboardStyles.dateTabContainer}>
          <DashboardTabNavigator />
        </View>
        <View style={DashboardStyles.bottomTabContainer}>
          <DashboardBottomTabNavigator />
        </View>
      </ViewContainer>
    );
  }
}

const DashboardTabNavigator = TabNavigator({
  'TODAY': {
    screen: DashboardTabScreen
  },
  'THIS WEEK': {
    screen: DashboardTabScreen
  },
  'THIS MONTH': {
    screen: DashboardTabScreen
  },
  'THIS YEAR': {
    screen: DashboardTabScreen
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#DADADA',
    },
    labelStyle: {
      fontFamily: 'QuicksandBook-Regular'
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    tabStyle: {
      borderLeftColor: '#CFCFCF',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF'
    },
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor : '#DADADA',
  }
});

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
  tabBarOptions: {
    style: {
      backgroundColor: '#3B3B3B',
    },
    labelStyle: {
      fontFamily: 'QuicksandBold-Regular',
      fontSize: 10
    },
    tabStyle: {
      padding: 15
    },
    activeTintColor: 'white',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor : '#DADADA',
  }
});

