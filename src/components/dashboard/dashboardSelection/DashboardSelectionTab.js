import React, { Component } from 'react';
import { View, Text, DatePickerAndroid, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { DashboardSelStyles } from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelStyles';
import { MKRadioButton } from 'react-native-material-kit';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';


export default class DashboardSelectionTab extends Component {
  constructor(props) {
    super(props);
    this.radioGroup = new MKRadioButton.Group();
    this.state = {
      date : props.screenProps[0],
      customDateTo: new Date(),
      customDateFrom: new Date(),
    };
  }

  // For Android
  showPicker = async (stateKey, options, index) => {
    try {
      let newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey] = 'dismissed';
      } else {
        let date = new Date(year, month, day);
        newState[stateKey] = date;
        this.selectCheckBox(index, '('+moment(date).format('MMM DD')+')');
        this.setState(newState);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };


  selectCheckBox(index, text){
    let date = this.state.date;
    let m = /\((.*)\)/i;
    date.map((val, i, arr) => {
      index == i ? arr[i].checked = true : arr[i].checked = false;
    });
    date[index].selectedDate = text.match(m)[1];
    this.props.screenProps[1](date);
    this.setState(this.state);
  }



  render() {

    const {state} = this.props.navigation;

    getData = (text, index) => {
      if(state.routeName != 'CUSTOM'){
        return(
          <TouchableOpacity style={DashboardSelStyles.tabItemCon} onPress={this.selectCheckBox.bind(this, index, text )} activeOpacity={0.75}>
            <MKRadioButton style={DashboardSelStyles.radioButton}   checked={this.state.date[index].checked} group={this.radioGroup}/>
            <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>{text}</Text>
          </TouchableOpacity>
        );
      }else{
        return(
          <ViewContainer style={DashboardSelStyles.tabContainerCustom}>
            <TouchableWithoutFeedback>
              <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateTo', {date: this.state.customDateTo, mode: 'calendar'}, index)}>
                <Text style={DashboardSelStyles.text}>TO</Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateFrom', {date: this.state.customDateFrom, mode: 'calendar'}, index+1)}>
                <Text style={DashboardSelStyles.text} >FROM</Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          </ViewContainer>
        );
      }
    };

    const Day = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Yesterday (' + moment().subtract(1, 'day').format('MMM DD') + ')', 0)}
        {getData('Today (' + moment().format('MMM DD') + ')', 1)}
      </ViewContainer>
    );

    const Week = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Last 7 Days (' + moment().subtract(7, 'day').format('MMM DD') + ' - ' + moment().subtract(1, 'day').format('MMM DD') + ')', 2)}
        {getData('This Week (' + moment().format('MMM DD') + ' - ' + moment().add(6, 'day').format('MMM DD') + ')', 3)}
      </ViewContainer>
    );

    const Month = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Last Month ' + '(' + moment().subtract(1, 'month').format('MMMM') + ')', 4)}
        {getData('This Month ' + '(' + moment().format('MMMM') + ')', 5)}
      </ViewContainer>
    );

    const Custom = () => (
      <ViewContainer>
        {getData('CUSTOM', 6)}
      </ViewContainer>
    );

    switch (state.routeName){
      case 'DAY': return <Day />;
      case 'WEEK': return <Week />;
      case 'MONTH': return <Month />;
      case 'CUSTOM': return <Custom />;
    }
  }
}
