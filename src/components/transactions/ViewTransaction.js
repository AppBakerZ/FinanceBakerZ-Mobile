import React, { Component } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import {I18n,currencyStandardFormat, loggedUserCurrency, alterIconName, showAlert} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import Meteor from 'react-native-meteor';

export default class ViewTransaction extends Component {

    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }


    getTransactionToDelete(type, _id){
        return {transaction: {_id}};
    }

    deleteProject(_id, name, type){
        let transaction = {transaction: {_id}};
        let {goBack} = this.props.navigation;

        Meteor.call('transactions.remove', transaction, (err, response) => {
            if(response){
                showAlert('Success', name + ' has been deleted.');
                goBack();
            }else{
                console.log(err.reason)
            }
        });
    }


    removeProject(_id, name, type) {
        showAlert(name,
            'This will delete your all data \nAre you sure to remove the project?',
            [
                {text: 'Go Back'},
                {text: 'Yes, Remove', onPress: () => this.deleteProject(_id, name, type), style: 'cancel'},
            ]
        );
    }

    submit(){
        let {selectedTransaction} = this.props.navigation.state.params;
        this.removeProject(selectedTransaction._id,
            (selectedTransaction.type === 'income' ? 'Income' : 'Expense'))
    }

    componentDidMount() {
        this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
    }

    alertBankName(bankName){
        return bankName ? bankName.split('-').slice(1).join(' ') : '';
    }

    render(){

        let {selectedTransaction} = this.props.navigation.state.params;
        let {navigate} = this.props.navigation;

        return(
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={TransactionsStyles.backgroundImage}>
                    <ScrollView>
                        <View style={TransactionsStyles.viewTransactionMainCon}>
                            <View style={[TransactionsStyles.viewTransactionIdAndDateCon, TransactionsStyles.borderBottom]}>
                                <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>Transaction ID : {selectedTransaction._id}</Text>
                                <Text style={[TransactionsStyles.text]}>Date: {moment(selectedTransaction.transactionAt).format('DD-MMM-YYYY')}</Text>
                            </View>
                            <View style={[TransactionsStyles.viewTransactionBankDepositCon, TransactionsStyles.borderBottom]}>
                                <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}>
                                    {selectedTransaction.type === 'income' ? 'INCOME' : 'EXPENSE'}
                                </Text>
                            </View>
                            <View style={[TransactionsStyles.viewTransactionDepositedInCon, TransactionsStyles.borderBottom]}>
                                <Text style={[TransactionsStyles.text]}>{I18n("TRANSACTIONS_DEPOSITED_BANK")} {this.alertBankName(selectedTransaction.account.bank)}</Text>
                                <Text style={[TransactionsStyles.text]}>{I18n("TRANSACTIONS_ACCOUNT_NUMBER")} {selectedTransaction.account.number}</Text>
                                <View style={TransactionsStyles.currencyIconCon}>
                                    <View style={TransactionsStyles.CurrencyViewContainer}>
                                        <Text style={[TransactionsStyles.text]}> {I18n("TRANSACTIONS_TRANSACTION_AMOUNT")}</Text>
                                        <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={18}/>
                                        <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}> {currencyStandardFormat(selectedTransaction.amount)}</Text>
                                    </View>
                                </View>
                                {selectedTransaction.description ?
                                    <Text style={[TransactionsStyles.text]}>{I18n("TRANSACTIONS_DESCRIPTION")}: {selectedTransaction.description}</Text>
                                    : null
                                }
                            </View>
                            <View style={[TransactionsStyles.viewTransactionUserInfoCon]}>
                                <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{I18n("TRANSACTIONS_SENDER_NAME")} AB De Villiers</Text>
                                <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{I18n("TRANSACTIONS_SENDER_BANK")} Habib Bank</Text>
                                <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{I18n("TRANSACTIONS_ACCOUNT_NUMBER")} 09007801</Text>
                                <Text style={[TransactionsStyles.text]}>{I18n("TRANSACTIONS_PROJECT")}
                                    <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}> Logo Design</Text>
                                </Text>
                            </View>
                            {selectedTransaction.type === 'expense' ?
                                <View style={[TransactionsStyles.viewTransactionUserInfoCon, TransactionsStyles.borderTop]}>
                                    <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{I18n("TRANSACTIONS_TRANSACTION_CATEGORY")} : {selectedTransaction.category.name}</Text>
                                </View>
                                : null
                            }
                        </View>
                    </ScrollView>
                    <FabButton iconName="edit" style={TransactionsStyles.fabButton} iconColor="#fff" onPress={() => navigate('UpdateTransaction', {selectedTransaction})} />
                </Image>
            </ViewContainer>
        );
    }
}
