import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { AccountsStyles } from 'FinanceBakerZ/src/components/accounts/AccountsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

export default class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Text>Accounts</Text>
            </ViewContainer>
        );
    }
}