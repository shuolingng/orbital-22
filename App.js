import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { supabase } from"./supabase-service";
import { HomeScreenStack } from "./navigation/HomeStack";
import { AuthScreenStack } from "./navigation/AuthStack";
import 'react-native-gesture-handler'

export default function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAuth(supabase.auth.session());
    
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(session);
      setAuth(session);
    });

  });

  return (
    <NavigationContainer>
      {auth ? <HomeScreenStack /> : <AuthScreenStack />}
    </NavigationContainer>
  );
}