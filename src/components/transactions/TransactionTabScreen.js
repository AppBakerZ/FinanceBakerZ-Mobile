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
      <TouchableOpacity style={TransactionsStyles.listViewContainer} activeOpacity={0.7}>
        <View style={TransactionsStyles.listViewContentLeft}>
          <Icon name={rowData.category ? 'left-arrow' : 'right-arrow'} color={rowData.category ?  '#C81113' : '#008041'} style={TransactionsStyles.icons}></Icon>
          <Text style={TransactionsStyles.iconText}>{rowData.category ?  capitalizeFirstLetter(rowData.category.name) : capitalizeFirstLetter(rowData.type)}</Text>
        </View>
        <View style={TransactionsStyles.listViewContentRight}>
          <CurrencyIcon style={TransactionsStyles.contentCurrIcon} size={14} name={alterIconName(loggedUserCurrency())} />
          <Text style={TransactionsStyles.contentRightText}>{currencyStandardFormat(rowData.amount)}</Text>
        </View>
      </TouchableOpacity>
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
    }
  }

}