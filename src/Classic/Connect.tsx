import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import axios from 'axios';
import { Typography } from "../Components/Typography";
import { Title } from "../Components/Title";
import { Divider } from "../Components/Divider";

export default function Connect(props:any) {

  const MainURL = "https://www.studentsclassic.com"

  const [appUseCount, setAppUseCount] = useState([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/appadmin/appusecount`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setAppUseCount(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>

      <ScrollView style={{flex:1}}>
     
      <View style={{ margin: 20 }}>
        <Typography marginBottom={5}>접속 현황</Typography>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
          <View style={{width:'50%'}}>
            <Typography>날짜</Typography>
          </View>
          <View style={{width:'50%'}}>
            <Typography>접속수</Typography>
          </View>
        </View>
        {
          appUseCount.slice(0, 15).map((item:any, index:any)=>{
            return(
              <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}} key={index}>
                <View style={{width:'50%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.date}</Typography>
                </View>
                <View style={{width:'50%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.count}</Typography>
                </View>
              </View>
            )
          })
        }
      </View>

      <Divider height={8} marginVertical={5}/>
      

      </ScrollView>
    </View> 
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  }
});