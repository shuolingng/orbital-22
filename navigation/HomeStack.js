import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroceryScreen from '../screens/GroceryScreen';

const HomeStack = createNativeStackNavigator();
export function HomeScreenStack() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="GroceryList" component={GroceryScreen} />
        </HomeStack.Navigator>
    );
}