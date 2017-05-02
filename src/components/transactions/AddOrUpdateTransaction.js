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
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';


class AddOrUpdateTransaction extends Component{


  constructor(props){
    super(props);

    if(props.navigation.state.params.selectedTransaction){
      let {_id, amount, type, project, createdAt, receivedAt, category, description, billUrl, spentAt } = props.navigation.state.params.selectedTransaction;
      this.state = {
        _id: _id,
        account: '',
        amount: amount.toString(),
        receivedAt: !category ? createdAt : spentAt,
        receivedTime: !category ? receivedAt : spentAt,
        type: type || 'project',
        project: project ? project._id : '',
        loading: true,
        accounts: props.accounts,
        projects: props.projects,
        modalVisible: false,
        billUrl: billUrl ? billUrl : '',
        description: description ? description : '',
        category: category ? category._id : '',
        types:  [
          {   name: 'Salary', _id: 'salary'},
          { name: 'Project', _id: 'project'}
        ],
        render: {renderBank: true},
        routeName: '',
      };
    }else{
      let {routeName } = props.navigation.state.params;
      let datetime = new Date();
      this.state = {
        routeName: routeName,
        account: '',
        amount: '',
        receivedAt: datetime,
        receivedTime: datetime,
        type: 'project',
        project: '',
        loading: true,
        accounts: props.accounts,
        projects: props.projects,
        modalVisible: false,
        billUrl: '',
        description: '',
        category: '',
        types:  [
          {   name: 'Salary', _id: 'salary'},
          { name: 'Project', _id: 'project'}
        ],
        render: {renderBank: true}
      }
    }

    this.renderPicker = this.renderPicker.bind(this);
    this.setAccount = this.setAccount.bind(this);

  }

  componentWillMount(){

    let {routeName} = this.state;
    if(!routeName){
      let { account } = this.props.navigation.state.params.selectedTransaction;
      this.setAccount(this.findBankAccount(account));
    }
  }

  componentWillReceiveProps(props){

    let {routeName} = this.state;
    if(!routeName){
      let {category, account} = props.navigation.state.params.selectedTransaction;
      this.setState({
          accounts: props.accounts,
          projects: props.projects,
          categories: props.categories,
          loading: false
        }, () => {
          category ?  this.state.categories.length ? this.setCategory(this.findCategory(category._id)) : '' : '';
          this.state.accounts.length  ? this.setAccount(this.findBankAccount(account)) : '';
          this.state.accounts.length  ? this.setState({loading: false}) : '';
        }
      );
    }else{
      this.setState({
          accounts: props.accounts,
          projects: props.projects,
          categories: props.categories,
          loading: false
        }, () => {
          this.state.accounts.length  ? this.setState({loading: false}) : '';
        }
      );
    }

  }

  onChange(name, val){
    this.setState({ [name]: val })
  }

  findBankAccount(accountId){
    let {accounts} = this.state;
    return accounts.find(account => account._id === accountId);
  }

  findCategory(categoryId){
    let {categories} = this.state;
    return categories.find(category => category._id === categoryId);
  }

  setAccount(account){
    if(account){

      this.setState({
        account: account._id,
        accountName: account.bank
      });

      let {accounts} = this.state;

      let find, index;
      find = accounts.find(x => x === account);
      index = accounts.indexOf(find);
      accounts.map(account => account.check = false);
      accounts[index].check = true;
      this.setState({accounts});
    }
  }

  alertBankName(bankName){
    return bankName ? bankName.split('-').slice(1).join(' ') : '';
  }

  setCategory(category){

    this.setState({
      category: category._id,
      categoryName: category.name
    });

    let {categories} = this.state;
    let find, index;
    find = categories.find(x => x === category);
    index = categories.indexOf(find);
    categories.map(account => account.check = false);
    categories[index].check = true;
    this.setState({categories});
  }

  renderCategories(categories){
    return categories.map((category, i) => {
      let categoryIcon;
      categoryIcon = category.icon.replace('icon-' , "");
      return (
        <TouchableOpacity elevation={5} key={i} style={TransactionsStyles.updateTranRadioCon} activeOpacity={0.8} onPress={() => this.setCategory(category)}>
          <View style={TransactionsStyles.updateTranRadioBtnCon}>
            <Ionicons name={category.check ? 'md-radio-button-on' : 'md-radio-button-off'} size={25} color={category.check ? '#008142' : '#dadada'}/>
          </View>
          <View style={TransactionsStyles.updateTranRadioBtnItemCon}>
            <CategoryIcon name={categoryIcon} size={20} />
            <Text style={TransactionsStyles.updateTranRadioBtnItem}>{category.name}</Text>
          </View>
        </TouchableOpacity>
      )
    });
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
    this.setState({
      render: state,
      modalVisible: true
    });

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
    if(renderFlag.renderBank){
      return this.renderAccounts(data.accounts);
    }
    else if(renderFlag.renderCategories){
      return this.renderCategories(data.categories)
    }
  }

  renderPicker(data, renderFlag){
    let {routeName} = this.state;
    if(!routeName){
      return data.selectedTransaction.category ? this.renderExpensePicker(data, renderFlag) : this.renderIncomePicker(data, renderFlag)
    }else{
      return routeName === 'EXPENSES' ? this.renderExpensePicker(data, renderFlag) : this.renderIncomePicker(data, renderFlag)
    }
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
            <Text style={TransactionsStyles.text}>{this.alertBankName(this.state.accountName) || 'Select your account'}</Text>
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

  renderExpenseForm(){

    return(
      <ViewContainer style={TransactionsStyles.renderIncomeForm}>
        <TouchableOpacity onPress={() => this.handleMultipleChange.bind(this, {renderBank: true})()} activeOpacity={0.75} style={[TransactionsStyles.updateTranAccountCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Select your account</Text>
          <View style={TransactionsStyles.updateTranAccDropDown}>
            <Text style={TransactionsStyles.text}>{this.alertBankName(this.state.accountName) || 'Select your account'}</Text>
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
        <TouchableOpacity onPress={() => this.handleMultipleChange.bind(this, {renderCategories: true})()} activeOpacity={0.75} style={[TransactionsStyles.updateTranAccountCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Select your category</Text>
          <View style={TransactionsStyles.updateTranAccDropDown}>
            <Text style={TransactionsStyles.text}>{this.state.categoryName || 'Select your category'}</Text>
            <Icon size={10} name="down-arrow" style={TransactionsStyles.iconRight} />
          </View>
        </TouchableOpacity>
        <View style={[TransactionsStyles.updateTranAmountCon, TransactionsStyles.borderBottom]}>
          <Text style={[TransactionsStyles.textBold, TransactionsStyles.relativeTop]}>Description</Text>
          <KeyboardAvoidingView>
            <TextInput
              placeholder='Enter Description'
              style={TransactionsStyles.input}
              autoCorrect={false}
              onChangeText={this.onChange.bind(this, 'description')}
              underlineColorAndroid="transparent"
              multiline = {true}
              value={this.state.description}
            />
          </KeyboardAvoidingView>
        </View>
        <TouchableOpacity onPress={() => {Platform.OS === 'ios' ? this.handleMultipleChange.bind(this, {iosDate: true})() : this.showPicker.bind(this, 'receivedAt', {date: this.state.receivedAt, mode: 'calendar'})() }} style={[TransactionsStyles.updateTranDateCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Creation Date</Text>
          <Text style={TransactionsStyles.text}>{formatDate({type: 'getCustomDate', date: this.state.receivedAt, format: 'MMMM DD, YYYY'})}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {Platform.OS === 'ios' ? this.handleMultipleChange.bind(this, {iosDate: true, showTime: true})() : this.timePicker.bind(this, 'receivedTime')() }} style={[TransactionsStyles.updateTranTimeCon, TransactionsStyles.borderBottom]}>
          <Text style={TransactionsStyles.textBold}>Creation Time</Text>
          <Text style={TransactionsStyles.text}>{formatDate({type: 'getCustomDate', format: 'hh:mm A', date: this.state.receivedTime})}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress ={this.getImagePicker.bind(this)} style={[TransactionsStyles.updateTranTimeCon, !this.state.billUrl  ? TransactionsStyles.borderBottom : '']}>
          <Text style={TransactionsStyles.textBold}>Choose Bill</Text>
        </TouchableOpacity>
        <View style={[TransactionsStyles.imageCon, this.state.billUrl  ? TransactionsStyles.borderBottom : '']}>
          {this.state.billUrl ? <Image source = {{uri: this.state.billUrl}} style = {TransactionsStyles.userBill} /> : <Text></Text>}
        </View>
        <View style={TransactionsStyles.bottomCon}></View>
      </ViewContainer>
    );
  }

  updateIncome(){

    let {_id, account, amount, receivedAt, receivedTime, type, project, projects} = this.state;
    let {navigate} = this.props.navigation;

    project = type === 'project' && !project ? projects[0]._id : project;
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

  updateExpense(){

    let {_id, account, amount, receivedTime, receivedAt, description, billUrl, category} = this.state;
    let {navigate} = this.props.navigation;

    let spentAt, spentTime;

    spentAt = new Date(receivedAt);
    spentTime = new Date(receivedTime);
    spentAt.setHours(spentTime.getHours(), spentTime.getMinutes(), 0, 0);

    category = category && {_id: category};

    Meteor.call('expenses.update', {
      expense: {
        _id,
        account,
        amount: Number(amount),
        spentAt,
        description,
        billUrl,
        category
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

  createExpense(){

    let {account, amount, description, receivedTime, receivedAt, category, billUrl} = this.state;

    let spentAt, spentTime;
    spentAt = new Date(receivedAt);
    spentTime = new Date(receivedTime);
    spentAt.setHours(spentTime.getHours(), spentTime.getMinutes(), 0, 0);
    category = category && {_id: category};
    let {goBack} = this.props.navigation;


    if(account && amount && category) {
      Meteor.call('expenses.insert', {
        expense: {
          account,
          amount: Number(amount),
          spentAt,
          description,
          billUrl,
          category
        }
      }, (err, response) => {
        if(response){
          showAlert('Success', 'Transaction has been added.');
          goBack();
        }else{
          console.warn(err.reason)
        }
      });
    }else{
      showAlert('Validation', 'Account, amount and cateogry fields are required.');
    }

  }

  createIncome(){
    let {account, amount, receivedAt, receivedTime, type, project, projects} = this.state;

    let {goBack} = this.props.navigation;

    project = type === 'project' && !project ? projects[0]._id : project;
    receivedAt = new Date(receivedAt);
    receivedTime = new Date(receivedTime);
    receivedAt.setHours(receivedTime.getHours(), receivedTime.getMinutes(), 0, 0);
    project = (project && type == "project" && {_id: project}) || {};


    if(account &&  amount ){
      Meteor.call('incomes.insert', {
        income: {
          account,
          amount: Number(amount),
          receivedAt,
          type,
          project
        }
      }, (err, response) => {
        if(response){
          showAlert('Success', 'Transaction has been added.');
          goBack();
        }else{
          console.warn(err.reason)
        }
      });
    }else{
      showAlert('Validation', 'Account and amount fields are required.');
    }

  }

  submit(selectedTransaction){
    let {routeName} = this.state;
    if(!routeName){
      selectedTransaction.category ? this.updateExpense() : this.updateIncome();
    }else{
      routeName === 'EXPENSES' ? this.createExpense() : this.createIncome()
    }
  }

  getImagePicker(){
    let options = {
      title: 'Choose Bill',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let billUrl = response.uri;
        this.setState({
          billUrl,
          getImage: response
        });
      }
    });
  }

  uploadImage(){
    let obj = this.state.getImage;
    const file = {
      uri: obj.uri,
      name: obj.fileName,
      type: obj.type
    };

    const options = {
      keyPrefix: "uploads/",
      bucket: "financebakerz",
      region: Settings.AWSRegion,
      accessKey: Settings.AWSAccessKeyId,
      secretKey: Settings.AWSSecretAccessKey,
      successActionStatus: 201
    };

    RNS3.put(file, options).then(response => {
      if (response.status !== 201){
        //throw new Error("Failed to upload image to S3");
        showAlert('Error', 'Failed to upload image to S3');
        this.setState({loading: false});
      } else {
        this.setState({billUrl: response.body.postResponse.location});
      }
    });
  }

  renderFrom(data){
    let {routeName} = this.state;
    if(!routeName){
      let {selectedTransaction} = this.props.navigation.state.params;
      return selectedTransaction.category ? this.renderExpenseForm(data) : this.renderIncomeForm(data)
    }else{
      return routeName === 'EXPENSES' ? this.renderExpenseForm(data) : this.renderIncomeForm(data)
    }
  }


  render(){

    let {selectedTransaction} = this.props.navigation.state.params;
    let {projects, accounts, types, loading, modalVisible, categories} = this.state;
    let data = {selectedTransaction, projects, accounts, types, categories};

    if(!loading){
      return(
        <ViewContainer>
          <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={TransactionsStyles.backgroundImage}>
            {this.renderFrom(data)}
          </Image>
          <Modal style={TransactionsStyles.modal} position={"bottom"} ref={"modal"} swipeArea={20} onClosed={() => this.setState({modalVisible: false})}>
            <View style={TransactionsStyles.renderDetailCon}>
              <ScrollView>
                {this.renderPicker(data, this.state.render)}
              </ScrollView>
            </View>
          </Modal>
          {!modalVisible ? <FabButton iconName="check" iconColor="#fff" onPress={() => this.submit.bind(this, data.selectedTransaction)()} /> : <View></View> }
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
  Meteor.subscribe('categories');


  let projects, accounts, categories;
  projects = Meteor.collection('projects').find({});
  accounts = Meteor.collection('accounts').find({});
  categories = Meteor.collection('categories').find({});
  categories.map(category => category.check = false);
  accounts.map(account => account.check = false);

  return {
    projects,
    accounts,
    categories
  };
}, AddOrUpdateTransaction);