import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {supabase} from '../database/Database';
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native"

export const loginSchema = yup.object().shape({
  email:yup
    .string()
    .email("Invalid Email Format")
    .required("Email Is A Required Field"),
  password: yup.string().required("Password Is A Required Field"),
});

export const ErrorText = ({ name, errors }) => {
  return (
    <View style = {{ paddingLeft: 8, color: "red" }}>
      {errors[name] && (
        <Text style = {{color: "red"}}>{errors?.[name]?.message}</Text>
      )}
    </View>
  );
};

export default function LoginScreen() {
  const {
    register, 
    setValue, 
    getValues, 
    handleSubmit, 
    // control, 
    // reset, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password : "",
    }});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const useEffect = () => {
    register("email");
    register("password");
  }
  
  const pressLogin = () => {
    if (email.length <= 0 || password.length <= 0) {
      Alert.alert("Please check if you have registered and have filled up the required fields");
      return; 
    }
    async function doLogin(data) {
      console.log(data)
      const response = await supabase.auth.signIn(data);

      if (response?.error) {
        console.log(response?.error?.message);
        return;
      }
    }
    if (handleSubmit(doLogin)) {
      navigation.navigate('GroceryList');
    }
  } 
  console.log(errors)

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/128basket.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          id = "email"
          textContentType ="emailAddress"
          style={styles.TextInput}
          placeholder="example@email.com"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setValue("email", email)}
        />
        <ErrorText name = "email" errors = {errors} />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          id = "password"
          textContentType="password"
          style={styles.TextInput}
          placeholder="password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setValue("password", password)}
        />
        <ErrorText name = "password" errors = {errors} />
      </View>

      <Button
        onPress = {() => navigation.navigate("GroceryList")}
        title = "Login" 
        color = "darkseagreen" />

      <View style ={styles.space} />

      <Button
        onPress = {() => navigation.navigate("Register")}
        title = "Register" 
        color = "darkseagreen" />
    
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

