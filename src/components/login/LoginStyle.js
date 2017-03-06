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
    marginTop: 50,
  },

  textRightContainer: {
    alignItems: 'flex-end',
  },

  textRight: {
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 20,
    marginTop: 10,
    fontFamily: 'Quicksand_Bold'
  },

  btn:{
    backgroundColor: '#00562f',
    marginTop: 80,
    padding: 30,
  },

  bottomTextContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomText:{
    fontFamily: 'Quicksand_Book',
  },

  textBold:{
    fontFamily: 'Quicksand_Bold',
    paddingTop: 18,
    paddingBottom: 18

  },

  input: {
    fontFamily: 'Quicksand_Book'
  }


});