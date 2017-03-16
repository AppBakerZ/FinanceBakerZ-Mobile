import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';


export default class DashboardTabScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    console.log('props', props);

  }

  render() {
    console.log('props', this.props);
    return (
      <View style={DashboardStyles.tabScreenContainer}>
        <View style={DashboardStyles.childContainer}>
          <Text style={DashboardStyles.textHeading}>Your Incomes</Text>
          <Text style={DashboardStyles.greenText}>Rs. 4,30,000</Text>
        </View>
        <View style={DashboardStyles.childContainer}>
          <Text style={DashboardStyles.textHeading}>Your Expenses</Text>
          <Text style={DashboardStyles.redText}>Rs. 4,30,000</Text>
        </View>
      </View>
    );
  }
}
