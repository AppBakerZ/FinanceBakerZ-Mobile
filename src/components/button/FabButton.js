import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MKButton, MKColor } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FabButton extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const ColoredFab = MKButton.coloredFab()
            .withStyle(styles.fab)
            .build();
        return(
            <ColoredFab
                backgroundColor = {MKColor.Teal}
                onPress = {this.props.onPress}

            >
                <Icon name = {this.props.iconName} size = {28} color = {this.props.iconColor}/>
            </ColoredFab>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#ff9c00',
        position: 'absolute',
        right: 30,
        bottom: 30
    }
});