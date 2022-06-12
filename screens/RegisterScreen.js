import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { supabase } from '../supabase-service';
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
import { useNavigation } from "@react-navigation/native";

// React hook form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";

// URL polyfill for supabase
import 'react-native-url-polyfill/auto';

export const accountSchema = yup.object().shape({
  name: yup.string().required("Name Is A Required Field"),
  email:yup
    .string()
    .email("Invalid Email Format")
    .required("Email Is A Required Field"),
  password: yup.string().required("Password Is A Required Field"),
});

export const ErrorMessage = ({name, errors}) => {
  return (
    <View style = {{paddingLeft: 8, color: "red"}}>
      {errors[name] && (
        <Text style = {{color: "red"}} >{errors?.[name].message}</Text>
      )}
    </View>
  );
};

export default function RegisterScreen() {
  const {
    register, 
    setValue, 
    getValues, 
    handleSubmit, 
    // control, 
    // reset, 
    formState: { errors }
  } = useForm({
    resolver: yupResolver(accountSchema),
    defaultValues: {
      name: "",
      email: "",
      password : "",
    }
  });

  useEffect(() => {
    register("name");
    register("email");
    register("password");
  });

  const ErrorAlert = ({title, message}) =>
    Alert.alert(title, message, [
      {text : "OK", onPress:() => console.log("OK Pressed")},
    ]);
    
  async function doCreateAccount(userData) {
    console.log(userData);
    const {email, password, name} = userData;
    const response = await supabase.auth.signUp({ email,password});

    if (response?.error) {
      // render error
      console.log(response?.error?.message);
      ErrorAlert({
        title: "Error creating an account",
        message: response?.error?.message,
      });
      return;
    }

      // ADD USER PROFILE TO TABLE

    const { data, error } = await supabase.from("users").insert([
      {
        user_id: response.user?.id,
        household_id: response.user?.id,
        username: email,
        updated_at: new Date(),
        name,
      },
    ]);

    if (error) {
      // render error
      console.log(error?.message);
      ErrorAlert({
        title: "Error Creating User: Writing Profile Information",
        message: error?.message,
      });
      return;
    }
  }

  const navigation = useNavigation();    
  
  return (
    <View style={styles.container}>
        
      <View style = {styles.space} />

      <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            id = "name"
            textContentType = "name"
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setValue("name", text)}
        />
        <ErrorMessage name="name" errors={errors} />
      </View>

      <View style={styles.inputView}>
        <TextInput
            id = "email"
            textContentType="email"
            style={styles.TextInput}
            placeholder="example@email.com"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setValue("email", text)}
        />
        <ErrorMessage name="email" errors={errors} />
      </View>
   
      <View style={styles.inputView}>
        <TextInput
          id = "password"
          textContentType="password"
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setValue("password", text)}
        />
        <ErrorMessage name="password" errors={errors} />
      </View>
        
      
      <TouchableOpacity
        style = {styles.registerBtn}
        onPress = {handleSubmit(doCreateAccount)}>
        <Text>REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style = {styles.registerBtn}
        onPress = {() => navigation.navigate("Login")}>
        <Text>CANCEL</Text>
      </TouchableOpacity>

    </View>
  );
}
   
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignContent: "center",
    },
   
    
    inputView: {
      backgroundColor: "#E3F0E4",
      borderRadius: 30,
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignSelf: "center",
      alignItems: "center",
    },
   
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
   
    space: {
      width: 100, // or whatever size you need
      height: 100,
    },
  
    registerBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      marginTop: 50,
      backgroundColor: "darkseagreen",
      alignItems: "center",
    },

  });

