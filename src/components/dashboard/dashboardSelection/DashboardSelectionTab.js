import React, { Component } from 'react';
import { Button, View, Text, DatePickerAndroid, TouchableWithoutFeedback, TouchableOpacity, DatePickerIOS, Platform } from 'react-native';
import { DashboardSelStyles } from 'FinanceBakerZ/src/components/dashboard/dashboardSelection/DashboardSelStyles';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import {formatDate} from 'FinanceBakerZ/src/customLibrary';
import Modal from 'react-native-modalbox';



export default class DashboardSelectionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date : props.screenProps[0],
      modalVisible: false
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
        this.selectCheckBox(index, date, stateKey);
        this.setState(newState);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  //For iOS
  onDateChange(date){
    this.setState({[this.state.iosRange]: date});
    this.selectCheckBox(this.state.iosIndex, date, this.state.iosRange);
  }

  findDate(objName){
    return this.state.date.find(x => x.hasOwnProperty(objName))[objName];
  }


  selectCheckBox(index, text, stateKey){
    let date = this.state.date;
    let m = /\((.*)\)/i;
    date.forEach((val, i, arr) => {
      index == i ? arr[i].checked = true : arr[i].checked = false;
      if(stateKey == 'customDateFrom' || stateKey == 'customDateTo' && val.selected == 'Custom'){
        (index == arr.length - 1 ? arr[index - 1].checked = true :  arr[index + 1].checked = true);
      }
    });

    if(stateKey.length){
      date[index][stateKey] = text;
      text = '(' + formatDate({type: 'getCustomDate', date: text, format: 'MMM DD, YYYY'}) + ')';
    }
    date[index].selectedDate = text.match(m)[1];
    this.props.screenProps[1](date);
    this.setState({
      modalVisible: false
    });
  }


  setModalVisible (index, name){
    this.refs.modal.open();
   this.setState({modalVisible: true, iosRange: name, iosIndex: index});
  };



  render() {

    const {state} = this.props.navigation;

    getData = (text, index) => {
      if(state.routeName != 'CUSTOM') {
        return (
          <TouchableOpacity style={DashboardSelStyles.tabItemCon} onPress={this.selectCheckBox.bind(this, index, text)}
                            activeOpacity={0.75}>
            <Icon style={DashboardSelStyles.radioIcon}
                  name={this.state.date[index].checked ? 'md-radio-button-on' : 'ios-radio-button-off'} size={25}
                  color={this.state.date[index].checked ? '#008142' : '#dadada'}/>
            <Text style={[DashboardSelStyles.DbSelectionText, DashboardSelStyles.tabItemTxt]}>{text}</Text>
          </TouchableOpacity>
        );
      }else{
        return (
          <ViewContainer style={DashboardSelStyles.tabContainerCustom}>
            <TouchableWithoutFeedback>
              <TouchableOpacity style={DashboardSelStyles.textCon}
                                onPress={(Platform.OS === 'ios' ? this.setModalVisible.bind(this, index, 'customDateTo') : this.showPicker.bind(this, 'customDateTo', {date: this.findDate('customDateTo'), mode: 'calendar', maxDate: (() => {let d = new Date(); return d.setDate(d.getDate() - 1)})()}, index))}>
                <Text style={DashboardSelStyles.text}>TO</Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <TouchableOpacity style={DashboardSelStyles.textCon}
                                onPress={(Platform.OS === 'ios' ? this.setModalVisible.bind(this, index + 1, 'customDateFrom') : this.showPicker.bind(this, 'customDateFrom', {date: this.findDate('customDateFrom'), mode: 'calendar', maxDate: new Date()}, index+1))}>
                <Text style={DashboardSelStyles.text}>FROM</Text>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
            <Modal style={DashboardSelStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
              <View style={DashboardSelStyles.renderListCon}>
                <DatePickerIOS
                  date={new Date(this.findDate.bind(this, this.state.iosRange))}
                  mode="date"
                  onDateChange={this.onDateChange.bind(this)}
                />
              </View>
            </Modal>
          </ViewContainer>
        );
      }
    };


    const Day = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Yesterday (' + formatDate({type: 'subtract', no: 1, duration: 'day'}) + ')', 0)}
        {getData('Today (' + formatDate() + ')', 1)}
      </ViewContainer>
    );

    const Week = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Last 7 Days (' + formatDate({type: 'subtract', no: 7, duration: 'day'}) + ' - ' + formatDate({type: 'subtract', no: 1, duration: 'day'}) + ')', 2)}
        {getData('This Week (' + formatDate({type: 'startOf', duration: 'week'}) + ' - ' + formatDate() + ')', 3)}
      </ViewContainer>
    );

    const Month = () => (
      <ViewContainer style={DashboardSelStyles.tabContainer}>
        {getData('Last Month ' + '(' + formatDate({type: 'subtract', no: 1, duration: 'month', format: 'MMMM'}) + ')', 4)}
        {getData('This Month ' + '(' + formatDate({type: 'startOf', duration: 'month', format: 'MMMM'}) + ')', 5)}
      </ViewContainer>
    );



    switch (state.routeName){
      case 'DAY': return <Day />;
      case 'WEEK': return <Week />;
      case 'MONTH': return <Month />;
      case 'CUSTOM': return <ViewContainer>{getData('CUSTOM', 6)}</ViewContainer>;
    }
  }
}
