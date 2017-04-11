import React, { Component } from 'react';
import { View, Text,TouchableOpacity,ListView} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import { TabNavigator } from 'react-navigation';
import Meteor, { createContainer } from 'react-native-meteor';

class Projects extends Component {
  constructor(props) {
    super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

      let arr = [];
      for(let i = 1; i <= 25; i++){
          arr.push('Logo Design & Branding' + i);
      }

      this.state = {
          dataSource: ds.cloneWithRows(arr),
      };
      console.log(this.props,'props');
  }

    renderRow(rowData){
        return(

            <View style={ProjectsStyles.listViewContaineritem}>
              <View style={ProjectsStyles.listViewContentLeft}>
                <Icon name='checked' color={'red'} style={ProjectsStyles.icons}></Icon>
                <Text style={ProjectsStyles.iconText}>{rowData}</Text>
                <Text style={ProjectsStyles.contentRightText}>Rs. 80,000</Text>
              </View>
            </View>
        );
    }

  render() {
    const { navigate } = this.props.navigation;
      console.log(this.props,'props');
    return (
      <ViewContainer >
        <TouchableOpacity style={ProjectsStyles.filterContainer}onPress={()=> {navigate('ProjectSelection')}}>
         <View  style={ProjectsStyles.filterDiv}>
            <View style={ProjectsStyles.filterText}>
              <Text  style={ProjectsStyles.BankText}>Accounts: DIB | HBL | UBL </Text>
              <Text  style={ProjectsStyles.BankText}>This Week : Mar 14 - Mar 20</Text>
            </View>
            <View style={ProjectsStyles.filterIcon}>
              <Icon name="filter" size={35} />
            </View>
        </View>
        </TouchableOpacity>
        <View style={ProjectsStyles.listViewContainer} >
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
          />
        </View>
      </ViewContainer>
    );
  }
}

export default createContainer(() => {
    return {
        projects: Meteor.collection('projects').find({
            query: {limit: 10}
        },)
    };
}, Projects);
