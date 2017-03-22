import React, {Component} from 'react';
import {View, Text, Picker, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import DashboardSelectionTab from 'FinanceBakerZ/src/components/dashboard/DashboardSelectionTab';
import { TabNavigator, TabView } from 'react-navigation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
let screen = Dimensions.get('window');
import { MKCheckbox } from 'react-native-material-kit';

export default class DashboardSelection extends Component{

  constructor(){
    super();
    this.state  = {
      accounts: []
    };
  }




  renderList() {
    let list = [];

    for (let i=1;i<10;i++) {
      list.push(
        <TouchableOpacity style={DashboardStyles.checkBoxContainer} activeOpacity={1}>
          <Text>Item {i}</Text>
          <MKCheckbox />
        </TouchableOpacity>
      );
    }

    return list;
  }

  render(){
    return(
      <ViewContainer>
        <View style={DashboardStyles.DbSelectionContainer}>
          <View style={DashboardStyles.DbSelectionAccAndWeek}>
            <Text style={DashboardStyles.DbSelectionText}>Accounts: {this.state.accounts}</Text>
            <Text style={DashboardStyles.DbSelectionText}>Week: </Text>
          </View>
          <View style={DashboardStyles.DbSelectionBankAcc}>
            <TouchableOpacity style={DashboardStyles.DbSelectionBankAccBtn} onPress={() => this.refs.modal.open()} activeOpacity={0.7}>
              <Text style={[DashboardStyles.DbSelectionText, DashboardStyles.DbSelectionBankAccText]}>Bank Account</Text>
              <Icon size={20} style={DashboardStyles.DbSelectionBankAccIcon} name="down-arrow"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={DashboardStyles.DbSelectionTabContainer}>
          <DashboardSelectionTabScreen />
        </View>
        <Modal style={DashboardStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>
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
