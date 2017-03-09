import {StyleSheet, Platform} from 'react-native';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

export const HeaderStyles = StyleSheet.create({
    text: {
      fontFamily: 'Quicksand_Bold'
    },

    title: {
      bottom: 0,
      left: APPBAR_HEIGHT,
      marginTop: STATUSBAR_HEIGHT,
      position: 'absolute',
      right: APPBAR_HEIGHT,
      top: 0,
    }



});