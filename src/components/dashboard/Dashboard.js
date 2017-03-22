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

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableBalance: null
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
    console.log(this.props);

    return (
      <ViewContainer>
        <View style={DashboardStyles.imgContainer}>
          <Image style={DashboardStyles.img} source={require('FinanceBakerZ/src/images/dashboard/dollars.png')}>
            <Text style={DashboardStyles.textWhite}>Your Remaining Amount is</Text>
            <Text style={DashboardStyles.textPrice}>{this.state.availableBalance}</Text>
          </Image>
        </View>
        <View style={DashboardStyles.dateTabContainer}>
          <TouchableOpacity style={DashboardStyles.filterMainContainer} activeOpacity={0.7} onPress={() => navigate('Selection')}>
            <View style={DashboardStyles.filterContainer}>
              <Text style={DashboardStyles.text}>Accounts: DIB | HBL | UBL</Text>
              <Text style={DashboardStyles.text}>This Week: Mar 14 - Mar 20</Text>
            </View>
            <View style={DashboardStyles.filterIconContainer}>
                <Icon name="filter" size={25} />
            </View>
          </TouchableOpacity>
          <View style={[theme.cardStyle, DashboardStyles.card]} elevation={4}>
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

