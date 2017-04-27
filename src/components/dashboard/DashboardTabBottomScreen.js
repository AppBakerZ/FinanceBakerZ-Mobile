import React, { Component, PropTypes } from 'react';
import { View, Text, ListView } from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Meteor, {createContainer} from 'react-native-meteor';
import {loggedUserCurrency, currencyStandardFormat, alterIconName, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';
import _ from 'underscore';
import Loader from 'FinanceBakerZ/src/components/loader/Loader';



class DashboardTabBottomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      incomes: props.incomes || [],
      expenses: props.expenses || [],
      transactions: props.transactions || []
    };
  }

  componentWillReceiveProps(props){
    this.setState({
      incomes: props.incomes,
      expenses: props.expenses,
      transactions: props.transactions
    });
  }

  renderRow(rowData){
    return(
      <View style={DashboardStyles.listViewContainer}>
        <View style={DashboardStyles.listViewContentLeft}>
          <Icon name={rowData.category ? 'left-arrow' : 'right-arrow'} color={rowData.category ?  '#C81113' : '#008041'} style={DashboardStyles.icons}></Icon>
          <Text style={DashboardStyles.iconText}>
            {capitalizeFirstLetter(rowData.receivedAt ?
              (rowData.type == "project" ?
                (rowData.project && rowData.project.name || rowData.project) : rowData.type) :
              (rowData.category.name || rowData.category))}
          </Text>
        </View>
        <View style={DashboardStyles.listViewContentRight}>
          <CurrencyIcon style={DashboardStyles.contentCurrIcon} size={14} name={alterIconName(loggedUserCurrency())} />
          <Text style={DashboardStyles.contentRightText}>{currencyStandardFormat(rowData.amount)}</Text>
        </View>
      </View>
    );
  }


  render() {
    const {state} = this.props.navigation;
    let {ds, incomes, expenses, transactions} = this.state;

    if(incomes.length || expenses.length || transactions.length){
      return (
        <ListView
          dataSource={ds.cloneWithRows(eval(state.routeName.toLowerCase()))}
          renderRow={this.renderRow.bind(this)}
        />
      );
    }else{
      return <View style={DashboardStyles.loadingCon}><Loader size={35} color="#008142" /></View>
    }
  }
}

DashboardTabBottomScreen.propTypes = {
  incomes: PropTypes.array.isRequired,
  expenses: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('incomes', 10);
  Meteor.subscribe('expenses', 10);

  let incomes, expenses;
  incomes =  Meteor.collection('incomes').find({});
  expenses = Meteor.collection('expenses').find({});

  return {
    incomes: incomes,
    expenses: expenses,
    transactions: _.sortBy(incomes.concat(expenses), function(transaction){return transaction.receivedAt || transaction.spentAt }).reverse()
  };
}, DashboardTabBottomScreen);
