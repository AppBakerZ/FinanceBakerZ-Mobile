import React, { Component } from 'react';
import { View, Text, Image, Icon,ScrollView } from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Meteor, { createContainer } from 'react-native-meteor';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

class Accounts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    accounts(){

        return this.props.accounts.map((accountData, i) => {
            let icon_name = accountData.bank.replace('bank-' , "");
            return(
                <View style={[theme.cardStyle, AccountsStyles.card]} >

                    <View style={AccountsStyles.imgBox}>
                        <BankIcon name ={icon_name} size={50} />
                    </View>
                    <View style={AccountsStyles.detailBox}>
                        <Text style={AccountsStyles.icons}>{icon_name}</Text>
                        <Text style={AccountsStyles.accNo}>{accountData.number}</Text>
                        <Text style={AccountsStyles.amount}>43,900</Text>
                    </View>
                </View>
            )
        })
    }
    render() {
        const { navigate } = this.props.navigation;

                return (
                        <ViewContainer>
                            <ScrollView style={AccountsStyles.scroll}>
                            {
                              this.accounts()
                            }
                            </ScrollView>
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
