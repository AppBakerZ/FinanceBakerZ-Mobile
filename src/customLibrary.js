import {Alert} from 'react-native';

exports.validateEmail = (email)  => {
  let atpos, dotpos;
  atpos = email.indexOf("@");
  dotpos = email.lastIndexOf(".");
  return !(atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length);
};

exports.showAlert = (title, message) =>{
  Alert.alert(
    title,
    message,
    [
      {text: 'OK' }
    ],
    {
      cancelable: false
    }
  )
};



