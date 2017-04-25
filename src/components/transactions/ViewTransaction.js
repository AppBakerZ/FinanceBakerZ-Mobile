import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import {currencyStandardFormat, loggedUserCurrency, alterIconName} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';


export default class ViewTransaction extends Component {

  constructor(props){
    super(props);
  }

  render(){

    let {selectedProject} = this.props.navigation.state.params;

    return(
      <ViewContainer>
        <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={TransactionsStyles.backgroundImage}>
          <View style={TransactionsStyles.viewTransactionMainCon}>
            <View style={[TransactionsStyles.viewTransactionIdAndDateCon, TransactionsStyles.borderBottom]}>
              <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{selectedProject.receivedAt ? "Income" : "Expense"} ID : {selectedProject._id}</Text>
              <Text style={[TransactionsStyles.text]}>Date: {moment(selectedProject.receivedAt || selectedProject.spentAt).format('DD-MMMM-YYYY')}</Text>
            </View>
            <View style={[TransactionsStyles.viewTransactionBankDepositCon, TransactionsStyles.borderBottom]}>
              <Text style={[TransactionsStyles.textBold, selectedProject.category ? TransactionsStyles.redText : TransactionsStyles.greenText]}>
                {selectedProject.receivedAt ?
                  (selectedProject.type == "project" ?
                    (selectedProject.project && selectedProject.project.name.toUpperCase() || selectedProject.project.toUpperCase()) : selectedProject.type) :
                  (selectedProject.category.name.toUpperCase() || selectedProject.category.toUpperCase())}
              </Text>
            </View>
            <View style={[TransactionsStyles.viewTransactionDepositedInCon, TransactionsStyles.borderBottom]}>
              <Text style={[TransactionsStyles.text]}>Deposited in: Standard Chartered</Text>
              <Text style={[TransactionsStyles.text]}>Account Number: 090078601</Text>
              <View style={TransactionsStyles.currencyIconCon}>
                <Text style={[TransactionsStyles.text]}>Amount: </Text>
                <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={20} />
                <Text style={[TransactionsStyles.textBold, selectedProject.category ? TransactionsStyles.redText : TransactionsStyles.greenText]}> {currencyStandardFormat(selectedProject.amount)}</Text>
              </View>
            </View>
            <View style={TransactionsStyles.viewTransactionUserInfoCon}>
              <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>Sender Name: AB De Villiers</Text>
              <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>Sender Bank: Habib Bank</Text>
              <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>Account Number: 09007801</Text>
              <Text style={[TransactionsStyles.text]}>Project:
                <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}> Logo Design</Text>
              </Text>
            </View>
          </View>
          <FabButton iconName="edit" style={TransactionsStyles.fabButton} iconColor="#fff" />
        </Image>
      </ViewContainer>
    );
  }
}