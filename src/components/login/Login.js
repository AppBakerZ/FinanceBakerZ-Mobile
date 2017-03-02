import React, { Component } from 'react';
import { Image } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle'
import {Button, Container, Content, Form, Item, Input, Label, Text} from 'native-base';

export default class Login extends Component {
    render() {
        return (
          <Container>
            <Content>
              <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={LoginStyles.backgroundImage} >
                <Content contentContainerStyle={{alignItems: 'center'}}  style={{marginTop: 100 }} >
                  <Image source={require('FinanceBakerZ/src/images/logo-final.png')} style={LoginStyles.logo} />
                </Content>
                <Content style={{marginTop: 50}} >
                  <Form>
                    <Item floatingLabel last>
                      <Label>Username</Label>
                      <Input />
                    </Item>
                    <Item floatingLabel last>
                      <Label>Password</Label>
                      <Input />
                    </Item>
                    <Text style={{textAlign: 'right', marginTop: 20, marginBottom: 20}}>Forgot Password</Text>
                    <Button success full large>
                      <Text>SIGN IN</Text>
                    </Button>
                  </Form>
                </Content>
              </Image>
            </Content>
          </Container>
          );
    }
}

/*

<TouchableHighlight
onPress={this.props.onPushRoute.bind(null, {type: 'push', key: 'register'})}>
<Text>
  Register
</Text>
</TouchableHighlight >
*/
