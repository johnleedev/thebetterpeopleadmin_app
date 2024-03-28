import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import axios from 'axios';
import { Typography } from "../Components/Typography";
import { Title } from "../Components/Title";
import { Divider } from "../Components/Divider";
import Loading from "../Components/Loading";

const Stack = createNativeStackNavigator();

interface ChurchsProps {
  id: number;
  churchName : string;
  religiousbody : string;
  churchAddress: string;
  churchPhone: string;
  churchPastor: string;
}

const MainURL = "https://www.churchbooklet.com"

export default function Churchs(props:any) {

  const [churchList, setChurchList] = useState<ChurchsProps[]>([]);
  const fetchPosts = () => {
    axios.get(`${MainURL}/churchs/getchurchs`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      setChurchList(copy);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    churchList.length === 0
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
      <View style={styles.container}>

      <ScrollView style={{flex:1}}>
      <Title title="교회별 현황" enTitle="userList"/>
      <View style={{ margin: 20 }}>
        <Typography marginBottom={5}>등록 교회수 : {churchList.length}</Typography>
        {
          churchList.map((item:any, index:any)=>{
            return (
              <View key={index} style={{marginVertical:10}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                  <Typography fontSize={18}>{item.churchName}</Typography>
                  <Typography fontSize={14} color='#8C8C8C'>{item.churchAddressCity} {item.churchAddressCounty}</Typography>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                  <Typography fontSize={14} color='#8C8C8C'>{item.religiousbody}</Typography>
                  <View style={{flexDirection:'row'}}>
                    <Typography fontSize={14} color='#8C8C8C'>{item.churchPastor}  </Typography>
                    <Typography fontSize={14} color='#8C8C8C'>{item.churchPhone}</Typography>
                  </View>
                </View>
                <Divider/>
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
