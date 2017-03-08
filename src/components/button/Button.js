import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };



  }
  render() {

    let activityIndicator;
    if(this.props.loading){
      activityIndicator = (<ActivityIndicator color="#DEB342"  size="small" style={styles.activityIndicator}/>);
    }


    return (
      <TouchableOpacity disabled={this.props.disabled} style={[styles.button, this.props.style]} onPress={this.props.onPress} activeOpacity={0.85}>
      <View style={styles.btnContainer}>
        <Text style={styles.title}>
          {this.props.title || 'Button'}
        </Text>
      </View>
        <View style={styles.activityIndicatorContainer}>
          {activityIndicator}
        </View>
      </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({


  btnContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  activityIndicatorContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    },

  button: {
    backgroundColor: '#00719b',
    width: null,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Quicksand_Book',
  }
});