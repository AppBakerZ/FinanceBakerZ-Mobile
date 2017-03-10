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
    width: 200,
    height: 200,
  },

  formContainer:{
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    },

  textRightContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  textRight: {
    fontFamily: 'QuicksandBook-Regular',
    paddingRight: 15,
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
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomText:{
    fontFamily: 'QuicksandBook-Regular',
  },

  textBold:{
    fontFamily: 'QuicksandBook-Regular',
    paddingTop: 18,
    paddingBottom: 18

  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 50,
    fontSize: 15,
    paddingBottom: 15,
    marginBottom: 15
  },

  inputIcon:{
    position: 'absolute',
    top: 13,
    left: 20
  }


});