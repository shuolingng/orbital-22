import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerScreenStack } from "./DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import PantryScreen from "../screens/PantryScreen";
import AddPantryItemScreen from "../screens/AddPantryItemScreen";


const HomeStack = createNativeStackNavigator();
export default AppNavigator = ({ session }) => {
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen 
                name="GroceryList" 
                component={DrawerScreenStack}
                options={{ headerShown: false, session: session }} />
                <HomeStack.Screen
                name="PantryList"
                component={PantryScreen}
                />
                <HomeStack.Screen
                name="Add Pantry Item"
                component={AddPantryItemScreen}
                />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}