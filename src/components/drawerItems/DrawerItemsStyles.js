import {StyleSheet} from 'react-native';

export const DrawerItemsStyles = StyleSheet.create({

  container: {
    flex: 1
  },

  item: {
    flex: 2.3,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1'
  },

  icon: {
    flex: 0.2,
    textAlign: 'center'
  },

  drawerText: {
    flex: 1,
    fontFamily : 'QuicksandBook-Regular',
    fontSize: 15
  },

  bottomContainer: {
    flex: 12
  }

});