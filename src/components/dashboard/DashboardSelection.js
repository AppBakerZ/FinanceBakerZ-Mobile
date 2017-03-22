import React, {Component} from 'react';
import {View, Text, Picker} from 'react-native';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import DashboardSelectionTab from 'FinanceBakerZ/src/components/dashboard/DashboardSelectionTab';
import { TabNavigator, TabView } from 'react-navigation';


export default class DashboardSelection extends Component{

  constructor(){
    super();
    this.state  = {
      language: ''
    }
  }


  render(){
    return(
      <ViewContainer>
        <View style={DashboardStyles.DbSelectionContainer}>
          <View style={DashboardStyles.DbSelectionAccAndWeek}>
            <Text style={DashboardStyles.DbSeclectionText}>Accounts: </Text>
            <Text style={DashboardStyles.DbSeclectionText}>Week: </Text>
          </View>
          <View style={DashboardStyles.DbSelectionBankAcc}>
            <Picker
              selectedValue={this.state.language}
              onValueChange={(lang) => this.setState({language: lang})}
              style={DashboardStyles.DbSelectionPicker}
              itemStyle={DashboardStyles.DbSelectionPickerItem}
            >
              <Picker.Item label="Bank Account" value="bankAccount" />
              <Picker.Item label="Credit Card" value="creditCard" />
              <Picker.Item label="Cheque" value="cheque" />
            </Picker>
          </View>
        </View>
        <View style={DashboardStyles.DbSelectionTabContainer}>
          <DashboardSelectionTabScreen />
        </View>
      </ViewContainer>
    );
  }
}


const DashboardSelectionTabScreen = TabNavigator({
  'DAY': {
    screen: DashboardSelectionTab
  },
  'WEEK': {
    screen: DashboardSelectionTab
  },
  'MONTH': {
    screen: DashboardSelectionTab
  },
  'CUSTOM': {
    screen: DashboardSelectionTab
  }
}, {
  tabBarComponent: TabView.TabBarTop,
  lazyLoad: true,
  swipeEnabled: true,
  tabBarPosition: 'top',
  animationEnabled: true,
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

