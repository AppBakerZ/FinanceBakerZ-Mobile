import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView} from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import {loggedUserCurrency, currencyStandardFormat, alterIconName, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';


export default class TransactionTabScreen extends  Component {

  constructor(props){
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      incomes: props.screenProps.incomes || [],
      expenses: props.screenProps.expenses || [],
      transactions: props.screenProps.transactions || []
    };
  }


  renderRow(rowData){
    return(
      <View style={TransactionsStyles.listViewContainer}>
        <View style={TransactionsStyles.listViewContentLeft}>
          <Icon name={rowData.category ? 'left-arrow' : 'right-arrow'} color={rowData.category ?  'red' : 'green'} style={TransactionsStyles.icons}></Icon>
          <Text style={TransactionsStyles.iconText}>{rowData.category ?  capitalizeFirstLetter(rowData.category.name) : capitalizeFirstLetter(rowData.type)}</Text>
        </View>
        <View style={TransactionsStyles.listViewContentRight}>
          <CurrencyIcon style={TransactionsStyles.contentCurrIcon} size={14} name={alterIconName(loggedUserCurrency())} />
          <Text style={TransactionsStyles.contentRightText}>{currencyStandardFormat(rowData.amount)}</Text>
        </View>
      </View>
    );
  }


  render(){
    const {state} = this.props.navigation;
    let {ds, incomes, expenses, transactions} = this.state;
    if(incomes.length || expenses.length || transactions.length){
      return (
        <ListView
          dataSource={ds.cloneWithRows(eval(state.routeName.toLowerCase()))}
          renderRow={this.renderRow.bind(this)}
        />
      );
    }else{
      return <View style={TransactionsStyles.loadingCon}><Loader size={35} color="#008142" /></View>
    }
  }

}