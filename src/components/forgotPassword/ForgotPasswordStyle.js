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
      justifyContent: 'center',
  },

  textEmail:{
      fontFamily: 'Quicksand_Book',
      paddingLeft: 20,
      paddingRight: 60,
      fontSize: 16

  },

  inputContainer: {
      flex: 4,
  },

  btnContainer: {
      flex: 1.5,
      justifyContent: 'flex-end'
  },

  btn: {
    backgroundColor: '#00562f',
    padding: 30,
  },

  input: {
    fontFamily: 'Quicksand_Book',
    paddingLeft: 53,
    fontSize: 15,
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
    alignItems: 'center',
  },

  bottomText:{
    fontFamily: 'Quicksand_Book',
    paddingTop: 20,
    paddingBottom: 20
  },

  textBold:{
    fontFamily: 'Quicksand_Bold',
  },


});