import React, { Component } from 'react';
import { View, Text, ListView} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';


export default class DashboardTabBottomScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    let arr = [];
    for(let i = 1; i <= 100; i++){
      arr.push('Row ' + i);
    }

    this.state = {
      dataSource: ds.cloneWithRows(arr),
    };

  }

  renderRow(rowData){
      return(
        <View style={DashboardStyles.listViewContainer}>
          <View style={DashboardStyles.listViewContentLeft}>
            <Icon name='right-arrow' color={'green'} style={DashboardStyles.icons}></Icon>
            <Text style={DashboardStyles.iconText}>{rowData}</Text>
          </View>
          <View style={DashboardStyles.listViewContentRight}>
            <Text style={DashboardStyles.contentRightText}>Rs. 50,000</Text>
          </View>
        </View>
      );
  }


  render() {
    return (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
    );
  }
}
