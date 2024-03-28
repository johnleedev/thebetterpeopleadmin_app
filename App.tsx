import * as React from "react";
import { KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/Main";


const Stack = createNativeStackNavigator();

function App () {


  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;