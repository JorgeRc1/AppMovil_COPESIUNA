import React, { useEffect } from 'react';
import  Login  from '../../screens/auth/Login'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import AppNavigation from '../../components/navigation/AppNavigation';
import {NavigationContainer} from "@react-navigation/native";
import {getDbConnection, crearTablas} from '../../utils/db'




const App = () => {
  useEffect(() =>{
    const cargarTablas = async() =>{
      const db = await getDbConnection();
      await crearTablas(db);
    };
    cargarTablas();

}, []);

  return (

    <NavigationContainer independent={true}>
    <StatusBar barStyle="dark-content" backgroundColor="#DFF2EB" />
    <AppNavigation />

    </NavigationContainer>

  

  
  

  );
  
};

export default App;