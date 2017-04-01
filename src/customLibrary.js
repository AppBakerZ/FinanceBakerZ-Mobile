import {Alert} from 'react-native';
import moment from 'moment';


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

exports.formatDate = (type, noOfDays, dayOrMonth, date, format = 'MMM DD') => {
  switch (type){
    case 'subtract':
      return moment().subtract(noOfDays, dayOrMonth).format(format);
      break;
    case 'add':
      return moment().add(noOfDays, dayOrMonth).format(format);
      break;
    case 'startOf':
      return moment().startOf(dayOrMonth).format(format);
      break;
    case 'getCustomDate':
      return moment(date).format(format);
      break;
    default:
      return moment().format(format);
  }
};

