import {StyleSheet} from 'react-native';

export const LoginStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },

  logoContainer: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    resizeMode: 'center',
    width: 220,
    height: 220
  },

  formContainer:{
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  textRightContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  textRight: {
    fontFamily: 'QuicksandBold-Regular',
    paddingRight: 15,
    paddingBottom: 10

  },

  btnContainer: {
    flex: 3.8,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  btn:{
    backgroundColor: '#00562f',
    padding: 30
  },

  bottomTextContainer: {
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomText:{
    fontFamily: 'QuicksandBook-Regular',
  },

  textBold:{
    fontFamily: 'QuicksandBold-Regular',
    paddingTop: 18,
    paddingBottom: 18

  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 70,
    fontSize: 15,
    height: 48
  },

  inputIcon:{
    position: 'absolute',
    top: 13,
    left: 30
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  }


});