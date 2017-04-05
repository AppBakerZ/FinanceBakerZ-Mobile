import React, { Component, PropTypes } from 'react';
import { View, Text, ListView, ActivityIndicator, ViewContainer} from 'react-native';
import { DashboardStyles } from 'FinanceBakerZ/src/components/dashboard/DashboardStyle';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';
import Meteor, {createContainer} from 'react-native-meteor';
import {loggedUserCurrency, currencyStandardFormat, alterIconName, capitalizeFirstLetter} from 'FinanceBakerZ/src/customLibrary';
import CurrencyIcon from 'FinanceBakerZ/src/icons/CurrencyIcon';


class DashboardTabBottomScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      incomes: props.incomes || [],
      expenses: props.expenses || []
    };
  }

  componentWillReceiveProps(props){
    this.setState({
      incomes: props.incomes,
      expenses: props.expenses,
      loading: false
    });
  }

  renderRow(routeName, rowData){
    return(
      <View style={DashboardStyles.listViewContainer}>
        <View style={DashboardStyles.listViewContentLeft}>
          <Icon name={routeName == 'INCOMES' ? 'right-arrow' : 'left-arrow'} color={routeName == 'INCOMES' ? 'green' : 'red'} style={DashboardStyles.icons}></Icon>
          <Text style={DashboardStyles.iconText}>{capitalizeFirstLetter(rowData.type)}</Text>
        </View>
        <View style={DashboardStyles.listViewContentRight}>
          <CurrencyIcon style={DashboardStyles.contentCurrIcon} size={20} name={alterIconName(loggedUserCurrency())} />
          <Text style={DashboardStyles.contentRightText}>{currencyStandardFormat(rowData.amount)}</Text>
        </View>
      </View>
    );
  }


  render() {
    const {state} = this.props.navigation;
    let {ds, incomes, expenses} = this.state;
    let transactions = [];

    if(incomes.length && expenses.length){
        return (
          <ListView
            dataSource={ds.cloneWithRows(eval(state.routeName.toLowerCase()))}
            renderRow={this.renderRow.bind(this, state.routeName)}
          />
        );
    }else{
      return <View style={DashboardStyles.loadingCon}><ActivityIndicator size="large" color="#008142" /></View>
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

  return {
    incomes: Meteor.collection('incomes').find({}),
    expenses: Meteor.collection('expenses').find({})
  };
}, DashboardTabBottomScreen);
