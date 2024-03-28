import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../Components/Typography';
import { Title } from '../Components/Title';
import Users from './Users';
import Churchs from './Churchs';
import Connect from './Connect';
import Suggestion from './Suggestion';
// import Users from './Users';
// import Connect from './Connect';
// import RequestSong from './RequestSong';
// import Suggestion from './Suggestion';


export default function ChurchMain (props : any) {

   // 커스텀 탭 버튼 ----------------------------------------------------------------------
  const [currentTab, setCurrentTab] = useState(1);
 
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <TouchableOpacity
       style={{width:70, alignItems:'center', paddingTop:10}}
       onPress={() => setCurrentTab(tabNum)}
     >
       <Typography fontSize={14} color={currentTab === tabNum ? '#333' : '#8B8B8B'}>{title}</Typography>
       {
         currentTab === tabNum
         ? <View style={{width:60, height:2, backgroundColor:'#333', marginTop:10}}></View>
         : <View style={{width:60, height:2, backgroundColor:'#fff', marginTop:10}}></View>
       }
     </TouchableOpacity>
    )    
  };

  return (
    <View style={styles.container}>

      {/* title */}
      <Title title='교회수첩' enTitle='ChurchBooklet'/>
      
      <View style={{width:'100%', flexDirection: 'row', alignItems: 'flex-start', paddingLeft:10,
                  borderBottomWidth:1, borderBottomColor:"#EFEFEF", marginBottom:20}}>
        <SelectMenu tabNum={1} title='교회관리'/>
        <SelectMenu tabNum={2} title='회원관리'/>
        <SelectMenu tabNum={3} title='접속수'/>
        <SelectMenu tabNum={4} title='문의하기'/>
      </View>
      
      {currentTab === 1 && <Churchs navigation={props.navigation}/>}
      {currentTab === 2 && <Users navigation={props.navigation}/>}
      {currentTab === 3 && <Connect navigation={props.navigation}/>}
      {currentTab === 4 && <Suggestion navigation={props.navigation}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});


