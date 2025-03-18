import React from "react";
import { Login } from "../pages/Login";
import { RegisterUser } from "../pages/RegisterUser";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { propsNavigationStack } from "./models";

const AuthStack = createNativeStackNavigator<propsNavigationStack>();

export function AuthRoutes() {
    return (
        <AuthStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen name="RegisterUser" component={RegisterUser} />
        </AuthStack.Navigator>
    );
}