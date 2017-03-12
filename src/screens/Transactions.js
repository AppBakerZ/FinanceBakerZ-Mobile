import React, { Component } from 'react';
import Transactions from 'FinanceBakerZ/src/components/transactions/Transactions'

export default class TransactionsScreen extends Component {
    render() {
        return (
            <Transactions {...this.props} />
        );
    }
}