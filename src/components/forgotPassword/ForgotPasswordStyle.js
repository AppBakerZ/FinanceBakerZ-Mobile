import {StyleSheet} from 'react-native';

export const ForgotPasswordStyle = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    width: null,
    height: null
  },

  container:{
    flex: 1,
    justifyContent: 'center'
  },

  textEmail:{
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 20,
    paddingRight: 60,
    fontSize: 16

  },

  inputContainer: {
    flex: 4
  },

  btnContainer: {
    flex: 1.8,
    justifyContent: 'flex-end'
  },

  btn: {
    backgroundColor: '#00562f',
    padding: 30
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 53,
    fontSize: 14,
    paddingBottom: 15
  },

  inputIcon:{
    position: 'absolute',
    top: 14,
    left: 25
  },


  bottomTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottomText:{
    fontFamily: 'QuicksandBook-Regular',
    paddingTop: 20,
    paddingBottom: 20
  },

  textBold:{
    fontFamily: 'QuicksandBold-Regular'
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  }


});