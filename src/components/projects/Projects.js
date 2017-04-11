import React, { Component, PropTypes } from 'react';
import { View, Text} from 'react-native';
import { ProjectsStyles } from 'FinanceBakerZ/src/components/projects/ProjectsStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import ProjectTabScreen from 'FinanceBakerZ/src/components/projects/ProjectTabScreen';
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
        <ProjectTabNavigator />
      </ViewContainer>
    );
  }
}


const ProjectTabNavigator = TabNavigator({
  'ALL': {
    screen: ProjectTabScreen
  },
  'THIS WEEK': {
    screen: ProjectTabScreen
  },
  'THIS MONTH': {
    screen: ProjectTabScreen
  },
  'THIS YEAR': {
    screen: ProjectTabScreen
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#DADADA',
    },
    labelStyle: {
      fontFamily: 'QuicksandBook-Regular'
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    tabStyle: {
      borderLeftColor: '#CFCFCF',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderRightColor: '#CFCFCF'
    },
    activeTintColor: 'white',
    inactiveTintColor: 'black',
    activeBackgroundColor: '#fff',
    inactiveBackgroundColor : '#DADADA',
  }
});

export default createContainer((props) => {
  const projectsHandle = Meteor.subscribe('projects', {
    limit: 20
  });

  return {
    projectsReady: projectsHandle.ready(),
    projects: Meteor.collection('projects').find({})
  };
}, Projects);