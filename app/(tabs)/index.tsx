import React, { useEffect } from 'react';
import  Login  from '../../screens/auth/Login'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigation from '../../components/navigation/AppNavigation';
import {NavigationContainer} from "@react-navigation/native";
import {getDbConnection, createTables, loadProductores} from '../../utils/db'
import FlashMessage from "react-native-flash-message";



const App = () => {
  useEffect(() =>{
    const loadTables = async() =>{
      const db = await getDbConnection();
      await createTables(db);
    };
    loadTables();

}, []);

  return (

    <NavigationContainer independent={true}>
    <StatusBar barStyle="dark-content" backgroundColor="#DFF2EB" />
    <FlashMessage position="bottom" />
    <AppNavigation />

    </NavigationContainer>

  

  
  

  );
  
};

export default App;