import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';

export default class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    

    render() {
        const { navigate } = this.props.navigation;

        return (
            <ViewContainer>
                <Text>Projects</Text>
            </ViewContainer>
        );
    }
}