import {StyleSheet} from 'react-native';

export const LoginStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 40
  },

  logo: {
    resizeMode: 'center',
    width: 200,
    height: 200,
  },

  formContainer:{
    marginTop: 70
  },

  textRight: {
    textAlign: 'right',
    marginRight: 20,
    marginTop: 10,
    fontFamily: 'Quicksand_Bold',
  },

  btn:{
    backgroundColor: '#00562f',
    marginTop: 80,
    padding: 30,

  },

  bottomText:{
    fontFamily: 'Quicksand_Book',
    marginTop: 20,
    textAlign: 'center'
  },

  textBold:{
    fontFamily: 'Quicksand_Bold',
  },

  addons: {

  }


});