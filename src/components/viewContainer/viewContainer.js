'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default class ViewContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {

    return (
      <View style={[styles.viewContainer, this.props.style]}>
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        {this.props.children}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1
  }
});