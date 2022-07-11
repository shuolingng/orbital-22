import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { supabase } from '../lib/supabase';
import { StyleSheet, View, Image, Alert, TextInput, Button} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/128basket.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          label="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>

      <Button
        onPress = {() => signInWithEmail()}
        title = "Sign in"
        disabled={loading} 
        color = "darkseagreen" />

      <View style ={styles.space} />

      <Button
        title="Sign Up"
        disabled={loading}
        onPress={() => signUpWithEmail()}/>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#E3F0E4",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    padding: 10,
    marginLeft: 20,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#a7b79c",
  },

  registerBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    backgroundColor: "#a7b79c",
  },

  space: {
    width: 30, // or whatever size you need
    height: 30,
  },
});

