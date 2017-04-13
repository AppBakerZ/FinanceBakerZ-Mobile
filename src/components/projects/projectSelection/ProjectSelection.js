import React, {Component} from 'react';
import { Text } from 'react-native';
import { ProjectSelectionStyles } from 'FinanceBakerZ/src/components/projects/projectSelection/ProjectSelection';
import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

export default class ProjectSelectionScreen extends Component{

  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit }); // setting submit function from Routes to this.submit function
  }

  submit(){
    alert('Im clicked!')
  }



  render(){

    return(
      <Text>asdfadsf</Text>
    );
  }
}
