'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class ViewContainer extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {

    return (
      <View style={[styles.viewContainer, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  }
});