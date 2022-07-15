import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerScreenStack } from "./DrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";


const HomeStack = createNativeStackNavigator();
export default AppNavigator = ({ session }) => {
    return (
        <NavigationContainer>
            <HomeStack.Navigator>
                <HomeStack.Screen 
                name="GroceryList" 
                component={DrawerScreenStack}
                options={{ headerShown: false, session: session }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    );
}