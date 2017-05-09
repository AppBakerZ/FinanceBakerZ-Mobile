import React, { Component } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, Picker, Platform, TouchableOpacity, DatePickerIOS, DatePickerAndroid  } from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Modal from 'react-native-modalbox';
import {formatDate} from 'FinanceBakerZ/src/customLibrary';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import Meteor from 'react-native-meteor';
import {showAlert} from 'FinanceBakerZ/src/customLibrary';
import {I18n} from 'FinanceBakerZ/src/customLibrary';


export default class CreateProject extends Component {

  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      name: '',
      clientName: '',
      type: '',
      amount: '',
      status: 'progress',
      startAt: '',
      active: false,
      loading: false,
      modalVisible: false
    };
    let {statuses} = props.navigation.state.params;
    this.statuses  = statuses.slice(1);
    this.renderPicker = this.renderPicker.bind(this);
  }

  onChange(name, val){
    this.setState({
      [name]: val
    });
  }


  submit(){
    this.setState({loading: true});
    const {name, clientName, type, amount, status, startAt} = this.state;
    if(name && clientName && type && amount && status && startAt){
      Meteor.call('projects.insert', {
        project: {
          name, client: {name: clientName}, type,
          amount: Number(amount), status, startAt
        }
      }, (err, response) => {
        if(response){
          showAlert('Success', name + ' has been added.');
          this.props.navigation.goBack();
        }else{
          showAlert('Error', err.reason);
        }
        this.setState({loading: false});
      });
    }else{
      this.setState({loading: false});
      showAlert('Validation', 'All fields are required');
    }
  }

  renderPicker(){
    let statuses = this.statuses.map((status, i) =>  <Picker.Item key={i} label={status.label} value={status.value}/>);
    return(
      <Picker
        selectedValue={this.state.status}
        onValueChange={this.onChange.bind(this, 'status')}>
        {statuses}
      </Picker>
    );
  }

  // For Android
  showPicker = async (stateKey, options) => {
    try {
      let newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action === DatePickerAndroid.dismissedAction) {
        newState[stateKey] = 'dismissed';
      } else {
        let date = new Date(year, month, day);
        this.setState({date});
        this.onChange(stateKey, date);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  //For iOS
  onDateChange(name, date){
    this.setState({date});
    this.onChange({[name]: date})
  }

  showModal(){
    this.refs.modalDate.open();
    this.setState({modalVisible: true});
  };

  render(){

    let {findStatusLabel} = this.props.navigation.state.params;

    return(
      <ViewContainer>
        <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={ProjectsStyles.backgroundImage}>
          <View style={[ProjectsStyles.inputProjectNameCon, ProjectsStyles.inputBorderBottom]}>
            <KeyboardAvoidingView>
              <TextInput
                placeholder={I18n('PROJECTS_PROJECT_NAME')}
                style={ProjectsStyles.input}
                maxLength = {50}
                autoCorrect={false}
                onChangeText={this.onChange.bind(this, 'name')}
                underlineColorAndroid="transparent"
                value={this.state.name}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={[ProjectsStyles.inputClientName, ProjectsStyles.inputBorderBottom]}>
            <KeyboardAvoidingView>
              <TextInput
                placeholder={I18n('PROJECTS_CLIENT_NAME')}
                style={ProjectsStyles.input}
                maxLength = {50}
                autoCorrect={false}
                onChangeText={this.onChange.bind(this, 'clientName')}
                value={this.state.clientName}
                underlineColorAndroid="transparent"
              />
            </KeyboardAvoidingView>
          </View>
          <View style={[ProjectsStyles.inputTypeCon, ProjectsStyles.inputBorderBottom]}>
            <KeyboardAvoidingView>
              <TextInput
                placeholder={I18n('PROJECTS_PROJECT_TYPE')}
                style={ProjectsStyles.input}
                maxLength = {50}
                autoCorrect={false}
                onChangeText={this.onChange.bind(this, 'type')}
                underlineColorAndroid="transparent"
                value={this.state.type}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={[ProjectsStyles.inputAmountCon, ProjectsStyles.inputBorderBottom]}>
            <KeyboardAvoidingView>
              <TextInput
                placeholder={I18n('PROJECTS_PROJECT_AMOUNT')}
                style={ProjectsStyles.input}
                maxLength = {30}
                autoCorrect={false}
                onChangeText={this.onChange.bind(this, 'amount')}
                value={this.state.amount}
                underlineColorAndroid="transparent"
                keyboardType="numeric"
              />
            </KeyboardAvoidingView>
          </View>
          <View style={[ProjectsStyles.inputPickerCon, ProjectsStyles.inputBorderBottom]}>
            {(Platform.OS !== 'ios') ? <View style={ProjectsStyles.statusTextView}><Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_STATUS')}</Text>{this.renderPicker()}</View> :
              <TouchableOpacity style={ProjectsStyles.projectCardTxtAndIcon} activeOpacity={0.75} onPress={() => {this.refs.modal.open(); this.setState({modalVisible: true})}}>
                <Text style={[ProjectsStyles.BankText, ProjectsStyles.textLeft]}>{this.state.status ? findStatusLabel(this.state.status) : 'Select Status'}</Text>
                <Icon size={10} name="down-arrow" style={ProjectsStyles.iconRight} />
              </TouchableOpacity>
            }
          </View>
          <View style={[ProjectsStyles.inputDateCon, ProjectsStyles.inputBorderBottom]}>
            <TouchableOpacity style={ProjectsStyles.projectCardTxtAndIcon} activeOpacity={0.75} onPress={() => {Platform.OS !== 'ios' ? this.showPicker.bind(this, 'startAt', {date: this.state.date})() : this.showModal.bind(this)()}}>
              <Text style={[ProjectsStyles.BankText, ProjectsStyles.inputDateSelected]}>{this.state.startAt ? formatDate({type: 'getCustomDate', date: this.state.startAt, format: 'MMMM DD, YYYY'}) : I18n('PROJECTS_START_DATE')}</Text>
              <Icon size={10} name="down-arrow" style={ProjectsStyles.iconRight} />
            </TouchableOpacity>
          </View>
          <View style={ProjectsStyles.bottomCon}></View>
        </Image>
        {!this.state.modalVisible ? <FabButton iconName="check" iconColor="#fff" onPress={this.submit.bind(this)} disabled={this.state.loading} /> : <View></View>}
        <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})}  position={"bottom"} ref={"modal"} swipeArea={20}>
          <View style={ProjectsStyles.renderPickerCon}>
            {this.renderPicker()}
          </View>
        </Modal>
        <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})}  position={"bottom"} ref={"modalDate"} swipeArea={20}>
          <View style={ProjectsStyles.renderPickerCon}>
            <DatePickerIOS
              date={this.state.date}
              mode="date"
              onDateChange={this.onDateChange.bind(this, 'startAt')}
            />
          </View>
        </Modal>
      </ViewContainer>
    )
  }
}