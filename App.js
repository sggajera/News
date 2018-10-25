/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import detailNews from './src/components/detailNews';
import login from './src/components/login';
import signup from './src/components/signup';
import forgotPassword from './src/components/forgotPassword';
import profile from './src/components/profile';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  Image,
  AppRegistry,
  Alert,
  ScrollView,
  AsyncStorage
} from 'react-native';
import {createStackNavigator,DrawerNavigator} from 'react-navigation';
import {
  Container,
  Content,
} from 'native-base';
import * as firebase from 'firebase';
import {Header,Button} from 'react-native-elements';
//import {Icon} from 'react-native-vector-icons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const firebaseConfig={
    apiKey: "AIzaSyCvi5VYLynlRLzUSFaLX1M6D6eijugqFn8",
    authDomain: "news-39de1.firebaseapp.com",
    databaseURL: "https://news-39de1.firebaseio.com",
    projectId: "news-39de1",
    storageBucket: "news-39de1.appspot.com",
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {

  static navigationOptions ={
    drawerLabel: () => {return(
            <View style={styles.navigationView}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Icon type='MaterialCommunityIcons' name='home' color='#3498db' size={25}/>
                    <Text style={styles.navText}>Home</Text>
                </View>
            </View>
   )}
  };

  constructor(props){
    super(props);
   
    let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
   
    this.state={
      itemDataSource:ds,
      storage:ds,
      username:{},
      isAuthenticated:false
    } 
  
    this.itemsRef=this.getRef().child('news');
    this.renderRow=this.renderRow.bind(this);    
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged=(user)=>{
    this.setState({
        isAuthenticationReady:true,
        isAuthenticated: !!user,
        username:user
    })
}

  getRef(){
    return firebaseApp.database().ref();
  }
  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
  }
  
  getItems(itemsRef){   
   itemsRef.on('value',(snap)=>{
    let items=[]; 
     snap.forEach((child)=>{
       items.push({
         title:child.val().title,
         image:child.val().image,  
         news:child.val().detail, 
         date:child.val().date,
         id:child.key,
       });  
     });
     
    
     this.setState({
      itemDataSource:this.state.itemDataSource.cloneWithRows(items.reverse()) 
    }); 
   });
  }

  onHamburgerPress=()=>{
    this.props.navigation.openDrawer();
  }
  
  onSignOut=()=>{
    if (firebase.auth().signOut()){
        Alert.alert('You are signed out')
     this.setState({isAuthenticated:false})
    }
   }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          elevation:10,
          padding:10,
        }}
      />
    );
  }

  renderRow(item){
    const {navigate}=this.props.navigation; 
    return(
      <TouchableOpacity onPress={()=>navigate('detailNews',{data:item})}>
          <View style={{flex:1,alignContent:'center',alignItems:'center',padding:5 ,margin:7}}>
            <Image style={styles.stretch} source={{uri:item.image}}/>
                <View style={{flex:2,alignItems:"flex-end"}}>                
                      <Text style={styles.textStyle} numberOfLines={2}>{item.title}</Text>
                      <Text style={{fontSize:15,textAlign:'auto',margin:3}} numberOfLines={3}>{item.news}</Text>       
                      <Text style={{margin:5,color:'black',fontSize:10,padding:0}}>{item.date}</Text>
                </View>
           </View>
      </TouchableOpacity>
    )
  }

  render() {

  if(this.state.isAuthenticated){  
    return (
    <View style={{flex:1}}>  
        <Header placement="left"
                leftComponent={<Icon  name='menu' size={25} color='white' underlayColor='grey' onPress={this.onHamburgerPress}/>}                                  
                centerComponent={<View style={styles.headerTitle}><Text style={styles.headerText}>Home</Text></View>}
                rightComponent={<TouchableOpacity onPress={this.onSignOut}>
                                    <Text style={{color:'white'}}>Log-out</Text>
                                </TouchableOpacity>}
                outerContainerStyles={{ backgroundColor: '#3498db',height:50}}    
                />   
    <View style={styles.emailView}>
      <Text style={{ color:'white',fontWeight:'bold'}}>{this.state.username.email}</Text>
    </View>
    <View style={styles.container}>
            <ListView dataSource = {this.state.itemDataSource} 
                      renderRow={this.renderRow} 
                      renderSeparator= {this.ListViewItemSeparator}/>
    </View>
    </View>
    );
  }

  else{
    return(
    <View style={{flex:1}}>  
          <Header  placement="left"
                  leftComponent={<View style={{alignItems:"center",justifyContent:"center"}}><Icon
                  name='menu' size={25} color='white' underlayColor='grey'
                  onPress={this.onHamburgerPress}  
                  /></View>}
                  centerComponent={<View style={styles.headerTitle}><Text style={styles.headerText}>Home</Text></View>}
                  outerContainerStyles={{ backgroundColor: '#3498db',height:50}}/>

          <View style={styles.container}>
                <ListView dataSource = {this.state.itemDataSource} 
                          renderRow={this.renderRow} 
                          renderSeparator= {this.ListViewItemSeparator} />
          </View>
    </View>
    )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:10,
    elevation:25,
    backgroundColor:'white'
  },
  emailView:{
    alignItems:'center',
    margin:3,
    backgroundColor:'#3498db',
    elevation:10,
    padding:3,
    borderRadius:5,
    margin:10,  
  },

  stretch: {
    width: 400,
    height: 200,
    flex:1,  
  },
  textStyle:{
    fontSize: 15,
    margin: 3,
    color:'black' ,
    textDecorationLine:'underline'
  },
  separator: {
    flex: 1,
  },

  navigationView:{
    flex:3,
    backgroundColor:'white',
    alignItems:'flex-start',
    justifyContent:'center',
    margin:5 ,
    elevation:5,
    padding:5   
},
  navText:{
    fontSize:20,
    fontWeight:'bold',
    color:'grey',
    margin:5
},

  headerTitle:{
    justifyContent:'center',
    alignItems:'center',
    
},

  headerText:{
    color:'white',
    fontSize:20,
} 
});


const Drawer=DrawerNavigator(
  {
  Home:{
    screen:App,
    navigationOptions: {
      title: 'Home' // Text shown in left menu
    }
  },
  Login:{
    screen:login,
    navigationOptions: {
      title: 'Login' // Text shown in left menu
    }
  },
 
  signup:{screen:signup},
  fotgotPassword:{screen:forgotPassword},
  detailNews:{screen:detailNews},
  profile:{screen:profile,
    navigationOptions: {
      title: 'Profile' // Text shown in left menu
    }
  }
},

)


AppRegistry.registerComponent('newsapp',()=>Drawer);