import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import DashboardTabScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabScreen';
import DashboardTabBottomScreen from 'FinanceBakerZ/src/components/dashboard/DashboardTabBottomScreen';
import { TabNavigator, TabView } from 'react-navigation';


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
  tabBarComponent: TabView.TabBarTop,
  lazyLoad: true,
  swipeEnabled: true,
  tabBarPosition: 'top',
  animationEnabled: true,
  initialRouteName: 'THIS MONTH',
  tabBarOptions: {
    style: {
      backgroundColor: '#3b3b3b',
      height: 55
    },
    labelStyle: {
      fontFamily: 'QuicksandBold-Regular',
      fontSize: 12,
      color: '#ffffff',
    }
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

