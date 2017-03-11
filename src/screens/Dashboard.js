import React, { Component } from 'react';
import Dashboard from 'FinanceBakerZ/src/components/dashboard/Dashboard'

export default class DashboardScreen extends Component {
    render() {
        return (
            <Dashboard {...this.props} />
        );
    }
}