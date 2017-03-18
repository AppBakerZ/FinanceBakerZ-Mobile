import {StyleSheet} from 'react-native';

export const RegisterStyles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },

  formContainer: {
    flex: 1.6,
    justifyContent: 'center'
  },

  btn:{
    backgroundColor: '#00562f',
    padding: 30
  },

  btnContainer: {
    flex: 1.8,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  bottomTextContainer: {
    flex: 0.5,
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
    fontFamily: 'QuicksandBold-Regular',
  },

  input: {
    fontFamily: 'QuicksandBook-Regular',
    paddingLeft: 60,
    fontSize: 15,
    height: 48
  },

  inputIcon:{
    position: 'absolute',
    top: 13,
    left: 25
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5'
  }

});