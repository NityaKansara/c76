import React from 'react';
import { Text,View,TextInput,Text,Alert,TouchableOpacity,KeyboardAvoidingView, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import db from "../config.js";

export default class LoginScreen extends React.Component{
   
   constructor(){
       super();
       this.state={
           email:"",
           password:""
       }  
    }
    
    login = async (email,password)=>{
        if(email&&password){
            try{
                const response=await firebase.auth().signInWithEmailAndPassword(email,password)
                if(response){
                    this.props.navigation.navigate("Transaction")
                }
            }
            catch(error){
                switch(error.code){
                    case "auth/user-not-found": 
                    Alert.alert("user does not exist")
                    break;

                    case "auth/invalid-email": 
                    Alert.alert("incorrect email or password")
                    break;
                }
            }
        }else{
            Alert.alert("enter email and password")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView>
                <View>
                    <Image
                    source={require("../assets/booklogo.jpg")}
                    style={{ width: 200, height: 200 }}
                    />
                    <Text style={{ textAlign: "center", fontSize: 30 }}>Wily</Text>
                </View>
                <View>
                    <TextInput placeholder="email address" onChangeText={(Input)=>{
                        this.setState({email:Input}) 
                    }} style={styles.loginBox} keyboardType="email-address"/>

                    <TextInput placeholder="password" onChangeText={(Input)=>{
                        this.setState({password:Input}) 
                    }} style={styles.loginBox} secureTextEntry={true}/>
                </View>
                <View>
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.login(this.state.email,this.state.password)
                    }}>
                        <Text style = {{textAlign: 'center'}}>
                            login
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    loginBox: {
        width: 300,
        height: 40,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    button: {
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7
    }
});