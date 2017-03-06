import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class Button extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <TouchableOpacity style={[styles.button, this.props.style]} onPress={this.props.onPress} activeOpacity={0.85}

      >
        <Text style={styles.title}>{this.props.title || 'Button'}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00719b',
    width: null,
    alignItems : 'center'
  },
  title: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Quicksand_Book'
  }
});