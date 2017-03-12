import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { SettingsStyles } from 'FinanceBakerZ/src/components/settings/SettingsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Text>Settings</Text>
            </ViewContainer>
        );
    }
}