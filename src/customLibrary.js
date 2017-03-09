import {Alert} from 'react-native';

exports.validateEmail = (email)  => {
  let atpos, dotpos;
  atpos = email.indexOf("@");
  dotpos = email.lastIndexOf(".");
  if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= email.length) {
    return false;
  }else {
    return true;
  }
};

exports.showAlert = (title, message) =>{
  Alert.alert(
    title,
    message,
    [
      {text: 'OK' },
    ],
    {
      cancelable: false,
    }
  )
};



