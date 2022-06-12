import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, Button } from 'react-native';
import GroceryScreen from '../screens/GroceryScreen';
import RecipeScreen from '../screens/RecipeScreen';
import {supabase} from '../supabase-service';

const DrawerStack = createDrawerNavigator();
export function DrawerScreenStack() {
  return (
    <DrawerStack.Navigator 
        initialRouteName="Home"
        drawerContent = {(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Grocery List" component={GroceryScreen} />
      <DrawerStack.Screen name="Recipe" component={RecipeScreen} />
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
            <View style = {{marginBottom : 30}}>
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