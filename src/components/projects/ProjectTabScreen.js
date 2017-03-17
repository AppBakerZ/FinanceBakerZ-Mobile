import React, { Component } from 'react';
import { View, Text, ListView} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

export default class ProjectTabScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let arr = [];
    for(let i = 1; i <= 500; i++){
      arr.push('Row ' + i);
    }

    this.state = {
      dataSource: ds.cloneWithRows(arr),
    };

  }

  renderRow(rowData){
    return(
      <View style={ProjectsStyles.listViewContainer}>
        <View style={ProjectsStyles.listViewContentLeft}>
          <Icon name='checked' color={'red'} style={ProjectsStyles.icons}></Icon>
          <Text style={ProjectsStyles.iconText}>{rowData}</Text>
        </View>
        <View style={ProjectsStyles.listViewContentRight}>
          <Text style={ProjectsStyles.contentRightText}>Rs. 50,000</Text>
        </View>
      </View>
    );
  }


  render() {
    console.log('props', this.props);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
      />
    );
  }
}
