import {StyleSheet} from 'react-native';

export const RegisterStyles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    width: null,
    height: null
  },

  topHeading: {
    fontSize: 45,
    marginTop: 45,
    marginLeft: 30,
    color: '#00562f',
    fontFamily: 'Quicksand_Bold'
  },

  formContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 70
  },

  btn:{
    marginTop: 50,
    backgroundColor: '#00562f',
    padding: 30,
  },

  btnContainer: {
    flex: 0
  },

  bottomTextContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },

  bottomText:{
    fontFamily: 'Quicksand_Book',
  },

  textBold:{
    fontFamily: 'Quicksand_Bold',
  },

  input: {
    fontFamily: 'Quicksand_Book',
  }

});