import React, { Component } from 'react';
import { View, Text, Image, Icon } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

import Meteor, { createContainer } from 'react-native-meteor';
//import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';


import { getTheme } from 'react-native-material-kit';
const theme = getTheme();

class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log(this.props, 'START ACCOUNT');
        console.log('*********************');

                return (
                        <ViewContainer>
                            { this.props.accounts.map((accountData, i) => {
                                console.log(accountData, '------------------------');

                                let icon_name = accountData.bank.replace('bank-' , "");

                            return(
                            <View style={[theme.cardStyle, AccountsStyles.card]} elevation={5}>

                                <View style={AccountsStyles.imgBox}>
                                    <BankIcon name ={icon_name} size={80} />
                                </View>
                                <View style={AccountsStyles.detailBox}>
                                    <Text style={AccountsStyles.bankName}>{icon_name}</Text>
                                    <Text style={AccountsStyles.accNo}>{accountData.number}</Text>
                                    <Text style={AccountsStyles.amount}>43,900</Text>
                                    <Text style={AccountsStyles.amount}>{accountData.country}</Text>
                                </View>
                            </View> )

                            })
                            }
                        </ViewContainer>


                );
    }
}

export default createContainer(() => {
    const accountHandler = Meteor.subscribe('accounts');

    return {
        accountsReady: accountHandler.ready(),
        accounts: Meteor.collection('accounts').find({})
    };
}, Accounts);
