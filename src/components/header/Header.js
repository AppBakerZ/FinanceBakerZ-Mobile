import React, { Component } from 'react';
import { NavigationExperimental, Text } from 'react-native';
import { HeaderStyles } from 'FinanceBakerZ/src/components/header/HeaderStyle'

const {
    Header: NavigationHeader,
    } = NavigationExperimental;

export default class Header extends Component {
    _back () {
        this.props.navigate('pop');
    }
    _renderTitleComponent (props) {
        return (
            <NavigationHeader.Title style={HeaderStyles.title} >
                <Text style={HeaderStyles.text}>{props.scene.route.key}</Text>
            </NavigationHeader.Title>
        );
    }
    render() {

        return this.props.scene.route.hideHeader ? null : <NavigationHeader
            {...this.props}
            renderTitleComponent={this._renderTitleComponent.bind(this)}
            onNavigateBack={this._back.bind(this)}
          />
    }
}

