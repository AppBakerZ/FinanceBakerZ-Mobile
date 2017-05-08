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


  constructor(props){
    super(props);
    let {state} = this.props.navigation;

    let {date} = state.params[0].params; // selected dates if available
    let bankAcc = state.params[4]; // bank account names from server
    let multiple =  state.params[0].params.multiple; // user selected account id's

    let dateNow = new Date(), y = dateNow.getFullYear(), m = dateNow.getMonth();
    this.state = {
      multiple: multiple || [],
      bankAccName: bankAcc,
      bankList: state.params[0].params.bankList || [],
      date : date || [
        {selected: 'Day', checked: false},
        {selected: 'Day', checked: false},
        {selected: 'Week', checked: false},
        {selected: 'Week', checked: false},
        {selected: 'Month', checked: false},
        {selected: 'Month', checked: false},
        {selected: 'Custom', checked: true, customDateTo: new Date(y, m, 1), selectedDate: formatDate({type: 'startOf', duration: 'month', format: 'MMM DD, YYYY'})},
        {selected: 'Custom', checked: true, customDateFrom: new  Date(), selectedDate: formatDate({format: 'MMM DD, YYYY'})}
      ],
      updateDates: (date) => {this.setState({date})}
    };
    STATE = this.state;
    this.submit = this.submit.bind(this);
  }


  componentWillMount(){

    let {state} = this.props.navigation;
    let multiple = state.params[3]; // accounts id's from server
    let {bankList, bankAccName} = this.state;
    let data = [];

    if(!state.params[0].params.bankList || !bankList.length) {
      for (let x = 0; x < multiple.length; x++) {
        data.push({
          name: bankAccName[x],
          check: false,
          id: multiple[x],
        });
      }
      this.setState({bankList: data});
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
  }

  // invokes when tapping checked-icon on header
  submit(){
    let {state, goBack} = this.props.navigation;
    let accounts = STATE.multiple.length ? STATE.multiple : state.params[3]; // setting all accounts ids if user didn't select any account
    state.params[1]({childState: STATE}); // updating Dashboard state
    setTimeout(() => state.params[2](accounts)); // calling updateByAccount from Dashboard
    goBack();
  }


  handleMultipleChange(selected, indexBank){
    let multiple = this.state.multiple;
    let bankList = this.state.bankList;
    let check = multiple.find(bankId => bankId == selected);
    let index = multiple.indexOf(check);
    if(!check){
      this.setState({multiple: [...multiple, selected]});
      bankList[indexBank].check = true;
      this.setState({bankList}, ()=> STATE = this.state);
    }else{
      multiple.splice(index, 1);
      this.setState({multiple});
      bankList[indexBank].check = false;
      this.setState({bankList}, ()=> STATE = this.state);
    }
  }


  renderList() {
    let list = [];
    for(let i = 0; i < this.state.bankList.length; i++) {
      list.push(
        <TouchableOpacity onPress={this.handleMultipleChange.bind(this, this.state.bankList[i].id, i)} elevation={5}   key={i} style={DashboardSelStyles.checkBoxContainer} activeOpacity={0.8}>
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


  findIndex(bankId){
    const {bankList} = this.state;
    let findBankId;
    findBankId = bankList.find(bank => bank.id == bankId);
    return bankList.indexOf(findBankId);
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
                  let index = this.findIndex(val);
                  return(
                    <TouchableOpacity onPress={this.handleMultipleChange.bind(this, val, index)} key={i} style={DashboardSelStyles.DbSelectionCardTagCon} activeOpacity={0.8}>
                      <View style={[theme.cardStyle, DashboardSelStyles.DbSelectionCardTag]} elevation={5} >
                        <Text style={DashboardSelStyles.DbSelectionCardTagCross}>x</Text>
                        <Text style={[DashboardSelStyles.DbSelectionTag, DashboardSelStyles.DbSelectionText]}>{bankList[index].name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }) : <Text style={DashboardSelStyles.DbSelectionText}>All</Text>)
              }
            </View>
            <Text style={DashboardSelStyles.DbSelectionText}>{date.map((val, i, arr) => {
              if(val.checked){
                if(val.selected == 'Custom'){
                  return (i == arr.length - 1 ?  val.selected + ': ' + arr[i - 1].selectedDate + ' - ' + val.selectedDate : false);
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
  // tabBarComponent: TabView.TabBarTop,
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
