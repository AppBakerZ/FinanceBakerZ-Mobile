import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import {currencyStandardFormat, loggedUserCurrency, alterIconName, showAlert} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import Meteor from 'react-native-meteor';

export default class ViewTransaction extends Component {

    constructor(props){
        super(props);
        this.submit = this.submit.bind(this);
    }


    getTransactionToDelete(type, _id){
        return type === 'income' ? {income: {_id}} : {expense: {_id}};
    }

    deleteProject(_id, name, type){

        let {goBack} = this.props.navigation;
        let removeIncomeOrExpense = type === 'income' ? 'incomes.remove' : 'expenses.remove';

        Meteor.call(removeIncomeOrExpense, this.getTransactionToDelete(type, _id), (err, response) => {
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
            (selectedTransaction.receivedAt ?
                (selectedTransaction.type == "project" ?
                    (selectedTransaction.project && selectedTransaction.project.name || selectedTransaction.project) : selectedTransaction.type) :
                (selectedTransaction.category.name || selectedTransaction.category)).toUpperCase(), selectedTransaction.category ? 'expense' : 'income')
    }

    componentDidMount() {
        this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
    }

    render(){

        let {selectedTransaction} = this.props.navigation.state.params;
        let {navigate} = this.props.navigation;

        return(
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={TransactionsStyles.backgroundImage}>
                    <View style={TransactionsStyles.viewTransactionMainCon}>
                        <View style={[TransactionsStyles.viewTransactionIdAndDateCon, TransactionsStyles.borderBottom]}>
                            <Text style={[TransactionsStyles.text, TransactionsStyles.paddingBottom]}>{selectedTransaction.receivedAt ? "Income" : "Expense"} ID : {selectedTransaction._id}</Text>
                            <Text style={[TransactionsStyles.text]}>Date: {moment(selectedTransaction.receivedAt || selectedTransaction.spentAt).format('DD-MMMM-YYYY')}</Text>
                        </View>
                        <View style={[TransactionsStyles.viewTransactionBankDepositCon, TransactionsStyles.borderBottom]}>
                            <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}>
                                {(selectedTransaction.receivedAt ?
                                    (selectedTransaction.type == "project" ?
                                        (selectedTransaction.project && selectedTransaction.project.name || selectedTransaction.project) : selectedTransaction.type) :
                                    (selectedTransaction.category.name || selectedTransaction.category)).toUpperCase()}
                            </Text>
                        </View>
                        <View style={[TransactionsStyles.viewTransactionDepositedInCon, TransactionsStyles.borderBottom]}>
                            <Text style={[TransactionsStyles.text]}>Deposited in: Standard Chartered</Text>
                            <Text style={[TransactionsStyles.text]}>Account Number: 090078601</Text>
                            <View style={TransactionsStyles.currencyIconCon}>
                                <Text style={[TransactionsStyles.text]}>Amount: </Text>
                                <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={20} />
                                <Text style={[TransactionsStyles.textBold, TransactionsStyles.greenText]}> {currencyStandardFormat(selectedTransaction.amount)}</Text>
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
                    <FabButton iconName="edit" style={TransactionsStyles.fabButton} iconColor="#fff" onPress={() => navigate('UpdateTransaction', {selectedTransaction})} />
                </Image>
            </ViewContainer>
        );
    }
}
