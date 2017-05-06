import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import Meteor from 'react-native-meteor';
import {formatDate, showAlert} from 'FinanceBakerZ/src/customLibrary';
import {capitalizeFirstLetter, currencyStandardFormat} from 'FinanceBakerZ/src/customLibrary';

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
                console.warn(err.reason)
            }
        });
    }

    removeProject(_id, name) {
        showAlert('BANK PROJECT',
            'This will remove your all data \nAre you sure to remove your ' + name + ' project?',
            [
                {text: 'Go Back'},
                {text: 'Yes, Remove', onPress: () => this.deleteProject(_id, name), style: 'cancel'},
            ],
        );
    }

    render(){

        let project = this.props.navigation.state.params;

        return(
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={ProjectsStyles.backgroundImage}>

                    <View style={ProjectsStyles.projectDetailMain}>
                        <View style={ProjectsStyles.projectDateContainer}>
                            <Text style={[ProjectsStyles.projectDate,]}>Date : {project.detail.startAt ? formatDate({type: 'getCustomDate', date: project.detail.startAt, format: 'MMMM DD, YYYY'}) : 'Select Date'}</Text>
                            <Text style={ProjectsStyles.projectId}>Project ID : {project.detail._id}</Text>
                        </View>
                        <View style={ProjectsStyles.projectName}>
                            <Text  style={ProjectsStyles.projectText}>
                                {project.detail.name.toUpperCase()}
                            </Text>
                        </View>
                        <View style={ProjectsStyles.projectDetail}>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>Client Name</Text>: {capitalizeFirstLetter(project.detail.client.name)}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>Amount Agreed</Text>: {project.detail.amount}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>Amount Paid</Text>: {this.state.amountPaid || 0}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>Amount Remaining</Text>: {project.detail.amount - this.state.amountPaid || project.detail.amount}</Text>
                            <Text style={ProjectsStyles.detail}><Text style={ProjectsStyles.detailText}>Project Status</Text>: {capitalizeFirstLetter(project.detail.status)}</Text>
                        </View>
                    </View>
                    <View style={ProjectsStyles.projectFebIcon}>
                        <FabButton iconName="edit" style={ProjectsStyles.fabButton} onPress={() => this.props.navigation.navigate('UpdateProject',{projectDetails:project, statuses: project.statuses, name : project.detail.name})} iconColor="#fff" />
                    </View>
                </Image>
            </ViewContainer>
        );
    }
}