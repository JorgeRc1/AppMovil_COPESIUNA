import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


// pantallas
import Inicio from "../../screens/user/Inicio"
import Suelo from "../../screens/user/Suelo"
import Cosecha from "../../screens/user/Cosecha"
import Perfil from "../../screens/user/Perfil";

const Tab = createBottomTabNavigator()

function AppNavigation () {
  return (
      <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00A850',
          height: 60,

        },
        headerTintColor: 'rgb(255, 255, 255)', 
        headerTitleAlign: 'center',
        tabBarActiveTintColor: "#00A850",
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 10, 
          paddingTop: 5,     
          height: 60,        
        },
        }}
      >
        <Tab.Screen name="Inicio"
         component={Inicio} 
         options={{
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
         />
        <Tab.Screen 
        name="Identificación de suelos" 
        component={Suelo}
        options={{
          tabBarLabel: "Suelo",
          tabBarIcon: ({color, size}) => (
          <FontAwesome6 name="sun-plant-wilt" size={24} color={color} />
            )
        }}
        />
        <Tab.Screen name="Estimación de cosecha"
         component={Cosecha}
         options={{
          tabBarLabel: "Cosecha",
          tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="corn" size={24} color={color} />
          ),
        }}
         />
        <Tab.Screen 
        name="Perfil de usuario" 
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({color, size}) => (
           <Entypo name="user" size={24} color={color} />
            ),
        }}
        />
      </Tab.Navigator> 
     
      );
}
export default AppNavigation;