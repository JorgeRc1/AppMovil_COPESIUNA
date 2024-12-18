import React, { useEffect } from 'react';
import Login from './screens/auth/Login'
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigation from './components/AppNavigation';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { getDbConnection, createTables, loadProductores } from './utils/database/db'
import FlashMessage from "react-native-flash-message";



const App = () => {



  useEffect(() => {
    const loadTables = async () => {
      const db = await getDbConnection();
      await createTables(db);
    
  
    };
    loadTables();

  }, []);

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer independent={true}>
      <StatusBar barStyle="dark-content" backgroundColor="#DFF2EB" />
      <FlashMessage position="bottom" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Pantalla de Login */}
        <Stack.Screen name="Login" component={Login} />
        {/* Navegación principal */}
        <Stack.Screen name="AppNavigation" component={AppNavigation} />
      </Stack.Navigator>

    </NavigationContainer>

  );

};

export default App;