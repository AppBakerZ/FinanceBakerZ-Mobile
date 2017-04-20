import React, { Component, PropTypes } from 'react';
import { View, Text,TouchableOpacity,ListView, Image} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import {loggedUserCurrency, alterIconName, currencyStandardFormat, formatDate} from 'FinanceBakerZ/src/customLibrary';
import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';
import Modal from 'react-native-modalbox';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';



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
    query.set('query', {
      limit: 20
    });
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
    updatedQuery = updatedQuery ? updatedQuery : {limit: 20};
    query.set('query', updatedQuery);
  }

  findStatusLabel(status){
    return status ? this.statuses.find(x => x.value == status)['label'] : 'All';
  }

  openDetailModal(projectDetails){
    this.setState({projectDetails, modalVisible: true});
    this.refs.modal.open();
  }

  renderProjectDetail(){
    let {projectDetails} = this.state;
    projectDetails  = projectDetails ? projectDetails  : '';
    if(projectDetails){
      let { name, status, client, startAt, amount } = projectDetails;
      return(
        <View style={ProjectsStyles.projectDetailCon}>
          <Text style={[ProjectsStyles.textBold, ProjectsStyles.headingModal]}>{name.toUpperCase()}</Text>
          <Text style={ProjectsStyles.projectDetailText}>Client Name: {client.name}</Text>
          <View style={ProjectsStyles.projectDetailAmount}>
            <Text style={ProjectsStyles.projectDetailText}>Amount: </Text>
            {loggedUserCurrency() ? <CurrencyIcon name={alterIconName(loggedUserCurrency())} size={18}/> : <Text></Text>}
            <Text style={ProjectsStyles.projectDetailText}> {currencyStandardFormat(amount)}</Text>
          </View>
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
          {!modalVisible ? <FabButton iconName="add" iconColor="#fff" onPress={() => navigate('CreateProject', {statuses: this.statuses, findStatusLabel: this.findStatusLabel})} /> : <View></View>}
          <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})} position={"bottom"} ref={"modal"} swipeArea={20}>
            <View style={ProjectsStyles.renderDetailCon}>
              {this.renderProjectDetail()}
            </View>
          </Modal>
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