import React from 'react';
import { Text, View,FlatList,ScrollView,TextInput,TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import db from "../config.js";

export default class Searchscreen extends React.Component {
   constructor(){
    super();
    this.state={
      allTransactions:[],
      lastVisibleTransaction:null,
      search:""
    }
   }
  
  
  componentDidMount=async()=>{
    const query = await db.collection("transactions").limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }
  
  fetchMoreTransactions=async()=>{
    const query = await db.collection("transactions").startAfter(this.state.lastVisibleTransaction).limit(10).get()
    query.docs.map((doc)=>{
      this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTransaction: doc
      })
    })
  }

  searchTransactions=async(text)=>{
    var text=text.split("").toUpperCase()

    if(text[0] === 'B'){
      const query = await db.collection("transactions").where("bookId", "==", text).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }else if(text[0] === 'S'){
      const query = await db.collection("transactions").where("studentId", "==", text).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions:[...this.state.allTransactions,doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
  }
  
  render() {
      return (
        <View style={styles.container}>
          <View style={styles.searchBar}>
            <TextInput 
              style={styles.bar}
              placeholder={"Enter BookId or StudentId"}
              onChangeText={(text)=>{
                this.setState({search:text})
              }}/>
            <TouchableOpacity
              style = {styles.button} onPress={()=>{
                this.searchTransactions(this.state.search)
              }}>
              <Text>
                Search
              </Text>
              
            </TouchableOpacity>
          </View>
        <FlatList 
        data={this.state.allTransactions}
        renderItem={({element})=>(
          <View style = {{borderBottomWidth: 2}}>
            <Text>{"Book ID: "+ element.bookId}</Text>
            <Text>{"Student ID: "+ element.studentId}</Text>
            <Text>{"Transaction Type: "+ element.transactionType}</Text>
            <Text>{"Date: "+ element.date.toDate()}</Text>
          </View>
        )}
        keyExtractor={(element,index)=>{
          index.toString()
        }} 
        onEndReached={this.fetchMoreTransactions }
        onEndReachedThreshold={0.7}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    conatainer: {
      flex: 1,
      marginTop: 20
    },
    searchBar: {
      height: 40,
      width: 'auto',
      borderWidth: 0.5,
      alignItems: 'center',
      backgroundColor: 'grey',
      flexDirection:"row"
    },
    bar: {
      borderWidth: 2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    button:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  });