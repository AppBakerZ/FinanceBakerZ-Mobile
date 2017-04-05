import {Alert} from 'react-native';
import moment from 'moment';
import numeral from 'numeral';
import Meteor from 'react-native-meteor';


exports.validateEmail = (email)  => {
  let atPos, dotPos;
  atPos = email.indexOf("@");
  dotPos = email.lastIndexOf(".");
  return !(atPos < 1 || dotPos < atPos+2 || dotPos+2 >= email.length);
};

exports.showAlert = (title, message) =>{
  Alert.alert(
    title,
    message,
    [{text: 'OK' }],
    {cancelable: false}
  )
};

exports.formatDate = (dateData = {}) => {

  let {type, no, duration, date, format} = dateData;
  format = format || 'MMM DD';

  switch (type){
    case 'subtract':
      return moment().subtract(no, duration).format(format);
      break;
    case 'add':
      return moment().add(no, duration).format(format);
      break;
    case 'startOf':
      return moment().startOf(duration).format(format);
      break;
    case 'getCustomDate':
      return moment(date).format(format);
      break;
    default:
      return moment().format(format);
  }
};

exports.filterDate = (date) => {

  let newDate = {};
  let d;

  function getDate(date) {
    d = moment(date.selectedDate, 'MMM DD').format();
    newDate.start = moment(d).startOf(date.selected.toLowerCase()).format();
    newDate.end = moment(d).endOf(date.selected.toLowerCase()).format();
    return newDate;
  }

  switch (date[0].selected){
    case 'Day' :
      return getDate(date[0]);
      break;
    case 'Week' :
      d  = date[0].selectedDate.split('-').map(date => moment(date.trim(), 'MMM DD').format());
      newDate.start = moment(d[0]).startOf('week').format();
      newDate.end = moment(d[1]).endOf('week').format();
      return newDate;
      break;
    case 'Month' :
      return getDate(date[0]);
      break;
    case 'Custom' :
      d  = date.map(date => moment(date.selectedDate, 'MMM DD').format());
      newDate.start = moment(d[0]).startOf('day').format();
      newDate.end = moment(d[1]).endOf('day').format();
      return newDate;
      break;
  }
};

exports.alterName = (bank) => {
  return bank ? bank.substring(5).replace(/-/g, " ") : '';
};

exports.loggedUserCurrency = () =>{
  return Meteor.user() ? Meteor.user().profile.currency.value : '';
};

exports.alterIconName = (iconName) => {
  return iconName ? iconName.substring(9) : '';
};

exports.currencyWithUnits = (currency) => {
  return numeral(currency).format('0.[0000]a');
};

exports.currencyStandardFormat = (currency) =>{
  return numeral(currency).format('0,0');
};

exports.capitalizeFirstLetter  = (string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
};