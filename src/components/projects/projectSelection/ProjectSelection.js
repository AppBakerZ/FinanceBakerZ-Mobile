import React, {Component} from 'react';
import { Text, View, TextInput, Picker, Platform, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { ProjectSelectionStyles } from 'FinanceBakerZ/src/components/projects/projectSelection/ProjectSelectionStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Modal from 'react-native-modalbox';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import _ from 'underscore';
import { ReactiveDict } from 'react-native-meteor';
import {I18n} from 'FinanceBakerZ/src/customLibrary';


let updatedQuery = new ReactiveDict('projectsDict');


export default class ProjectSelectionScreen extends Component{

  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    let {filter, updatedQuerySet, statuses} = props.navigation.state.params;
    this.state = {
      filter : {
        client : {
          name: filter.client || ''
        },
        name: filter.name || '',
        status: filter.status || ''
      }
    };
    this.statuses  = statuses;
    this.renderPicker = this.renderPicker.bind(this);

    let updatedQueryObj = updatedQuerySet ? updatedQuerySet : {limit: 20}; // setting previously selected filters if available
    updatedQuery.set('query', updatedQueryObj);
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
  }

  submit(){
    let {filter, query} = this.state;
    let {goBack, state} = this.props.navigation;

    state.params.getUpdatedQuery({updatedQuerySet: updatedQuery.get('query')}); // setting updatedQuery in Project's state
    state.params.updateProjectState(filter);  // calling updateProjectState from Projects
    state.params.updateQuery(updatedQuery.get('query')); // calling updateQuery function from Projects
    goBack();
  }

  onChangeFilter(name, val){
    let copyQuery = updatedQuery.get('query'),
        label = name,
        filter = _.extend(this.state.filter, this.state.filter);
    filter[label] = val;
    if(label == 'client.name'){
      filter['client']['name'] = val;
    }
    this.setState({ filter});
    if(val){
      copyQuery[label] = (label != 'status') ? { $regex : val} : val;
    }
    else{
      delete  copyQuery[label]
    }
    copyQuery.limit  = 20;
    updatedQuery.set('query', copyQuery);
  }

  renderPicker(){
    let statuses = this.statuses.map((status, i) =>  <Picker.Item key={i} label={status.label} value={status.value}/>);
    return(
      <Picker
          style={ProjectSelectionStyles.picker}
          selectedValue={this.state.filter.status}
          onValueChange={this.onChangeFilter.bind(this, 'status')}>
        {statuses}
      </Picker>
    );
  }

  render(){

    let {filter} = this.state;
    let {findStatusLabel} = this.props.navigation.state.params;

    return(
      <ViewContainer style={ProjectSelectionStyles.container}>
        <View style={ProjectSelectionStyles.filterShowContainer}>
          <View style={ProjectSelectionStyles.filterShowText}>
            <Text style={ProjectSelectionStyles.text}>{I18n('PROJECTS_PROJECT_NAME')}: {filter.name}</Text>
          </View>
          <View style={ProjectSelectionStyles.filterShowText}>
            <Text style={ProjectSelectionStyles.text}>{I18n('PROJECTS_CLIENT_NAME')}: {filter.client.name}</Text>
          </View>
          <View style={ProjectSelectionStyles.filterShowText}>
            <Text style={ProjectSelectionStyles.text}>{I18n('PROJECTS_STATUS')} {findStatusLabel(filter.status)}</Text>
          </View>
        </View>
        <View style={ProjectSelectionStyles.filterCon}>
          <View style={ProjectSelectionStyles.projectNameCon}>
            <KeyboardAvoidingView>
              <View style={ProjectSelectionStyles.inputContainer}>
                <TextInput
                  placeholder={I18n('PROJECTS_PROJECT_NAME')}
                  style={ProjectSelectionStyles.input}
                  returnKeyType="next"
                  maxLength = {30}
                  autoCorrect={false}
                  onChangeText={this.onChangeFilter.bind(this, 'name')}
                  underlineColorAndroid="transparent"
                  value={filter.name}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={ProjectSelectionStyles.clientNameCon}>
            <KeyboardAvoidingView>
              <View style={ProjectSelectionStyles.inputContainer}>
                <TextInput
                  placeholder={I18n('PROJECTS_CLIENT_NAME')}
                  style={ProjectSelectionStyles.input}
                  maxLength = {30}
                  autoCorrect={false}
                  onChangeText={this.onChangeFilter.bind(this, 'client.name')}
                  underlineColorAndroid="transparent"
                  value={filter.client.name}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
          <View style={ProjectSelectionStyles.filterStatus}>
            <Text style={[ProjectSelectionStyles.text, ProjectSelectionStyles.textLeft]}>{I18n('PROJECTS_STATUS')}</Text>
            {(Platform.OS !== 'ios') ? this.renderPicker() :
              <TouchableOpacity style={ProjectSelectionStyles.bankCardTxtAndIcon} activeOpacity={0.75} onPress={() => this.refs.modal.open()}>
                <Text style={[ProjectSelectionStyles.text, ProjectSelectionStyles.textLeft, ProjectSelectionStyles.statusBtnText]}>{findStatusLabel(filter.status) || 'All'}</Text>
                <Icon size={10} name="down-arrow" style={ProjectSelectionStyles.iconRight} />
              </TouchableOpacity>
            }
          </View>
        </View>
        <Modal style={ProjectSelectionStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <View style={ProjectSelectionStyles.renderPickerCon}>
            {this.renderPicker()}
          </View>
        </Modal>
      </ViewContainer>
    );
  }
}