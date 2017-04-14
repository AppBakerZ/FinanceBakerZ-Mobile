import React, { Component, PropTypes } from 'react';
import { View, Text} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import { TabNavigator } from 'react-navigation';

import Meteor, { createContainer } from 'react-native-meteor';

class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        const { navigate } = this.props.navigation;
        console.log('projects :', this.props.projects)
        return (
            <ViewContainer>
            </ViewContainer>
        );
    }
}

export default createContainer((props) => {
    const projectsHandle = Meteor.subscribe('projects', {
        limit: 20
    });

    return {
        projectsReady: projectsHandle.ready(),
        projects: Meteor.collection('projects').find({})
    };
}, Projects);