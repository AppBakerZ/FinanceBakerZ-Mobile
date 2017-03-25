import React, {Component} from 'react';
import {View, Text, Picker, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Button } from 'react-native';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import DashboardSelectionTab from 'FinanceBakerZ/src/components/dashboard/DashboardSelectionTab';
import { TabNavigator, TabView } from 'react-navigation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
import { MKCheckbox, setTheme, MKColor } from 'react-native-material-kit';
import { getTheme } from 'react-native-material-kit';
const theme = getTheme();
let screen = Dimensions.get('window');

setTheme({checkboxStyle: {
  fillColor: MKColor.Green,
  borderOnColor: MKColor.Green,
  borderOffColor: MKColor.Green,
  rippleColor: `rgba(${MKColor.RGBTeal},.15)`,
}});

let STATE;

export default class DashboardSelection extends Component{

  static navigationOptions = {
    header: ({ state, navigate, goBack }) => {
      let left = (
        <Icon  name="back"
               size={32}
               style={{marginLeft: 5, padding: 10}}
               onPress={() => {
               goBack()
                }}
        />
      );
      let title = (
        <Text style={{fontSize: 20, fontFamily: 'QuicksandBold-Regular', color: '#00562E'}}>{state.routeName}</Text>
      );
      let right = (
        <Icon  name="checked"
               color="black"
               size={32}
               style={{padding: 10}}
               onPress={() => {
               navigate('Dashboard', STATE)
                }}
        />
      );
      style = {
        height: 70,
        backgroundColor: '#ffffff'
      };
      return { left, title, right, style};
    },
  };



  constructor(props){
    super(props);
    let {multiple, bankList} = props.navigation.state.params.params;
    this.state = {
      multiple: multiple || [],
      bankList: bankList
    };
    STATE = this.state;
  }

  componentWillMount(){
    let banks = ['HBL', 'UBL', 'DIB', 'NIB'];
    let data = [];

    if(!this.props.navigation.state.params.params.bankList){
    for(let x = 0; x < banks.length; x++){
      data.push({
        name : banks[x],
        check: false,
        id: x,
      });
    }
    this.setState({bankList: data});
  }
  }


  handleMultipleChange(selected, indexBank){
    let multiple = this.state.multiple;
    let bankList = this.state.bankList;
    let check = multiple.find(check => check.id == selected.id);
    let index = multiple.indexOf(check);
    if(!check){
      this.setState({multiple: [...multiple, selected]}, ()=> STATE = this.state);
      bankList[indexBank].check = true;
      this.setState({bankList});
    }else{
      multiple.splice(index, 1);
      this.setState({multiple}, ()=> STATE = this.state);
      bankList[indexBank].check = false;
      this.setState({bankList});
    }
  }


  renderList() {
    let list = [];
    for(let i = 0; i < this.state.bankList.length; i++) {
      list.push(
        <TouchableOpacity onPress={this.handleMultipleChange.bind(this, this.state.bankList[i], i)}    key={i} style={DashboardStyles.checkBoxContainer} activeOpacity={0.8}>
          <View style={DashboardStyles.checkBoxCon}>
            <MKCheckbox  checked={this.state.bankList[i].check} disabled  />
          </View>
          <View style={DashboardStyles.checkBoxItemCon}>
            <Text style={DashboardStyles.checkBoxItem}>{this.state.bankList[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return list;
  }

  render(){

    return(
      <ViewContainer>
        <View style={DashboardStyles.DbSelectionContainer}>
          <View style={DashboardStyles.DbSelectionAccAndWeek}>
            <View style={DashboardStyles.DbSelectionAccountsCon}>
              <Text style={DashboardStyles.DbSelectionText}>Accounts: &nbsp;</Text>
                {this.state.multiple.map((val, i) => {
                  let index = this.state.bankList.indexOf(val);
                  return(
                    <TouchableOpacity onPress={this.handleMultipleChange.bind(this, val, index)} key={i} style={[theme.cardStyle, DashboardStyles.DbSelectionCardTag]} elevation={5} activeOpacity={0.8}>
                      <Text style={DashboardStyles.DbSelectionCardTagCross}>x</Text>
                      <Text style={[DashboardStyles.DbSelectionTag, DashboardStyles.DbSelectionText]}>{val.name}</Text>
                    </TouchableOpacity>
                  );
                })
                }
            </View>
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
              {this.renderList.bind(this)()}
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
