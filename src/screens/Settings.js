import React, { Component } from 'react';
import Settings from 'FinanceBakerZ/src/components/settings/Settings'

export default class SettingsScreen extends Component {
    render() {
        return (
            <Settings {...this.props} />
        );
    }
}