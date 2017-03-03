import React, { Component } from 'react';
import { Image } from 'react-native';
import { LoginStyles } from 'FinanceBakerZ/src/components/login/LoginStyle'
import { Button, Container, Content, Form, Item, Input, Label, Text} from 'native-base';

export default class Login extends Component {
    render() {
        return (
            <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={LoginStyles.backgroundImage} >
                <Container>
                    <Content>
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
                                    <Input
                                        secureTextEntry
                                        />
                                </Item>
                                <Text style={{textAlign: 'right', marginTop: 20, marginBottom: 20, marginRight: 15, fontWeight: 'bold'}}>Forgot Password</Text>
                                <Button success full large>
                                    <Text>Sign In</Text>
                                </Button>
                                <Text style={{textAlign: 'center', marginTop: 20}}>
                                    Don't have an account?
                                    <Text
                                        style={{fontWeight: 'bold'}}
                                        onPress={this.props.navigate.bind(null, 'push', {key: 'Register'})}>
                                        Sign Up
                                    </Text>
                                </Text>
                            </Form>
                        </Content>
                    </Content>
                </Container>
            </Image>
        );
    }
}
