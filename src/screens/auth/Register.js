import React, { Component } from 'react';
import Register from 'FinanceBakerZ/src/components/register/Register'

export default class RegisterScreen extends Component {
    render() {
        return (
            <Register {...this.props} />
        );
    }
}

