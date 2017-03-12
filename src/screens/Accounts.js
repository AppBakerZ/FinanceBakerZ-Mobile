import React, { Component } from 'react';
import Accounts from 'FinanceBakerZ/src/components/accounts/Accounts'

export default class AccountsScreen extends Component {
    render() {
        return (
            <Accounts {...this.props} />
        );
    }
}