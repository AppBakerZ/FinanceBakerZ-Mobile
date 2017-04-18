import React, { Component, PropTypes } from 'react';
import { View, Text,TouchableOpacity,ListView,Image} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { TabNavigator } from 'react-navigation';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import {loggedUserCurrency, alterIconName,currencyStandardFormat} from 'FinanceBakerZ/src/customLibrary';

import Meteor, { createContainer, ReactiveDict } from 'react-native-meteor';


  let query = new ReactiveDict();
  query.set('query', {
    limit: 20
  });


class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }
  renderRow(rowData){
    return(
      <View style={ProjectsStyles.listViewContainerItem}>
        <View style={ProjectsStyles.listViewContentLeft}>
          <Icon name='checked'style={ProjectsStyles.icons} color={this.getIconColor(rowData.status)}/>
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
      </View>
    );
  }
  getIconColor(status){
    switch (status){
      case 'progress' : return '#deb342';
      case 'waiting' : return '#ff7200';
      case 'completed' : return '#008000';
    }
  }
  render() {

    const {navigate} = this.props.navigation;
    let {ds} = this.state;
    let {projectsReady} = this.props;
    if (projectsReady) {
      return (
        <ViewContainer style={ProjectsStyles.projectMainContainer}>
          <TouchableOpacity style={ProjectsStyles.filterContainer} onPress={()=> {navigate('ProjectSelection')}}>
            <View style={ProjectsStyles.filterDiv}>
              <View style={ProjectsStyles.filterText}>
                <Text style={ProjectsStyles.BankText}>Accounts: DIB | HBL | UBL </Text>
                <Text style={ProjectsStyles.BankText}>This Week : Mar 14 - Mar 20</Text>
              </View>
              <View style={ProjectsStyles.filterIcon}>
                <Icon name="filter" size={35}/>
              </View>
            </View>
          </TouchableOpacity>
          <View style={ProjectsStyles.listViewContainer}>
            <ListView
              dataSource={ds.cloneWithRows(this.props.projects)}
              renderRow={this.renderRow.bind(this)}
            />
          </View>
        </ViewContainer>
      );
    }
    else{
      return <View style={ProjectsStyles.loader }><Loader size={35} color={'#008142'}/></View>
    }
  }
}



export default createContainer((props) => {


  const projectsHandle = Meteor.subscribe('projects', query.get());
  return {
    projectsReady: projectsHandle.ready(),
    projects: Meteor.collection('projects').find({})
  };
}, Projects);