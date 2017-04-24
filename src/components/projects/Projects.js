import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity, ListView, Image, Alert} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import {loggedUserCurrency, alterIconName, currencyStandardFormat, formatDate} from 'FinanceBakerZ/src/customLibrary';
import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import Modal from 'react-native-modalbox';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import {showAlert} from 'FinanceBakerZ/src/customLibrary';


let query = new ReactiveDict('projectsDict');

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
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
    setTimeout(() => query.set('query', {limit: 20 }));
    this.findStatusLabel = this.findStatusLabel.bind(this);
  }

  renderRow(rowData){
    return(
      <TouchableOpacity style={ProjectsStyles.listViewContainerItem} activeOpacity={0.75} onPress={this.openDetailModal.bind(this, rowData)}>
        <View style={ProjectsStyles.listViewContentLeft}>
          <Icon name='checked' style={ProjectsStyles.icons} color={this.getIconColor(rowData.status)}/>
          <Text style={ProjectsStyles.contentRightText}>{rowData.name}</Text>
          <View style={ProjectsStyles.AmountContainer}>
            <View>
              {loggedUserCurrency() ? <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={18}/> : <Text></Text>}
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

  openDetailModal(projectDetails){
    this.setState({projectDetails, modalVisible: true});
    this.refs.modal.open();
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

  deleteProject(_id, name){
    Meteor.call('projects.remove', {
      project: {
        _id
      }
    }, (err, response) => {
      if(response){
        showAlert('Success', name + ' project has been deleted.');
        this.refs.modal.close();
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


  renderProjectDetail(){
    let {projectDetails} = this.state;
    projectDetails  = projectDetails ? projectDetails  : '';
    if(projectDetails){
      let { _id, name, status, client, startAt, amount } = projectDetails;
      this.getPaidAmountOfProject(_id);
      return(
        <View style={ProjectsStyles.projectDetailCon}>
          <View style={ProjectsStyles.projectTitleAndBtn}>
            <View style={ProjectsStyles.projectDetailButtons}>
              <Text style={[ProjectsStyles.textBold, ProjectsStyles.headingModal]}>{name.toUpperCase()}</Text>
            </View>
            <View style={ProjectsStyles.projectDetailTitle}>
              <Icon name="edit" style={ProjectsStyles.editBtn} size={28} onPress={() => {this.refs.modal.close(); this.props.navigation.navigate('UpdateProject', {statuses: this.statuses, projectDetails})}} />
              <FontAwesomeIcon name="trash" style={ProjectsStyles.deleteBtn} size={28} onPress={() => this.removeProject(_id, name)} />
            </View>
          </View>
          <Text style={ProjectsStyles.projectDetailText}>Client Name: {client.name}</Text>
          <View style={ProjectsStyles.projectDetailAmount}>
            <Text style={ProjectsStyles.projectDetailText}>Amount Agreed: </Text>
            {loggedUserCurrency() ? <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={18}/> : <Text></Text>}
            <Text style={ProjectsStyles.projectDetailText}> {currencyStandardFormat(amount)}</Text>
          </View>
          <Text style={ProjectsStyles.projectDetailText}>Amount Paid: {this.state.amountPaid || 0}</Text>
          <Text style={ProjectsStyles.projectDetailText}>Amount Remaining: {amount - this.state.amountPaid || amount}</Text>
          <Text style={ProjectsStyles.projectDetailText}>Project Status: {this.findStatusLabel(status)}</Text>
          <Text style={ProjectsStyles.projectDetailText}>Started At: {formatDate({type: 'getCustomDate', date: startAt, format: 'MMMM DD, YYYY'})}</Text>
        </View>
      );
    }
  }

  render() {

    const {navigate} = this.props.navigation;
    let {ds, updateProjectState, getUpdatedQuery, name, status, client, updatedQuerySet, modalVisible} = this.state;
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
                  <Text style={ProjectsStyles.BankText}>Project Name: {name}</Text>
                  <Text style={ProjectsStyles.BankText}>Client Name: {client}</Text>
                  <Text style={ProjectsStyles.BankText}>Status: {this.findStatusLabel(status)}</Text>
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
              /> : <View style={ProjectsStyles.errorMsg}><Text style={ProjectsStyles.BankText}>YOU DO NOT HAVE ANY PROJECTS</Text></View>}
          </View>
          <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})} position={"bottom"} ref={"modal"} swipeArea={20}>
            <View style={ProjectsStyles.renderDetailCon}>
              {this.renderProjectDetail()}
            </View>
          </Modal>
          {!modalVisible ? <FabButton iconName="add" iconColor="#fff" onPress={() => navigate('CreateProject', {statuses: this.statuses, findStatusLabel: this.findStatusLabel})} /> : <View></View>}
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