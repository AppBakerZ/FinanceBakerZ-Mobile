import React, { Component } from 'react';
import { View, Text, Image, TextInput, KeyboardAvoidingView, Picker, Platform, TouchableOpacity, DatePickerIOS, DatePickerAndroid, ScrollView } from 'react-native';
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
      description: '',
      clientName: '',
      type: '',
      amount: '',
      status: 'progress',
      startAt: '',
      active: false,
      loading: false,
      modalVisible: false
    };
    let {statuses, types} = props.navigation.state.params;
    this.statuses  = statuses.slice(1);
    this.types  = types;
    this.renderPicker = this.renderPicker.bind(this);
  }

  onChange(name, val){
    this.setState({
      [name]: val
    });
  }


  submit(){
    this.setState({loading: true});
    const {name, clientName, type, amount, status, startAt, description} = this.state;
    if(name && clientName && type && amount && status && startAt && description){
      Meteor.call('projects.insert', {
        project: {
          name, description, client: {name: clientName}, type,
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

  renderPicker(key){
    let data = key == "status" ? this.statuses : this.types;
    let items = data.map((item, i) =>  <Picker.Item key={i} label={item.label} value={item.value}/>);
    return(
        <Picker
            style={ProjectsStyles.picker}
            selectedValue={this.state[key]}
            onValueChange={this.onChange.bind(this, key)}>
          {items}
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
            <ScrollView>
              <View style={[ProjectsStyles.inputBorderBottom, ProjectsStyles.inputContainer]}>
                <KeyboardAvoidingView>
                  <TextInput
                      placeholder={I18n('PROJECTS_PROJECT_NAME')}
                      style={ProjectsStyles.input}
                      maxLength = {50}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'name')}
                      underlineColorAndroid="transparent"
                      value={this.state.name}/>
                </KeyboardAvoidingView>
              </View>

              <View style={[ProjectsStyles.inputBorderBottom, ProjectsStyles.inputContainer]}>
                <KeyboardAvoidingView>
                  <TextInput
                      placeholder={I18n('PROJECTS_PROJECT_DESCRIPTION')}
                      style={ProjectsStyles.input}
                      maxLength = {150}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'description')}
                      underlineColorAndroid="transparent"
                      value={this.state.description}/>
                </KeyboardAvoidingView>
              </View>

              <View style={[ProjectsStyles.inputBorderBottom, ProjectsStyles.inputContainer]}>
                <KeyboardAvoidingView>
                  <TextInput
                      placeholder={I18n('PROJECTS_CLIENT_NAME')}
                      style={ProjectsStyles.input}
                      maxLength = {50}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'clientName')}
                      value={this.state.clientName}
                      underlineColorAndroid="transparent"/>
                </KeyboardAvoidingView>
              </View>

              <View style={[ProjectsStyles.statusTextView, ProjectsStyles.inputBorderBottom]}>
                <Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_PROJECT_TYPE')}</Text>
                {(Platform.OS !== 'ios') ? this.renderPicker('type') :
                  <TouchableOpacity style={ProjectsStyles.projectCardTxtAndIcon} activeOpacity={0.75} onPress={() => {this.refs.typesModal.open(); this.setState({modalVisible: true})}}>
                    <Text style={[ProjectsStyles.BankText, ProjectsStyles.pickerBtnText]}>{I18n('PROJECTS_PROJECT_TYPE')}</Text>
                    <Icon size={10} name="down-arrow" style={ProjectsStyles.iconRight} />
                  </TouchableOpacity>
                }
              </View>

              <View style={[ProjectsStyles.inputBorderBottom, ProjectsStyles.inputContainer]}>
                <KeyboardAvoidingView>
                  <TextInput
                      placeholder={I18n('PROJECTS_PROJECT_AMOUNT')}
                      style={ProjectsStyles.input}
                      maxLength = {30}
                      autoCorrect={false}
                      onChangeText={this.onChange.bind(this, 'amount')}
                      value={this.state.amount}
                      underlineColorAndroid="transparent"
                      keyboardType="numeric"/>
                </KeyboardAvoidingView>
              </View>

              <View style={[ProjectsStyles.statusTextView, ProjectsStyles.inputBorderBottom]}>
                <Text style={ProjectsStyles.BankText}>{I18n('PROJECTS_STATUS')}</Text>
                {(Platform.OS !== 'ios') ? this.renderPicker('status') :
                  <TouchableOpacity style={ProjectsStyles.projectCardTxtAndIcon} activeOpacity={0.75} onPress={() => {this.refs.statusModal.open(); this.setState({modalVisible: true})}}>
                    <Text style={[ProjectsStyles.BankText, ProjectsStyles.pickerBtnText]}>{this.state.status ? findStatusLabel(this.state.status) : 'Select Status'}</Text>
                    <Icon size={10} name="down-arrow" style={ProjectsStyles.iconRight} />
                  </TouchableOpacity>
                }
              </View>

              <View style={[ProjectsStyles.inputBorderBottom]}>
                <TouchableOpacity style={[ProjectsStyles.projectCardTxtAndIcon, ProjectsStyles.datePickerBtn]} activeOpacity={0.75} onPress={() => {Platform.OS !== 'ios' ? this.showPicker.bind(this, 'startAt', {date: this.state.date})() : this.showModal.bind(this)()}}>
                  <Text style={[ProjectsStyles.BankText, ProjectsStyles.inputDateSelected]}>{this.state.startAt ? formatDate({type: 'getCustomDate', date: this.state.startAt, format: 'MMMM DD, YYYY'}) : I18n('PROJECTS_START_DATE')}</Text>
                  <Icon size={10} name="down-arrow" style={ProjectsStyles.iconRight} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Image>

          {!this.state.modalVisible ? <FabButton iconName="check" iconColor="#fff" onPress={this.submit.bind(this)} disabled={this.state.loading} /> : <View/>}

          <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})}  position={"bottom"} ref={"statusModal"} swipeArea={20}>
            <View style={ProjectsStyles.renderPickerCon}>
              {this.renderPicker('status')}
            </View>
          </Modal>

          <Modal style={ProjectsStyles.modal} onClosed={() => this.setState({modalVisible: false})}  position={"bottom"} ref={"typesModal"} swipeArea={20}>
            <View style={ProjectsStyles.renderPickerCon}>
              {this.renderPicker('types')}
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