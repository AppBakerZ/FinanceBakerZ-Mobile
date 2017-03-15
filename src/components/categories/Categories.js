import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Icon} from 'react-native';
import { CategoriesStyles } from 'FinanceBakerZ/src/components/categories/CategoriesStyle';
import ViewContainer from 'FinanceBakerZ/src/components/viewContainer/viewContainer';
import CategoryIcon from 'FinanceBakerZ/src/icons/CategoryIcon';

export default class Categories extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ViewContainer>
                <Image source={require('FinanceBakerZ/src/images/app-background.png')} style={CategoriesStyles.backgroundImage}>
                    <ScrollView>
                        <View style={CategoriesStyles.main}>
                            <View style={CategoriesStyles.child1}>
                                <CategoryIcon name ='icons_automobile' style={{color: '#ffffff', textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>AUTOMOBILE</Text>
                            </View>
                            <View style={CategoriesStyles.child2}>
                                <CategoryIcon name ='icons_health-care' style={{color: '#ffffff', textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>HEALTHCARE</Text></View>
                        </View>
                        <View style={CategoriesStyles.main}>
                            <View style={CategoriesStyles.child2}>
                                <CategoryIcon name ='icons_food' style={{color: '#ffffff', textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>FOOD</Text></View>
                            <View style={CategoriesStyles.child1}>
                                <CategoryIcon name ='icons_automobile' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>AUTOMOBILE</Text></View>
                        </View>
                        <View style={CategoriesStyles.main}>
                            <View style={CategoriesStyles.child1}>
                                <CategoryIcon name ='icons_child-care' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>CHILD</Text></View>
                            <View style={CategoriesStyles.child2}>
                                <CategoryIcon name ='icons_coffee' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>COFFEE</Text></View>
                        </View>
                        <View style={CategoriesStyles.main}>
                            <View style={CategoriesStyles.child2}>
                                <CategoryIcon name ='icons_dinner' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>DINNER</Text></View>
                            <View style={CategoriesStyles.child1}>
                                <CategoryIcon name ='icons_automobile' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>AUTOMOBILE</Text></View>
                        </View>
                        <View style={CategoriesStyles.main}>
                            <View style={CategoriesStyles.child1}>
                                <CategoryIcon name ='icons_coffee' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>COFFEE</Text></View>
                            <View style={CategoriesStyles.child2}>
                                <CategoryIcon name ='icons_zakaat' style={{color: '#ffffff',  textAlign: 'center'}} size={130} />
                                <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 30}}>HEALTHCARE</Text></View>

                        </View>
                    </ScrollView>
                </ Image>

            </ViewContainer>

        );
    }
}


