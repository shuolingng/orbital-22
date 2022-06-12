import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";


export default function RecipeScreen() {
    return (
      <View style={styles.container}>
        <Text>This is the RecipeScreen page</Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    "modal-container": {
      flex: 1,
      alignItems: "center",
      borderRadius: 18,
    },
  });