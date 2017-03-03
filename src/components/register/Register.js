import React, { Component } from 'react';
import { Image } from 'react-native';
import {  Icon, Left, Header, Button, Container, Content, Form, Item, Input, Label, Text} from 'native-base';

import { RegisterStyles } from 'FinanceBakerZ/src/components/register/RegisterStyle'

export default class Register extends Component {
    render() {
        return (
            <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={RegisterStyles.backgroundImage} >
                <Container>
                    <Header noShadow style={{backgroundColor: 'transparent', marginTop: 20}}>
                        <Left>
                            <Button transparent onPress={this.props.navigate.bind(null, 'pop')}>
                                <Icon name='arrow-back' style={{color: 'black', fontSize: 40}} />
                            </Button>
                        </Left>
                    </Header>
                    <Text style={{fontSize: 45, marginTop: 20, marginLeft: 30, color: 'green', fontWeight: 'bold'}}>Sign Up</Text>
                    <Content>
                        <Form style={{marginTop: 45}}>
                            <Item floatingLabel last>
                                <Label style={{marginLeft: 25}}>Name</Label>
                                <Input style={{marginLeft: 23}}/>
                            </Item>
                            <Item floatingLabel last>
                                <Label  style={{marginLeft: 25}}>Email</Label>
                                <Input
                                    keyboardType="email-address"
                                    style={{marginLeft: 23}}
                                    />
                            </Item>
                            <Item floatingLabel last>
                                <Label  style={{marginLeft: 25}}>Password</Label>
                                <Input
                                    style={{marginLeft: 23}}
                                    secureTextEntry
                                    />
                            </Item>
                            <Button block large success style={{marginTop: 125}} >
                                <Text>Sign Up</Text>
                            </Button>
                            <Text style={{marginTop: 20, textAlign: 'center'}}>
                                <Text>Already have an account?</Text>
                                <Text style={{fontWeight: 'bold'}} onPress={this.props.navigate.bind(null, 'pop')}> Sign In</Text>
                            </Text>
                        </Form>
                    </Content>
                </Container>
            </Image>

        );
    }
}

