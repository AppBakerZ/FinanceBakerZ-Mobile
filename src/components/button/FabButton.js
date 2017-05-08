import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MKButton, MKColor } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class FabButton extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const ColoredFab = MKButton.coloredFab()
            .withStyle([styles.fab, this.props.style])
            .build();
        return(
            <ColoredFab
                backgroundColor = {MKColor.Teal}
                onPress = {this.props.onPress}
                disabled={this.props.disabled}
            >
                <Icon name = {this.props.iconName} size = {this.props.size || 28} color = {this.props.iconColor}/>
            </ColoredFab>
        )
    }
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#008142',
        position: 'absolute',
        right: 30,
        bottom: 30
    }
});