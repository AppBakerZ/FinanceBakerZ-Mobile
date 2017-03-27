import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { DashboardSelStyles } from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelStyles';
import { MKRadioButton } from 'react-native-material-kit';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';



export default class DashboardSelectionTab extends Component {
  constructor(props) {
    super(props);
    this.radioGroup = new MKRadioButton.Group();
    this.state = {
      date : []
    }
  }

  render() {

    const {state} = this.props.navigation;

    const Day = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        <View style={DashboardSelStyles.tabItemCon}>
          <MKRadioButton style={DashboardSelStyles.radioButton} group={this.radioGroup}/>
          <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>Yesterday ({moment().subtract(1, 'day').format('MMM DD')})</Text>
        </View>
        <View style={DashboardSelStyles.tabItemCon}>
          <MKRadioButton style={DashboardSelStyles.radioButton} group={this.radioGroup}/>
          <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>Today ({moment().format('MMM DD')})</Text>
        </View>
      </ViewContainer>
    );

    const Week = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        <View style={DashboardSelStyles.tabItemCon}>
          <MKRadioButton style={DashboardSelStyles.radioButton} group={this.radioGroup}/>
          <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>Last 7 Days ({moment().subtract(7, 'day').format('MMM DD')} - {moment().subtract(1, 'day').format('MMM DD')})</Text>
        </View>
        <View style={DashboardSelStyles.tabItemCon}>
          <MKRadioButton style={DashboardSelStyles.radioButton} group={this.radioGroup}/>
          <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>This Week ({moment().format('MMM DD')} - {moment().add(6, 'day').format('MMM DD')})</Text>
        </View>
      </ViewContainer>
    );

    const Month = () => (
      <Text>Month</Text>
    );

    const Custom = () => (
      <Text>Custom</Text>
    );


    switch (state.routeName){
      case 'DAY': return <Day />;
      case 'WEEK': return <Week />;
      case 'MONTH': return <Month />;
      case 'CUSTOM': return <Custom />;
    }
  }
}
