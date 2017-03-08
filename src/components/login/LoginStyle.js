import {StyleSheet} from 'react-native';

export const LoginStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },

  logoContainer: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    resizeMode: 'center',
    width: 200,
    height: 200,
  },

  formContainer:{
    flex: 2.2,
    flexDirection: 'column',
    justifyContent: 'center',
    },

  textRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  textRight: {
    fontFamily: 'Quicksand_Bold',
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15

  },

  btnContainer: {
    flex: 3.8,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  btn:{
    backgroundColor: '#00562f',
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
    fontFamily: 'Quicksand_Book',
    paddingLeft: 50,
    fontSize: 15,
    paddingBottom: 15
  },

  inputIcon:{
    position: 'absolute',
    top: 13,
    left: 20
  }


});