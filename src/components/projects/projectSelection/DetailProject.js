import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import Meteor from 'react-native-meteor';
import {formatDate, showAlert} from 'FinanceBakerZ/src/customLibrary';
import {capitalizeFirstLetter, currencyStandardFormat, I18n} from 'FinanceBakerZ/src/customLibrary';

export default class DetailProject extends  Component {
    constructor(props){
        super(props);
        this.state = {amountPaid: ''};
        this.submit = this.submit.bind(this);
    }

    getPaidAmountOfProject(_id){
        Meteor.call('statistics.incomesGroupByProject', {
            project: {
                _id: _id
            }
        }, (err, project) => {
            if (!err) {
                this.setState({
                    amountPaid: project.total
                });
            }
        });
    }
    componentWillMount(){
        let project = this.props.navigation.state.params;
        this.getPaidAmountOfProject(project.detail._id);
    }

    submit(){
        let project = this.props.navigation.state.params;
        let _id, name;
        _id = project.detail._id;
        name = project.detail.name.toUpperCase();
        this.removeProject(_id, name);
    }

    componentDidMount() {
        this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
    }


    deleteProject(_id, name){

        let {goBack} = this.props.navigation;
        Meteor.call('projects.remove', {
            project: {
                _id
            }
        }, (err, response) => {
            if(response){
                showAlert('Success', name + ' project has been deleted.');
                goBack();
            }else{
                showAlert('Error', err.reason);
            }
        });
    }

    removeProject(_id, name) {
        showAlert(I18n('PROJECTS_BANK_PROJECTS'),
            I18n('PROJECTS_INFORM_MESSAGE') + '\n' + I18n('PROJECTS_CONFIRMATION_MESSAGE'),
            [
                {text: I18n('PROJECTS_BACK_BUTTON')},
                {text: I18n('PROJECTS_REMOVE_BUTTON'), onPress: () => this.deleteProject(_id, name), style: 'cancel'}
            ]
        );
    }

    render(){

        let project = this.props.navigation.state.params;

        return(
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={ProjectsStyles.backgroundImage}>

                    <View style={ProjectsStyles.projectDetailMain}>
                        <View style={ProjectsStyles.projectDateContainer}>
                            <Text style={[ProjectsStyles.projectDate]}>{I18n('PROJECTS_START_DATE')} : {project.detail.startAt ? formatDate({type: 'getCustomDate', date: project.detail.startAt, format: 'MMMM DD, YYYY'}) : 'Select Date'}</Text>
                            <Text style={ProjectsStyles.projectId}>Project ID : {project.detail._id}</Text>
                        </View>
                        <View style={ProjectsStyles.projectName}>
                            <Text  style={ProjectsStyles.projectText}>
                                {project.detail.name.toUpperCase()}
                            </Text>
                        </View>
                        <View style={ProjectsStyles.projectDetail}>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_DESCRIPTION')}</Text> {project.detail.description}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_CLIENT')}</Text> {capitalizeFirstLetter(Object.keys(project.detail.client).length ? project.detail.client.name : '-')}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_AMOUNT_AGREED')}</Text> {project.detail.amount}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_AMOUNT_PAID')}</Text> {this.state.amountPaid || 0}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_AMOUNT_REMAINING')}</Text> {project.detail.amount - this.state.amountPaid || project.detail.amount}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>{I18n('PROJECTS_PROJECT_STATUS')}</Text> {capitalizeFirstLetter(project.detail.status)}</Text>
                        </View>
                    </View>
                    <View style={ProjectsStyles.projectFebIcon}>
                        <FabButton iconName="edit" style={ProjectsStyles.fabButton} onPress={() => this.props.navigation.navigate('UpdateProject',{projectDetails:project, statuses: project.statuses, types:project.types,  name : project.detail.name})} iconColor="#fff" />
                    </View>
                </Image>
            </ViewContainer>
        );
    }
}