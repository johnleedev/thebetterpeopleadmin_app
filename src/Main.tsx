import * as React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClassicMain from './Classic/ClassicMain';
import NursingMain from './Nursing/NursingMain';
import ChurchMain from './Church/ChurchMain';

const Tab = createBottomTabNavigator();

export default function Main (props : any) {
  
  return (
    <Tab.Navigator 
      sceneContainerStyle = {Platform.OS === 'android' ? styles.android : styles.ios}
      screenOptions={{
        headerShown : false,
        tabBarShowLabel : false,
        tabBarStyle: Platform.OS === 'android' ? styles.barStyle_android : styles.barStyle_ios,
        tabBarActiveTintColor : '#CC5A57'
      }}
    >
      <Tab.Screen name='ChurchMain' component={ChurchMain}
        options={{
          tabBarIcon:({focused})=> 
          <Text style={{color: focused ? "#000" : "#BDBDBD", fontWeight:'bold' }}>교회수첩</Text>
        }}
      />
      <Tab.Screen name="ClassicMain" component={ClassicMain}
        options={{
          tabBarIcon:({focused})=> 
          <Text style={{color: focused ? "#000" : "#BDBDBD", fontWeight:'bold' }}>성악과</Text>
        }}
      />
     
      <Tab.Screen name='NursingMain' component={NursingMain}
        options={{
          tabBarIcon:({focused})=> 
          <Text style={{color: focused ? "#000" : "#BDBDBD", fontWeight:'bold' }}>간호대</Text>
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  android: {
    backgroundColor: '#000',
  },
  ios : {
    backgroundColor: '#000',
    paddingTop: getStatusBarHeight()
  },
  barStyle_android: {
    height: 70,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 3,
    borderTopColor: '#8C8C8C',
    borderTopWidth: 0.5,
    paddingBottom: 10
  },
  barStyle_ios : {
    height: 70,
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 10
  }
});



