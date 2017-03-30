import React, { Component } from 'react';
import { Button, View, Text, DatePickerAndroid, TouchableWithoutFeedback, TouchableOpacity, DatePickerIOS, Platform } from 'react-native';
import { DashboardSelStyles } from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelStyles';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';


export default class DashboardSelectionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date : props.screenProps[0],
    };
    this.findDate = this.findDate.bind(this);
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
        // this.selectCheckBox(index, '('+moment(date).format('MMM DD')+')');
        this.selectCheckBox(index, date, stateKey);
        this.setState(newState);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  //For iOS
  onDateChange(name, index, date){
    this.setState({[name]: date});
    this.selectCheckBox(index, date, name);
  }

  findDate(objName){
    return this.state.date.find(x => x.hasOwnProperty(objName))[objName];
  }


  selectCheckBox(index, text, stateKey){
    let date = this.state.date;
    let m = /\((.*)\)/i;
    date.map((val, i, arr) => {
      index == i ? arr[i].checked = true : arr[i].checked = false;
    });
    date[index][stateKey] = text;
    if(stateKey.length){
      text = '(' + moment(text).format('MMM DD') + ')';
    }
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
            <Icon style={DashboardSelStyles.radioIcon} name={this.state.date[index].checked ? 'md-radio-button-on' : 'ios-radio-button-off'} size={25} color={this.state.date[index].checked ? '#008142' : '#dadada'} />
            <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>{text}</Text>
          </TouchableOpacity>
        );
      }else{
        if(Platform.OS === 'ios'){
          return(
            <ViewContainer style={DashboardSelStyles.tabContainerCustom}>
              <TouchableWithoutFeedback>
                <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateTo', {date: this.findDate('customDateTo'), mode: 'calendar'}, index)}>
                  <DatePickerIOS
                    date={this.findDate('customDateTo')}
                    mode="date"
                    onDateChange={this.onDateChange.bind(this, 'customDateTo', index)}
                  />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateFrom', {date: this.findDate('customDateFrom'), mode: 'calendar'}, index+1)}>
                  <DatePickerIOS
                    date={this.findDate('customDateFrom')}
                    mode="date"
                    onDateChange={this.onDateChange.bind(this, 'customDateFrom', index + 1)}
                  />
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </ViewContainer>
          );
        }else{
          return(
            <ViewContainer style={DashboardSelStyles.tabContainerCustom}>
              <TouchableWithoutFeedback>
                <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateTo', {date: this.findDate('customDateTo'), mode: 'calendar', maxDate: (() => {let d = new Date(); return d.setDate(d.getDate() - 1)})()}, index)}>
                  <Text style={DashboardSelStyles.text}>TO</Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <TouchableOpacity style={DashboardSelStyles.textCon} onPress={this.showPicker.bind(this, 'customDateFrom', {date: this.findDate('customDateFrom'), mode: 'calendar', maxDate: new Date()}, index+1)}>
                  <Text style={DashboardSelStyles.text} >FROM</Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </ViewContainer>
          );
        }
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
