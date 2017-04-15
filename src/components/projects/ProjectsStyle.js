import {StyleSheet} from 'react-native';

export const ProjectsStyles = StyleSheet.create({

    filterContainer : {
        flex : 1,
        backgroundColor : '#dadadada',
        justifyContent : 'center',
    },

  listViewContainer: {
      flex : 8,
  },
    filterDiv:{
      flexDirection : 'row',
    },
    filterText:{
     flex : 7,
        marginLeft : 25
    },
    filterIcon:{
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },

  listViewContentLeft: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: 'center',
  },

  listViewContentRight:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  icons: {
    flex: 1,
    textAlign: 'center'
  },

  iconText: {
    flex: 2,
    fontFamily: 'QuicksandBook-Regular',
      fontSize : 15,
  },
    currencydata:{
        flex : 1
    },
  contentRightText: {
        flex : 4,
    fontFamily: 'QuicksandBook-Regular',
      fontSize : 15,


  },
    listViewContaineritem:{
        borderColor : '#cdcdcd',
        borderWidth: 1,
        borderTopColor : '#ffffff',
    },
    BankText:{
        fontFamily: 'QuicksandBook-Regular',
    },
    loader:{
        flex :1,
        justifyContent : 'center',
        alignItems : 'center'

    }

});