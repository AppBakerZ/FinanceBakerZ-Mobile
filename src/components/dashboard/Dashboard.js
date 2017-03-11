import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Text>Dashboard</Text>
            </ViewContainer>
        );
    }
}