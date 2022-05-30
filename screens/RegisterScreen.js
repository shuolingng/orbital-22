import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { useForm } from "react-hook-form"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

import { supabase } from '../database/Database';

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

export default function RegisterScreen({ navigation }) {

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

    const useEffect = () => {
      register("name");
      register("email")
      register("password");
    };

    const pressRegister = () =>
    navigation.navigate('Login');

    const ErrorAlert = ({title, message}) =>
      Alert.alert(title, message, [
        {text : "OK", onPress:() => console.log("OK Pressed")},
      ]);
    
    async function doCreateAccount(userData) {
      console.log(userData)
      const {email,password} = userData;
      const response = await supabase.auth.signUp({email, password});
      const {data, error} = await supabase.from("users").insert([
        {
          userid: response.user?.id,
          username: Text,
          password: Text,
        },
      ]);
      if (error) {
        console.log(error?.message);
        ErrorAlert({
          title: "Error Creating User",
          message: error?.message,
        });
        return;
      }
      }

    
  
    return (
      <View style={styles.container}>
        
        <View style = {styles.space} />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            id = "Name"
            textContentType = "name"
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(name) => setValue("name", name)}
          />
          <ErrorMessage name = "name" errors = {errors} />
        </View>

        <View style={styles.inputView}>
          <TextInput
            id = "email"
            textContentType="email"
            style={styles.TextInput}
            placeholder="example@email.com"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setValue("email",email)}
          />
          <ErrorMessage name = "email" errors = {errors} />
        </View>
   
        <View style={styles.inputView}>
          <TextInput
            id = "password"
            textContentType="password"
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setValue("password", password)}
          />
          <ErrorMessage name = "password" errors = {errors} />
        </View>
        
      
        <TouchableOpacity
        style = {styles.registerBtn}
        onPress = {() => {
          handleSubmit(doCreateAccount);
          pressRegister()}
        }
        >
        <Text>Register</Text>
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

