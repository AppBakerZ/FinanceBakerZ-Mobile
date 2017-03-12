import React, { Component } from 'react';
import Projects from 'FinanceBakerZ/src/components/projects/Projects'

export default class ProjectsScreen extends Component {
    render() {
        return (
            <Projects {...this.props} />
        );
    }
}