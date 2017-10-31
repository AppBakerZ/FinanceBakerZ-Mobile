import React, { Component } from 'react';
import Reports from 'FinanceBakerZ/src/components/reports/Reports'

export default class ReportsScreen extends Component {
    render() {
        return (
            <Reports {...this.props} />
        );
    }
}