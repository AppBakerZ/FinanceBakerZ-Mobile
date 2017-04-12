import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView} from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import {loggedUserCurrency, currencyStandardFormat, alterIconName, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import Meteor, {createContainer, MeteorComplexListView} from 'react-native-meteor';



class TransactionSelection extends  Component {

  renderRow(todo) {
    return (
      <Text>{todo.amount}</Text>
    );
  }


    render(){
    console.log(Meteor)
      const { incomesReady } = this.props;
      return(
        <View style={{flex: 1}}>
          {!incomesReady && <Text>Not ready</Text>}
          <MeteorComplexListView
            elements={()=>{return Meteor.collection('incomes').find({}).reverse()}}
            renderRow={this.renderRow}
          />
        </View>
      );
    }

}

export default createContainer(() => {

  const handle = Meteor.subscribe('incomes', 5);

  return {
    incomesReady: handle.ready(),
  }

}, TransactionSelection);