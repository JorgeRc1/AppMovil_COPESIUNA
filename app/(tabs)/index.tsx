import React from 'react';
import  Login  from '../../screens/auth/Login'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#DFF2EB" />
      <Login />

    </SafeAreaView>
    
  );
  
};

export default App;