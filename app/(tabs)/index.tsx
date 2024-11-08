import React from 'react';
import  Login  from '../../screens/auth/Login'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigation from '../../components/navigation/AppNavigation';
import {NavigationContainer} from "@react-navigation/native";



const App = () => {
  return (

    <NavigationContainer independent={true}>

    <StatusBar barStyle="dark-content" backgroundColor="#DFF2EB" />

    <AppNavigation />
    </NavigationContainer>
  
  

  );
  
};

export default App;