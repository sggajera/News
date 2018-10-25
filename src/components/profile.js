import React,{ Component }  from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Button,
  Alert,
  ListView
} from 'react-native';
import * as firebase from 'firebase'
import {Header} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class profile extends Component{

    static navigationOptions ={
        drawerLabel: () => {return(
                <View style={styles.navigationView}>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Icon type='MaterialCommunityIcons' name='face-profile' color='#3498db' size={25}/>
                        <Text style={styles.navText}>Profile</Text>
                    </View>
                </View>
       )}
      };
    constructor(props){
        super(props)
    
        
        this.state={
           
        }
        //this.itemsRef=firebase.database().ref().child('news').child(this.state.item.id).child('comment')
    }

//On hamburger press
onHamburgerPress=()=>{
        this.props.navigation.openDrawer();
}

//Get comments from firebase


//push comments into firebase
   
    render(){
        return(    
        <View style={{flex:1}}> 
            <View >
                <Header placement="left"
                        leftComponent={<View style={{alignItems:"center",justifyContent:'center'}}><Icon
                                            name='menu' size={25} color='white' underlayColor='grey'
                                            onPress={this.onHamburgerPress}  
                                            /></View>}
                        centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
                        outerContainerStyles={{ backgroundColor: '#3498db',height:50}}     
                /> 
             </View>

            <View style={styles.profile}>
                    <Text>Sanket gajera</Text>
            </View>
        </View>
        )
    }   
}

const styles = StyleSheet.create({
    profile:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        margin:10 ,
        elevation:10
    },

    navigationView:{
        flex:1,
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
        }
})
 




