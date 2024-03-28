import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import axios from 'axios';
import { Typography } from "../Components/Typography";
import { Title } from "../Components/Title";
import { Divider } from "../Components/Divider";
import Loading from "../Components/Loading";

const Stack = createNativeStackNavigator();

const MainURL = "https://www.churchbooklet.com"

export default function Users(props:any) {

  const [userList, setUserList] = useState([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/appadmin/userlist`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setUserList(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const group_copy = userList.map((e:any) => e.userChurch);
  const group_name :any = [...new Set(group_copy)];
  const group_namecopy = group_name.sort().reverse();
  const result = []

  for (let a = 0; a < group_namecopy.length; a++) {
    let copy = userList.filter((e:any) => e.userChurch === `${group_namecopy[a]}`);
    let nullcopy = userList.filter((e:any) => e.userChurch === null);
    const nullNum = nullcopy.length;
   
    if (group_namecopy[a] === null) {
      result[a] = { group : `null`, num : nullNum }
    } else {
      result[a] = { group : `${group_namecopy[a]}`, num : copy.length }
    }
  } 

  return (
    userList.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
      <View style={styles.container}>

      <ScrollView style={{flex:1}}>
      <Title title="교회별 회원 현황" enTitle="userList"/>
      <View style={{ margin: 20 }}>
        <Typography marginBottom={5}>회원수 : {userList.length}</Typography>
        
        {
          result.map((item:any, index:any)=>{
            return (
              <View key={index} style={{flexDirection:'row'}}>
                <Typography fontSize={14} fontWeight="normal">{item.group === '' ? '없음' : item.group} :  </Typography>
                <Typography fontSize={14} fontWeight="normal">{item.num}</Typography>
              </View>
            )
          })
        }
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
          <View style={{width:'25%'}}>
            <Typography>이름</Typography>
          </View>
          <View style={{width:'30%'}}>
            <Typography>교회</Typography>
          </View>
          <View style={{width:'15%'}}>
            <Typography>교회키</Typography>
          </View>
          <View style={{width:'15%'}}>
            <Typography>인증키</Typography>
          </View>
          <View style={{width:'10%'}}>
            <Typography>버전</Typography>
          </View>
        </View>
        {
          userList.map((item:any, index:any)=>{
            return(
              <View style={{flexDirection:'row', justifyContent:'space-between'}} key={index}>
                <View style={{width:'25%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.userName}</Typography>
                </View>
                <View style={{width:'30%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.userChurch}</Typography>
                </View>
                <View style={{width:'15%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.userChurchKey}</Typography>
                </View>
                <View style={{width:'15%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.userAuthKey}</Typography>
                </View>
                <View style={{width:'10%'}}>
                  <Typography fontSize={14} fontWeight="normal">{item.version}</Typography>
                </View>
              </View>
            )
          })
        }
      </View>



      </ScrollView>
    </View> 
    )
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section : {
    padding:20
  }
});
