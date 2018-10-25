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
import {createStackNavigator,DrawerNavigator} from 'react-navigation';

export default class forgotPassword extends Component{ 
   
    //Drawer navigation
    static navigationOptions ={
        drawerLabel: () => null
      };

    constructor(props){
        super(props);
        this.state={
            email:"",
        };   
    }

    //on press Forget password 
    onForgetPassword=()=>{
        firebase.auth().sendPasswordResetEmail(this.state.email.trim()).then(function() {
            // Email sent.
            Alert.alert("reset email sent");
            this.props.navigation.navigate("Home");
          }).catch(function(error) {
            // An error happened.
            console.log(error)
            Alert.alert("error");
          });
       
    }

    render(){    
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:50,backgroundColor:'#3498db'}}>
                <Text style={{fontSize:25}}>Reset Password</Text>
                <View style={{padding:10}}/>
                <TextInput style={{width:200,height:40, borderWidth:0}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email:text})}}
                        placeholder='email'
                        placeholderTextColor='white'
                        keyboardType='email-address'
                />
                <View style={{padding:10}}/>

                <Button title="submit" onPress={this.onForgetPassword}/>
            </View>
        )
    }
   
}

const styles = StyleSheet.create({});




