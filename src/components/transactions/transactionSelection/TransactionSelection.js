import React, { Component } from 'react';
import { View, Text , ScrollView, TouchableOpacity } from 'react-native';
import { TransactionSelStyles } from 'FinanceBakerZ/src/components/transactions/transactionSelection/TransactionSelStyles';
import TransactionSelectionTab from 'FinanceBakerZ/src/components/transactions/transactionSelection/TransactionSelectionTab';
import { TabNavigator, TabView } from 'react-navigation';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
import { MKCheckbox, getTheme } from 'react-native-material-kit';
import {formatDate, filterDate} from 'FinanceBakerZ/src/customLibrary';
const theme = getTheme();

let STATE;
export  default  class TransactionSelection extends  Component {


  constructor(props){
    super(props);
    let {state} = this.props.navigation;

    let date = state.params.params.date; // selected dates if available
    let bankAcc = props.navigation.state.params.bankAcc; // bank account names from server
    let multiple =  state.params.params.multiple; // user selected account id's


    let dateNow = new Date(), y = dateNow.getFullYear(), m = dateNow.getMonth();
    this.state = {
      multiple: multiple || [],
      bankAccName: bankAcc,
      bankList: state.params.params.bankList || [],
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
      updateDates: (date) => {this.setState({date})},
    };
    STATE = this.state;
    this.submit = this.submit.bind(this);
  }


  componentWillMount(){

    let {state} = this.props.navigation;
    let multiple = state.params.multiple; // accounts id's from server
    let {bankList, bankAccName} = this.state;
    let data = [];

    if(!state.params.params.bankList || !bankList.length) {
      for (let x = 0; x < multiple.length; x++) {
        data.push({
          name: bankAccName[x],
          check: false,
          id: multiple[x],
        });
      }
      this.setState({bankList: data})
    }
  }


  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
  }

  // invokes when tapping checked-icon on header
  submit(){
    let {state, goBack} = this.props.navigation;
    let {transactionQuery, updateQuery} = state.params;
    let {multiple, date} = this.state;
    state.params.updateParentState({childState: STATE}); // updating Transactions state
    let copyQuery = transactionQuery;
    let selectedDate = date.filter(date => date.checked);
    copyQuery['accounts'] = multiple;
    copyQuery['dateFilter'] = filterDate(selectedDate);
    setTimeout(() => updateQuery(copyQuery)); // calling UpdateQuery from Transactions
    goBack();
  }


  handleMultipleChange(selected, indexBank){
    let { multiple , bankList } = this.state;
    let check = multiple.find(bankId => bankId === selected);
    let index = multiple.indexOf(check);
    if(!check){
      this.setState({multiple: [...multiple, selected]});
      bankList[indexBank].check = true;
      this.setState({
        bankList,
      }, () => STATE = this.state);
    }else{
      multiple.splice(index, 1);
      this.setState({multiple});
      bankList[indexBank].check = false;
      this.setState({
        bankList,
      }, () => STATE = this.state);
    }
  }


  renderList() {
    let list = [];
    for(let i = 0; i < this.state.bankList.length; i++) {
      list.push(
        <TouchableOpacity onPress={this.handleMultipleChange.bind(this, this.state.bankList[i].id, i)} elevation={5}   key={i} style={TransactionSelStyles.checkBoxContainer} activeOpacity={0.8}>
          <View style={TransactionSelStyles.checkBoxCon}>
            <MKCheckbox style={TransactionSelStyles.checkBox} checked={this.state.bankList[i].check} disabled  />
          </View>
          <View style={TransactionSelStyles.checkBoxItemCon}>
            <Text style={TransactionSelStyles.checkBoxItem}>{this.state.bankList[i].name}</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return list;
  }


  findIndex(bankId){
    const {bankList} = this.state;
    let findBankId;
    findBankId = bankList.find(bank => bank.id === bankId);
    return bankList.indexOf(findBankId);
  }

  render(){

    const {multiple, date, bankList} = this.state;

    return(
      <ViewContainer>
        <View style={TransactionSelStyles.DbSelectionContainer}>
          <View style={TransactionSelStyles.DbSelectionAccAndWeek}>
            <View style={TransactionSelStyles.DbSelectionAccountsCon}>
              <Text style={TransactionSelStyles.DbSelectionText}>Accounts: &nbsp;</Text>
              {(multiple.length ? multiple.map((val, i) => {
                  let index = this.findIndex(val);
                  return(
                    <TouchableOpacity onPress={this.handleMultipleChange.bind(this, val, index)} key={i} style={TransactionSelStyles.DbSelectionCardTagCon} activeOpacity={0.8}>
                      <View style={[theme.cardStyle, TransactionSelStyles.DbSelectionCardTag]} elevation={5} >
                        <Text style={TransactionSelStyles.DbSelectionCardTagCross}>x</Text>
                        <Text style={[TransactionSelStyles.DbSelectionTag, TransactionSelStyles.DbSelectionText]}>{bankList[index].name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }) : <Text style={TransactionSelStyles.DbSelectionText}>All</Text>)
              }
            </View>
            <Text style={TransactionSelStyles.DbSelectionText}>{date.map((val, i, arr) => {
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
          <View style={TransactionSelStyles.DbSelectionBankAcc}>
            <TouchableOpacity style={TransactionSelStyles.DbSelectionBankAccBtn} onPress={() => this.refs.modal.open()} activeOpacity={0.7}>
              <Text style={[TransactionSelStyles.DbSelectionText, TransactionSelStyles.DbSelectionBankAccText]}>Bank Account</Text>
              <Icon size={20} style={TransactionSelStyles.DbSelectionBankAccIcon} name="down-arrow"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        <View style={TransactionSelStyles.DbSelectionTabContainer}>
          <TransactionSelectionTabScreen screenProps={[this.state.date, this.state.updateDates]} />
        </View>
        <Modal style={TransactionSelStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <ScrollView>
            <View style={TransactionSelStyles.renderListCon}>
              {this.renderList.bind(this)()}
            </View>
          </ScrollView>
        </Modal>
      </ViewContainer>
    );
  }

}



const TransactionSelectionTabScreen = TabNavigator({
  'DAY': {
    screen: TransactionSelectionTab
  },
  'WEEK': {
    screen: TransactionSelectionTab
  },
  'MONTH': {
    screen: TransactionSelectionTab
  },
  'CUSTOM': {
    screen: TransactionSelectionTab
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