import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, ListView, Image, Alert} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import {loggedUserCurrency, alterIconName, currencyStandardFormat, formatDate, I18n} from 'FinanceBakerZ/src/customLibrary';
import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import {showAlert} from 'FinanceBakerZ/src/customLibrary';


let query = new ReactiveDict('projectsDict');

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            updateProjectState: filter => {this.setState(filter)},
            getUpdatedQuery: query => {this.setState(query)}
        };
        this.statuses = [
            { label: 'All', value: '' },
            { label: 'In Progress', value: 'progress' },
            { label: 'Waiting for Feedback', value: 'waiting' },
            { label: 'Completed',  value: 'completed' }
        ];
        this.types = [
            { label: 'Fixed', value: 'fixed' },
            { label: 'Hourly', value: 'hourly' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' }
        ];

        setTimeout(() => query.set('query', {limit: 20 }));
        this.findStatusLabel = this.findStatusLabel.bind(this);
    }

    renderRow(rowData){
        return(
            <TouchableOpacity style={ProjectsStyles.listViewContainerItem} activeOpacity={0.75}  onPress={() => this.props.navigation.navigate('DetailProject',{detail:rowData, statuses : this.statuses, types: this.types})}>
              <View style={ProjectsStyles.listViewContentLeft}>
                <Icon name='checked' style={ProjectsStyles.icons} color={this.getIconColor(rowData.status)}/>
                <Text style={ProjectsStyles.contentRightText}>{rowData.name}</Text>
                <View style={ProjectsStyles.AmountContainer}>
                  <View>
                      {loggedUserCurrency() ? <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={18}/> : <Text/>}
                  </View>
                  <View style={ProjectsStyles.CurrencySymbol}>
                    <Text style={ProjectsStyles.iconText}>{currencyStandardFormat(rowData.amount)}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
        );
    }

    getIconColor(status){
        switch (status){
            case 'progress' : return '#deb342';
            case 'waiting' : return '#ff7200';
            case 'completed' : return '#008000';
        }
    }

    updateQuery(updatedQuery){
        setTimeout(() => query.set('query', updatedQuery));
    }

    findStatusLabel(status){
        return status ? this.statuses.find(x => x.value == status)['label'] : 'All';
    }


    render() {

        const {navigate} = this.props.navigation;
        let {ds, updateProjectState, getUpdatedQuery, name, status, client, updatedQuerySet } = this.state;
        name = name ? name : '';
        client = client ? client.name : '';
        status = status ? status: '';
        let filter = {name, client, status};
        let {projectsReady, projects} = this.props;
        if (projectsReady) {
            return (
                <ViewContainer style={ProjectsStyles.projectMainContainer}>
                  <Image source={require('FinanceBakerZ/src/images/filterBg.png')} style={ProjectsStyles.projectFilterBg}>
                    <TouchableOpacity style={ProjectsStyles.filterContainer}
                                      activeOpacity={0.75}
                                      onPress={()=> {navigate('ProjectSelection', {updateQuery: this.updateQuery, updateProjectState, filter, getUpdatedQuery, updatedQuerySet, statuses: this.statuses, findStatusLabel: this.findStatusLabel})}}>
                      <View style={ProjectsStyles.filterDiv}>
                        <View style={ProjectsStyles.filterText}>
                          <Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_PROJECT_NAME')}: {name}</Text>
                          <Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_CLIENT_NAME')}: {client}</Text>
                          <Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_STATUS')} {this.findStatusLabel(status)}</Text>
                        </View>
                        <View style={ProjectsStyles.filterIcon}>
                          <Icon name="filter" size={25}/>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Image>
                  <View style={ProjectsStyles.listViewContainer}>
                      {projects.length ? <ListView
                              dataSource={ds.cloneWithRows(projects)}
                              renderRow={this.renderRow.bind(this)}
                          /> : <View style={ProjectsStyles.errorMsg}><Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_NO_PROJECTS_ADDED')}</Text></View>}
                  </View>
                  <FabButton iconName="add" iconColor="#fff" onPress={() => navigate('CreateProject', {statuses: this.statuses, types: this.types, findStatusLabel: this.findStatusLabel})} />
                </ViewContainer>
            );
        }
        else{
            return <View style={ProjectsStyles.loader}><Loader size={35} color={'#008142'}/></View>
        }
    }
}

export default createContainer(() => {
    const projectsHandle = Meteor.subscribe('projects', query.get('query'));
    return {
        projectsReady: projectsHandle.ready(),
        projects: Meteor.collection('projects').find({})
    };
}, Projects);