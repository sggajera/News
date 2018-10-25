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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class detailNews extends Component{

    static navigationOptions ={
        drawerLabel: () => null
      };
    constructor(props){
        super(props)
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
        
        this.state={
            dataSource:ds,
            item:this.props.navigation.state.params.data,
            comment:"",
        }
        this.itemsRef=firebase.database().ref().child('news').child(this.state.item.id).child('comment')
    }

    componentWillMount(){
        this.getItems(this.itemsRef);     
    }
    componentDidMount(){
        this.getItems(this.itemsRef);
    }

//On hamburger press
    onHamburgerPress=()=>{
        this.props.navigation.openDrawer();
    }

//Get comments from firebase
    getItems=(itemsRef)=>{
        itemsRef.on('value',(snap)=>{
            let item=[]
            snap.forEach((child)=>{
                item.push({
                   comment:child.val().comment,
                   user:child.val().user 
            })         
        })
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(item),     
      });   
    });
}  

//push comments into firebase
    onCommentPress=()=>{
     let data;
        if(firebase.auth().currentUser){
           data ={
               comment:this.state.comment,
               user:firebase.auth().currentUser.email
           }
        this.itemsRef.push(data)
           this.setState({
               comment:""
           })
        }  
        else{
            Alert.alert("You need to login") 
        }
    }

    renderRow(item){
        return(
                <View style={{alignItems:'flex-start',padding:5,margin:5}}>
                    <Text style={{ fontSize: 15, color:'black', textDecorationLine:'underline'}}>{item.user}</Text>
                    <Text style={{fontSize:15}}>{item.comment}</Text>
                </View>
        )
      }
      
    render(){
        return(    
        <View style={{flex:1}}> 
        <View >
        <Header
              placement="left"
              leftComponent={<View style={{alignItems:"center",justifyContent:"center"}}><Icon
              name='menu' size={25} color='white' underlayColor='grey'
              onPress={this.onHamburgerPress}  
              /></View>}
              centerComponent={{ text: 'Details', style: { color: '#fff' } }}
              outerContainerStyles={{ backgroundColor: '#3498db',height:50}}
            /> 
        </View>
          <View style={styles.detailNews}>
            <ScrollView contentContainerStyle={styles.contentContainer}>  
                <Image style={{width: 400,height: 200, marginTop:5}} source={{uri:this.state.item.image}}/>
                <Text style={styles.textStyle}>{this.state.item.title}</Text>
                <Text style={styles.newsnews}>  
                    <Text style={styles.news}>{this.state.item.news}</Text>
                </Text> 
                
                <View style={{flex:1,alignItems:'center',justifyContent:'center',margin:5}}>  
                <Text style={{margin:5}}>Comments:</Text>  
                <TextInput style={{width:300,height:50, borderWidth:0}}
                            value={this.state.comment}
                            onChangeText={(text)=>{this.setState({comment:text})}}
                /> 
                        <View style={{padding:5}}/>
                    <Button title="Post" onPress={this.onCommentPress}/>
                <View style={{padding:10,justifyContent:'flex-start',alignItems:'flex-start'}}/>
                    <ListView dataSource = {this.state.dataSource} renderRow={this.renderRow}/>
                </View>
            </ScrollView>
        </View>
        </View>
        )
    }   
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize: 20,
        margin: 10,
        color:'black' ,
        textDecorationLine:'underline',
        marginLeft:10
   },

    newsnews:{
        fontSize:15,
        textAlignVertical:'center',
        margin:20,
        textAlign:'justify',
        alignItems:'center',
        justifyContent:'center',
    },

    contentContainer: {
        paddingVertical: 20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },

    detailNews:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        margin:10 ,
        elevation:10
    }    
    
  });




