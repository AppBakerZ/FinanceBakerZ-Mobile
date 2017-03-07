import React, { Component } from 'react';
import { View, Image, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { RegisterStyles } from 'FinanceBakerZ/src/components/register/RegisterStyle'
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import Button from 'FinanceBakerZ/src/components/button/Button';

import Icon from 'FinanceBakerZ/src/icons/CustomIcons';

export default class Register extends Component {
    render() {
      return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={RegisterStyles.backgroundImage} >
                    <View>
                        <Text style={RegisterStyles.topHeading}>Sign Up</Text>
                    </View>
                    <KeyboardAvoidingView>
                    <ScrollView style={RegisterStyles.formContainer}>
                       <View>
                           <Icon size={15} name="Person" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Username'
                             style={RegisterStyles.input}
                             placeholderStyle={RegisterStyles.input}
                             autoCorrect={false}
                             onSubmitEditing={()=> {this.email.focus()}}
                           />
                       </View>
                       <View>
                           <Icon size={15} name="Email" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Email'
                             keyboardType="email-address"
                             style={RegisterStyles.input}
                             placeholderStyle={RegisterStyles.input}
                             autoCorrect={false}
                             ref={(ref) => {this.email = ref}}
                             onSubmitEditing={()=> {this.pass.focus()}}

                           />
                       </View>
                       <View>
                           <Icon size={15} name="Password" style={RegisterStyles.inputIcon} ></Icon>
                           <TextInput
                             placeholder='Password'
                             secureTextEntry
                             autoCorrect={false}
                             style={RegisterStyles.input}
                             placeholderStyle={RegisterStyles.input}
                             ref={(ref) => {this.pass = ref}}

                           />
                       </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                        <View style={RegisterStyles.btnContainer}>
                            <Button
                              title="Sign Up"
                              style={RegisterStyles.btn}
                            />
                        </View>
                        <View style={RegisterStyles.bottomTextContainer}>
                            <Text style={RegisterStyles.bottomText}>
                                Already have an account?
                            </Text>
                            <TouchableOpacity onPress={this.props.navigate.bind(null, 'pop')}>
                                <Text
                                  style={RegisterStyles.textBold}
                                > Sign In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </ViewContainer>


        );
    }
}

