import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import React, { useState, useEffect } from "react";
import { supabase } from './lib/supabase';
import AppNavigation from "./navigation/AppNavigator";
import LoginScreen from './screens/LoginScreen';
import { View, StyleSheet } from 'react-native';
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <View style ={styles.container}>
      {session && session.user ? (
        <AppNavigation key={session.user.id} session={session} />
      ) : (
        <LoginScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});