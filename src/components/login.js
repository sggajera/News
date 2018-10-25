import React,{ Component }  from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import {createStackNavigator,DrawerNavigator} from 'react-navigation';
import * as firebase from 'firebase';
//import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';

export default class login extends Component{ 

    static navigationOptions ={
        drawerLabel: () => {return(
                <View style={styles.navigationView}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Icon type='MaterialCommunityIcons' name='login' color='#3498db' size={25}/>
                        <Text style={styles.navText}>LogIn</Text>
                    </View>
                </View>
       )}
      };

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            phoneNo:"",  
            isAuthenticationReady:false,
            isAuthenticated:false,
            username:{}
        };
        this.onCreateAccountPress=this.onCreateAccountPress.bind(this)   
       
    }

 
    onLoginPress=()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(()=>{
                this.props.navigation.navigate("Home");
            },(error)=>{
                Alert.alert(error.message)
            })
    }

    onOTPpress=()=>{
            console.log(this.state.phoneNo)
            var appVerifier = firebase.auth.RecaptchaVerifier;


            firebase.auth().signInWithPhoneNumber(this.state.phoneNo, true)
    .then(function (confirmationResult) {
      // SMS sent. Prompt user to type the code from the message, then sign the
      Alert.alert(confirmationResult)
      // user in with confirmationResult.confirm(code).
     
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
    }

    onCreateAccountPress(){
        this.props.navigation.navigate("signup");
    }

    render(){    
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:100,backgroundColor:'#3498db'}}>
            <Text style={{fontSize:25}}>Log In</Text>
                <TextInput style={{width:200,height:50, borderWidth:0}}
                        value={this.state.email}
                        onChangeText={(text)=>{this.setState({email:text})}}
                        placeholder='email'
                        placeholderTextColor='white'
                        keyboardType='email-address'
                />

                <View style={{padding:20}}/>

                <TextInput style={{width:200,height:50, borderWidth:0}}
                        value={this.state.password}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        placeholder='password'
                        secureTextEntry={true}
                        placeholderTextColor='white'
                />

                <View style={{padding:10}}/>
                <Button title=" login " onPress={this.onLoginPress} rounded='true' textStyle={{fontSize:15}}/>
                <View style={{padding:10}}/> 
                <Button title='create account' onPress={this.onCreateAccountPress} rounded='true'/>
                <View style={{padding:10}}/>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('fotgotPassword')}>
                    <Text>forgot password?</Text>
                </TouchableOpacity>

                  <TextInput style={{width:200,height:50, borderWidth:0}}
                        value={this.state.phoneNo}
                        onChangeText={(text)=>{this.setState({phoneNo:text})}}
                        placeholder='login with phone'
                        placeholderTextColor='white'
                />
                <Button title='submit' onPress={this.onOTPpress}/>

                <View style={{padding:10}}/>   
            </View>
        )
    }
   
}

const styles = StyleSheet.create({

    navigationView:{
        flex:1,
        backgroundColor:'white',
        alignItems:'flex-start',
        justifyContent:'center',
        margin:5 ,
        elevation:5,
        padding:5,
    },
    navText:{
        fontSize:20,
        fontWeight:'bold',
        color:'grey',
        margin:5
    }


});




