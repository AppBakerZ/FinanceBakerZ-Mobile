import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ListView} from 'react-native';
import { ReportSelectionStyle } from 'FinanceBakerZ/src/components/reports/reportSelection/ReportSelectionStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import {I18n, capitalizeFirstLetter } from 'FinanceBakerZ/src/customLibrary';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Meteor, { createContainer } from 'react-native-meteor';

export default class ReportSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {

        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={ReportSelectionStyle.backgroundImage}>
                    <View>
                        <Text>Report Selection</Text>
                    </View>
                </Image>
            </ViewContainer>
        );
    }
}