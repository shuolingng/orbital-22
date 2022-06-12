import React, { useState, useEffect } from "react";
import LoginScreen from './screens/LoginScreen';
import GroceryScreen from './screens/GroceryScreen';
import RegisterScreen from './screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from"./database/Database";
import 'react-native-url-polyfill';
const Stack = createNativeStackNavigator();

export default function App() {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    setAuth(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      setAuth(session);
    })
  })
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="GroceryList" component={GroceryScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
