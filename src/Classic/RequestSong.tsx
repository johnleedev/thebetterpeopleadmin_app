import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal,
          NativeSyntheticEvent, TextInputChangeEventData, Alert } from 'react-native';
import { Typography } from '../Components/Typography';
import axios from 'axios';
import Loading from '../Components/Loading';
import { Divider } from '../Components/Divider';
import DateFormmating from '../Components/DateFormmating';
import { SubTitle } from '../Components/SubTitle';

export default function RequestSong (props : any) {

  const MainURL = "https://www.studentsclassic.com"

  interface RequestSongsProps {
    id: number;
    sort : string;
    nation: string;
    songName : string;
    author : string;
    date : string;
    response : string;
  }
  interface RequestWordsProps {
    id: number;
    word : string;
    nation: string;
    date : string;
    response : string;
  }

  const [requestSongs, setRequestSongs] = useState<RequestSongsProps[]>([]);
  const [isResdataFalse, setIsResdataFalse] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/study/getrequestall/Song`).then((res) => {
      if (res.data) {
        setIsResdataFalse(false);
        let copy: any = [...res.data];
        copy.reverse();
        setRequestSongs(copy)
      } else {
        setIsResdataFalse(true);
      }
      
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  
  const renderPreview = (content : string) => {
    if (content?.length > 30) {
      return content.substring(0, 30) + '...';
    }
    return content;
  };

  return (
    (requestSongs.length === 0 && !isResdataFalse
    ?  (
    <View style={{flex:1, width:'100%', height:'100%'}}>
      <Loading /> 
    </View>
    ) : (
    <View style={styles.container}>

      <View style={{paddingHorizontal:20}}>
        {
          !isResdataFalse
          ?
          <ScrollView >
          {
            requestSongs.map((item:any, index:any)=>{
              return (
                <View key={index} >
                  <View
                    style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:10}}
                  >
                    <View style={{ width: '80%', }}>
                      <Typography >{renderPreview(item.songName)}</Typography>
                      <Typography fontSize={14} >{renderPreview(item.author)}</Typography>
                      <View style={{flexDirection:'row'}}>
                        <Typography fontSize={12} >{item.nation}</Typography>
                        <Typography fontSize={12} >{item.sort}</Typography>
                      </View>
                    </View>
                    <View style={{ width: '20%', alignItems: 'center' }}>
                      <Typography fontSize={12} >{DateFormmating(item.date)}</Typography>
                      <Typography fontSize={12} >{item.response}</Typography>
                    </View>
                  </View>
                  <Divider />
                </View>
              )
            })
          } 
          <View style={{height:250}}></View>
          </ScrollView>
          :
          <View style={{alignItems:'center', marginTop:20}}>
            <Typography fontSize={14} >등록된 항목이 없습니다.</Typography>
          </View>
        }
      </View>

    </View>
    )
  ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding:20
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent:'center',
    alignItems:'center',
  },
  selectButton : {
    width:'40%',
    height: 50,
    borderWidth:1, 
    borderRadius:5, 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
    justifyContent:'center'
  },
  selectDropdown : {
    width:'48%',
    borderWidth:1, 
    borderRadius:5, 
    borderColor:'#DFDFDF', 
    paddingHorizontal:15,
    paddingVertical:5,
    flexDirection:'row', 
    alignItems:'center',
  }

});


