import React,{ Component }  from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from 'react-native';

import * as firebase from 'firebase';
import {Header} from 'react-native-elements'
export default class signup extends Component{   
    static navigationOptions ={
        drawerLabel: () => null
      };
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            passwordConfirmation:""
        };   
        this.onSignUpPress=this.onSignUpPress.bind(this);
    }

    onSignUpPress=()=>{
        if(this.state.password!=this.state.passwordConfirmation){
            Alert.alert("password does not match");
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(()=>{

            },(error)=>{
                Alert.alert(error.message);
            });
    }
    
    render(){    
        return(
        
        <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:100,backgroundColor:'#3498db'}}>
        
        <Text style={{fontSize:25}}>Create account</Text>
                <TextInput style={{width:200,height:50, borderWidth:0}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email:text})}}
                        placeholder='email'
                        placeholderTextColor='white'
                        keyboardType='email-address'
                />

                <View style={{padding:10}}/>

                <TextInput style={{width:200,height:40, borderWidth:0}}
                        value={this.state.password}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        placeholder='password'
                        secureTextEntry={true}
                        placeholderTextColor='white'
                />

                 <View style={{padding:10}}/>

                 <TextInput style={{width:200,height:40, borderWidth:0}}
                        value={this.state.passwordConfirmation}
                        onChangeText={(text)=>{this.setState({passwordConfirmation:text})}}
                        placeholder='confirm password'
                        secureTextEntry={true}
                        placeholderTextColor='white'
                />
                 <View style={{padding:10}}/>
                <Button title="SignUp" onPress={this.onSignUpPress}/>               
            </View>
        )
    } 
}
const styles = StyleSheet.create({});




