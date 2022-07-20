import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Button } from 'react-native';
import RecipeScreen from '../screens/RecipeScreen';
import PantryScreen from '../screens/PantryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GroceryScreen from "../screens/GroceryScreen";
import AddPantryItemScreen from "../screens/AddPantryItemScreen";
import {supabase} from '../lib/supabase';

const DrawerStack = createDrawerNavigator();
export function DrawerScreenStack() {
  return (
    <DrawerStack.Navigator 
        initialRouteName="Home"
        drawerContent = {(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Grocery List" component={GroceryScreen} />
      <DrawerStack.Screen name="Pantry List" component={PantryScreen} />
      <DrawerStack.Screen name="Recipes" component={RecipeScreen} />
      <DrawerStack.Screen name="Profile" component={ProfileScreen} />
      <DrawerStack.Screen name="Test" component={AddPantryItemScreen} />
    </DrawerStack.Navigator>
  );
}

function CustomDrawerContent(props) {
    return(
        <>
            <DrawerContentScrollView {...props}>
                <View style = {{flex : 1}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView> 
            <View style = {{marginBottom:30, padding: 20}}>
                <Button
                    title = "Log Out"
                    onPress = {async() => {
                    props.navigation.closeDrawer();
                    await supabase.auth.signOut();
                    }}
                ></Button>
            </View>
        </>
    )
}