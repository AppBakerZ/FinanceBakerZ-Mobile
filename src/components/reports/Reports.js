import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ListView} from 'react-native';
import { ReportsStyles } from 'FinanceBakerZ/src/components/reports/ReportsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import {I18n, capitalizeFirstLetter } from 'FinanceBakerZ/src/customLibrary';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Meteor, { createContainer } from 'react-native-meteor';

class Reports extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['1', '2', '3', '4', '5', '6', '7']),
            loading: true
        };
    }

    generatedReport() {
        let to = "12-05-2016", from = "12-06-2016";
        return(
            <TouchableOpacity style={ReportsStyles.historyReportedBtn}
                              activeOpacity={0.7}
                              onPress={() => console.warn('Clicked')}>
                <Text style={ReportsStyles.historyReportedDate}>{`${to} - ${from}`}</Text>
                <View style={ReportsStyles.historyReportedIcon}>
                    <MaterialIcons name="file-download" size={25} color="#000"/>
                </View>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <ViewContainer>
                <Image source = {require('FinanceBakerZ/src/images/app-background.png')} style={ReportsStyles.backgroundImage}>
                    <View style={ReportsStyles.filterContainer}>
                        <TouchableOpacity style={ReportsStyles.filterBtnContainer}
                                          disabled={this.state.loading}
                                          activeOpacity={0.7}
                                          onPress={() => console.warn('Clicked')}>
                            <View style={ReportsStyles.filterTextContainer}>
                                <Text style={ReportsStyles.filterText}>Apply Filters</Text>
                            </View>
                            <View style={ReportsStyles.filterIconContainer}>
                                <Icon name="filter" size={25} />
                            </View>
                        </TouchableOpacity>

                        <View style={ReportsStyles.generateBtnContainer}>
                            <TouchableOpacity style={[ReportsStyles.generateBtn, this.state.loading ? ReportsStyles.disabledBtn : ReportsStyles.activeBtn]}
                                              activeOpacity={0.7}
                                              onPress={() => this.setState({loading: false})}>
                                <Text style={ReportsStyles.generateBtnText}>Generate Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ReportsStyles.allReportHeader}>
                        <Text style={ReportsStyles.allReportHeaderText}>ALL REPORTS</Text>
                    </View>
                    <ScrollView style={ReportsStyles.generatedReportContainer}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.generatedReport.bind(this)}
                        />
                    </ScrollView>
                </Image>
            </ViewContainer>
        );
    }
}

Reports.propTypes = {
    user: PropTypes.object.isRequired
};

export default createContainer((props) => {
    const {params} = props.navigation.state;
    return {
        user: Meteor.user()
    };
}, Reports);