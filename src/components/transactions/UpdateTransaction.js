import React, { Component } from 'react';
import { View, Image, Text, Platform, Picker, ScrollView, TimePickerAndroid , DatePickerAndroid, TouchableOpacity, TextInput, KeyboardAvoidingView, DatePickerIOS  } from 'react-native';
import { TransactionsStyles } from 'FinanceBakerZ/src/components/transactions/TransactionsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Modal from 'react-native-modalbox';
import Meteor, { createContainer } from 'react-native-meteor';
import BankIcon from 'FinanceBakerZ/src/icons/BankIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import {formatDate, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import FabButton from 'FinanceBakerZ/src/components/button/FabButton';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';
import {showAlert} from 'FinanceBakerZ/src/customLibrary';




class UpdateTransaction extends Component{

  constructor(props){
    super(props);
    let datetime = new Date();
    let {_id, amount, type, project, account} = props.navigation.state.params.selectedTransaction;

    this.state = {
      _id: _id,
      account: '',
      amount: amount.toString(),
      receivedAt: datetime,
      receivedTime: datetime,
      type: type,
      project: project._id,
      active: false,
      loading: true,
      accounts: props.accounts,
      projects: props.projects,
      types:  [
        {   name: 'Salary', _id: 'salary'},
        { name: 'Project', _id: 'project'}
      ],
      render: {renderBank: true}
    };

    this.renderPicker = this.renderPicker.bind(this);
    this.setAccount = this.setAccount.bind(this);

  }

  componentWillReceiveProps(props){

    let {account, createdAt, receivedAt} = props.navigation.state.params.selectedTransaction;

    this.setState({
      accounts: props.accounts,
      projects: props.projects,
      receivedAt: createdAt,
      receivedTime: receivedAt,
      loading: false
    });
    // props.accounts.length ? this.setAccount(this.findBankAccount(account)) : '';
  }

  onChange(name, val){
    this.setState({
      [name]: val
    })
  }

  findBankAccount(accountName){
    let {accounts} = this.state;
    return accounts.find(account => account.bank === accountName);
  }

  setAccount(account){

    this.setState({
      account: account.bank
    });

    let {accounts} = this.state;
    let find, index;
    find = accounts.find(x => x === account);
    index = accounts.indexOf(find);
    accounts.map(account => account.check = false);
    accounts[index].check = true;
    this.setState({accounts});
  }

  alertBankName(bankName){
    return bankName.split('-').slice(1).join(' ');
  }

  renderAccounts(accounts){

      return accounts.map((account, i) => {
        let bankName, bankIcon;
        bankName = this.alertBankName(account.bank);
        bankIcon = account.bank.replace('bank-' , '');
        return (
          <TouchableOpacity elevation={5} key={i} style={TransactionsStyles.updateTranRadioCon} activeOpacity={0.8} onPress={() => this.setAccount(account)}>
            <View style={TransactionsStyles.updateTranRadioBtnCon}>
              <Ionicons name={account.check ? 'md-radio-button-on' : 'md-radio-button-off'} size={25} color={account.check ? '#008142' : '#dadada'}/>
            </View>
            <View style={TransactionsStyles.updateTranRadioBtnItemCon}>
              <BankIcon name={bankIcon} size={20} />
              <Text style={TransactionsStyles.updateTranRadioBtnItem}>{bankName}</Text>
            </View>
          </TouchableOpacity>
        )
      });
    }



  handleMultipleChange(state){
    this.setState({render: state});
    this.refs.modal.open();
  }

  renderDatePickerIOS(renderFlag){
    return  <DatePickerIOS
      date={renderFlag.showTime ? this.state.receivedTime  : this.state.receivedAt}
      mode={renderFlag.showTime ? 'time' : 'date'}
      onDateChange={this.onChange.bind(this, renderFlag.showTime ? 'receivedTime' : 'receivedAt' )}
    />
  }

  renderPickerDropDown(data, renderFlag){

    if(Platform.OS === 'ios'){
      data = renderFlag.renderPickerProject ? data.projects : data.types;
    }

    let projectsRenderItems = data.map((data, i) =>  <Picker.Item key={i} label={data.name} value={data._id}/>);
    return(
      <Picker
        selectedValue={renderFlag.renderPickerType ? this.state.type : this.state.project}
        onValueChange={this.onChange.bind(this, renderFlag.renderPickerType ? 'type' : 'project')}>
        {projectsRenderItems}
      </Picker>
    );
  }

  renderIncomePicker(data, renderFlag){
    if(renderFlag.renderBank){
      return this.renderAccounts(data.accounts)
    }else if(renderFlag.iosDate){
      return this.renderDatePickerIOS(renderFlag);
    }else if(renderFlag.renderPickerType || renderFlag.renderPickerProject){
      return this.renderPickerDropDown(data, renderFlag);
    }
  }

  renderExpensePicker(data, renderFlag){

  }

  renderPicker(data, renderFlag){
    {return data.selectedTransaction.category ? this.renderExpensePicker(data, renderFlag) : this.renderIncomePicker(data, renderFlag)}
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
        this.onChange(stateKey, date);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  // For Android
  timePicker = async (stateKey, options) => {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
        let {receivedAt} = this.state;
        let receivedTime = receivedAt.setHours(hour, minute, 0, 0);
        this.onChange(stateKey, receivedTime);
      }
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  };

  findProjectName(project_id){
    let {projects} = this.state;
    return projects.find(project => project._id === project_id)['name'];
  }

  renderIncomeForm(data){
    return(
      <ViewContainer style={TransactionsStyles.renderIncomeForm}>
        <TouchableOpacity onPress={() => this.handleMultipleChange.bind(this, {renderBank: true})()} activeOpacity={0.75} style={[TransactionsStyles.updateTranAccountCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Select your account</Text>
          <View style={TransactionsStyles.updateTranAccDropDown}>
            <Text style={TransactionsStyles.text}>{this.alertBankName(this.state.account) || 'Select your account'}</Text>
            <Icon size={10} name="down-arrow" style={TransactionsStyles.iconRight} />
          </View>
        </TouchableOpacity>
        <View style={[TransactionsStyles.updateTranAmountCon, TransactionsStyles.borderBottom]}>
          <Text style={[TransactionsStyles.textBold, TransactionsStyles.relativeTop]}>Amount</Text>
          <KeyboardAvoidingView>
            <TextInput
              placeholder='Enter Amount'
              style={TransactionsStyles.input}
              autoCorrect={false}
              onChangeText={this.onChange.bind(this, 'amount')}
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              value={this.state.amount}
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity onPress={() => {Platform.OS === 'ios' ? this.handleMultipleChange.bind(this, {iosDate: true})() : this.showPicker.bind(this, 'receivedAt', {date: this.state.receivedAt, mode: 'calendar'})() }} style={[TransactionsStyles.updateTranDateCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Receiving Date</Text>
          <Text style={TransactionsStyles.text}>{formatDate({type: 'getCustomDate', date: this.state.receivedAt, format: 'MMMM DD, YYYY'})}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Platform.OS === 'ios' ? this.handleMultipleChange.bind(this, {iosDate: true, showTime: true})() : this.timePicker.bind(this, 'receivedTime')() }} style={[TransactionsStyles.updateTranTimeCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Receiving Time</Text>
          <Text style={TransactionsStyles.text}>{formatDate({type: 'getCustomDate', format: 'hh:mm A', date: this.state.receivedTime})}</Text>
        </TouchableOpacity>
        {Platform.OS === 'ios' ? <TouchableOpacity onPress={() => this.handleMultipleChange.bind(this, {renderPickerType: true})()}  style={[TransactionsStyles.updateTranTypeCon, TransactionsStyles.borderBottom]}>
          <Text style={[TransactionsStyles.textBold]}>Select type</Text>
          <View style={TransactionsStyles.updateTranAccDropDown}>
            <Text style={TransactionsStyles.text}>{capitalizeFirstLetter(this.state.type)|| 'Select type'}</Text>
            <Icon size={10} name="down-arrow" style={TransactionsStyles.iconRight} />
          </View>
        </TouchableOpacity> :
            <View style={[TransactionsStyles.updateTranTypeCon, TransactionsStyles.borderBottom]}>
              <Text style={[TransactionsStyles.textBold, TransactionsStyles.relativeTop]}>Select type</Text>
              {this.renderIncomePicker(data.types, {renderPickerType: true})}
            </View>
        }
        {this.state.type !== 'salary' ?
          Platform.OS === 'ios' ? <TouchableOpacity onPress={() => this.handleMultipleChange.bind(this, {renderPickerProject: true})()} style={[TransactionsStyles.updateTranTypeCon, TransactionsStyles.borderBottom]}>
            <Text style={[TransactionsStyles.textBold]}>Select Project</Text>
            <View style={TransactionsStyles.updateTranAccDropDown}>
              <Text style={TransactionsStyles.text}>{this.findProjectName(this.state.project) || 'Select Project'}</Text>
              <Icon size={10} name="down-arrow" style={TransactionsStyles.iconRight} />
            </View>
          </TouchableOpacity> :
            <View style={[TransactionsStyles.updateTranTypeCon, TransactionsStyles.borderBottom]}>
              <Text style={[TransactionsStyles.textBold, TransactionsStyles.relativeTop]}>Select project</Text>
              {this.renderIncomePicker(data.projects, {renderPickerProject: true})}
            </View> : <View></View>}
        <View style={TransactionsStyles.bottomCon}></View>
      </ViewContainer>
    );
  }

  renderExpenseForm(data){
    return(
      <Text>I m render Expense</Text>
    );
  }

  submit(){

    let {_id, account, amount, receivedAt, receivedTime, type, project} = this.state;
    let {navigate} = this.props.navigation;

    receivedAt = new Date(receivedAt);
    receivedTime = new Date(receivedTime);
    receivedAt.setHours(receivedTime.getHours(), receivedTime.getMinutes(), 0, 0);
    project = (project && type === "project" && {_id: project}) || {};

    Meteor.call('incomes.update', {
      income: {
        _id,
        account,
        amount: Number(amount),
        receivedAt,
        type,
        project
      }
    }, (err, response) => {
      if(err){
          console.warn(err.reason);
      }else{
        showAlert('Success', 'Transaction has been updated.');
        navigate('Transactions');
      }
    });


  }


  render(){

    let {selectedTransaction} = this.props.navigation.state.params;
    let {projects, accounts, types, loading} = this.state;

    let data = {selectedTransaction, projects, accounts, types};

    if(!loading){
      return(
        <ViewContainer>
          <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={TransactionsStyles.backgroundImage}>
            {selectedTransaction.category ?
              this.renderExpenseForm(data)
              :
              this.renderIncomeForm(data)
            }
          </Image>
          <Modal style={TransactionsStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
            <View style={TransactionsStyles.renderDetailCon}>
              <ScrollView>
                {this.renderPicker(data, this.state.render)}
              </ScrollView>
            </View>
          </Modal>
          <FabButton iconName="check" iconColor="#fff" onPress={this.submit.bind(this)} />
        </ViewContainer>
      );
    }else{
      return <View style={TransactionsStyles.loaderView}><Loader size={35} color="#008142" /></View>
    }



  }
}

export default createContainer(() => {

    Meteor.subscribe('projects.all');
    Meteor.subscribe('accounts');


  let projects, accounts;
  projects = Meteor.collection('projects').find({});
  accounts = Meteor.collection('accounts').find({});
  accounts.map(account => account.check = false);

  return {
    projects,
    accounts
  };
}, UpdateTransaction);