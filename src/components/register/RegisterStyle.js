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
    flex: 0,
    marginTop: 70
  },

  btn:{
    marginTop: 130,
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
    paddingTop: 20,
    paddingBottom: 20
  },

  textBold:{
    fontFamily: 'Quicksand_Bold',
  },

  input: {
    fontFamily: 'Quicksand_Book',
  }

});