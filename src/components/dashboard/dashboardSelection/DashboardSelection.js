import React, {Component} from 'react';
import {View, Text, Picker, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { DashboardSelStyles } from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelStyles';
import DashboardSelectionTab from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelectionTab';
import { TabNavigator, TabView } from 'react-navigation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
import { MKCheckbox, getTheme } from 'react-native-material-kit';
import {formatDate} from 'FinanceBakerZ/src/customLibrary';
const theme = getTheme();

let STATE;

export default class DashboardSelection extends Component{

  static navigationOptions = {
    header: ({ state, goBack }) => {
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
                 state.params[1]({childState: STATE});
                 goBack();
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
    let {multiple, bankList, date} = props.navigation.state.params[0].params;
    let dateNow = new Date(), y = dateNow.getFullYear(), m = dateNow.getMonth();
    this.state = {
      multiple: multiple || [],
      bankList: bankList,
      date : date || [
        {selected: 'Day', checked: false},
        {selected: 'Day', checked: false},
        {selected: 'Week', checked: false},
        {selected: 'Week', checked: false},
        {selected: 'Month', checked: false},
        {selected: 'Month', checked: false},
        {selected: 'Custom', checked: true, customDateTo: new Date(y, m, 1), selectedDate: formatDate('startOf', null, 'month')},
        {selected: 'Custom', checked: false, customDateFrom: new  Date(), selectedDate: formatDate()}
      ],
      updateDates: (date) => {this.setState({date})}
    };
    STATE = this.state;
  }


  componentWillMount(){
    let banks = ['HBL', 'UBL', 'DIB', 'NIB'];
    let data = [];

    if(!this.props.navigation.state.params[0].params.bankList){
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
        <TouchableOpacity onPress={this.handleMultipleChange.bind(this, this.state.bankList[i], i)} elevation={5}   key={i} style={DashboardSelStyles.checkBoxContainer} activeOpacity={0.8}>
          <View style={DashboardSelStyles.checkBoxCon}>
            <MKCheckbox style={DashboardSelStyles.checkBox} checked={this.state.bankList[i].check} disabled  />
          </View>
          <View style={DashboardSelStyles.checkBoxItemCon}>
            <Text style={DashboardSelStyles.checkBoxItem}>{this.state.bankList[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return list;
  }

  render(){

    const {multiple, date, bankList} = this.state;

    return(
      <ViewContainer>
        <View style={DashboardSelStyles.DbSelectionContainer}>
          <View style={DashboardSelStyles.DbSelectionAccAndWeek}>
            <View style={DashboardSelStyles.DbSelectionAccountsCon}>
              <Text style={DashboardSelStyles.DbSelectionText}>Accounts: &nbsp;</Text>
              {(multiple.length ? multiple.map((val, i) => {
                  let index = bankList.indexOf(val);
                  return(
                    <TouchableOpacity onPress={this.handleMultipleChange.bind(this, val, index)} key={i} style={DashboardSelStyles.DbSelectionCardTagCon} activeOpacity={0.8}>
                      <View style={[theme.cardStyle, DashboardSelStyles.DbSelectionCardTag]} elevation={5} >
                        <Text style={DashboardSelStyles.DbSelectionCardTagCross}>x</Text>
                        <Text style={[DashboardSelStyles.DbSelectionTag, DashboardSelStyles.DbSelectionText]}>{val.name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }) : <Text style={DashboardSelStyles.DbSelectionText}>All</Text>)
              }
            </View>
            <Text style={DashboardSelStyles.DbSelectionText}>{date.map((val, i, arr) => {
              if(val.checked){
                if(val.selected == 'Custom'){
                  let index = (i == arr.length - 2 ? i : i - 1);
                  return val.selected + ': '  + (arr[index].selectedDate ? arr[index].selectedDate : '')  + ' - ' + (arr[index + 1].selectedDate ? arr[index + 1].selectedDate : '');
                }else{
                  return val.selected + ': ' + val.selectedDate;
                }
              }
            })}
            </Text>
          </View>
          <View style={DashboardSelStyles.DbSelectionBankAcc}>
            <TouchableOpacity style={DashboardSelStyles.DbSelectionBankAccBtn} onPress={() => this.refs.modal.open()} activeOpacity={0.7}>
              <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.DbSelectionBankAccText]}>Bank Account</Text>
              <Icon size={20} style={DashboardSelStyles.DbSelectionBankAccIcon} name="down-arrow"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={DashboardSelStyles.DbSelectionTabContainer}>
          <DashboardSelectionTabScreen screenProps={[this.state.date, this.state.updateDates]} />
        </View>
        <Modal style={DashboardSelStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <ScrollView>
            <View style={DashboardSelStyles.renderListCon}>
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
