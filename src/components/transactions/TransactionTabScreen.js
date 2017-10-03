import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView } from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import {loggedUserCurrency, currencyStandardFormat, alterIconName, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';

export default class TransactionTabScreen extends  Component {

  constructor(props){
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    };
    this.renderRow = this.renderRow.bind(this);
  }


  renderRow(rowData){
    return(
        <TouchableOpacity style={TransactionsStyles.listViewContainer} activeOpacity={0.7} onPress={() => this.props.screenProps.navigate('ViewTransaction', {selectedTransaction: rowData})}>
          <View style={TransactionsStyles.listViewContentLeft}>
            <Icon name={rowData.category ? 'left-arrow' : 'right-arrow'} color={rowData.category ?  '#C81113' : '#008041'} style={TransactionsStyles.icons} />
            <Text style={TransactionsStyles.iconText}>
              {capitalizeFirstLetter(rowData.transactionAt ?
                  (rowData.type == "project" ?
                      (rowData.project && rowData.project.name || rowData.project) : rowData.type) :
                  (rowData.category ? rowData.category.name : rowData.category))}
            </Text>
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
    let {ds} = this.state;
    let {incomes, expenses, transactions, transactionsLoading} = this.props.screenProps;

    if(!transactionsLoading){
      if(incomes.length || expenses.length || transactions.length){
        return (
            <ViewContainer>
              <ListView
                  dataSource={ds.cloneWithRows(eval(state.routeName.toLowerCase()))}
                  renderRow={this.renderRow}
              />
              {state.routeName !== 'TRANSACTIONS' ?  <FabButton iconName="add"  iconColor="#fff" onPress={() => this.props.screenProps.navigate('UpdateTransaction', {routeName: state.routeName.toUpperCase()})} /> : <View></View> }
            </ViewContainer>
        );
      }else{
        return <ViewContainer>
          {state.routeName !== 'TRANSACTIONS' ?  <FabButton iconName="add"  iconColor="#fff" onPress={() => this.props.screenProps.navigate('UpdateTransaction', {routeName: state.routeName.toUpperCase()})} /> : <View></View> }
        </ViewContainer>
      }
    }else{
      return <View style={TransactionsStyles.loadingCon}><Loader size={35} color="#008142" /></View>
    }
  }
}
