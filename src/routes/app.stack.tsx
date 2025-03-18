import React from "react";
import { DisplayExit } from "../pages/DisplayExit";
import { DisplayEntry } from "../pages/DisplayEntry";
import { PostReleaseFinance } from "../pages/PostReleaseFinance";
import { EditRelease } from "../pages/EditRelease";
import { ReleaseInformation } from "../pages/ReleaseInformation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { propsNavigationStack } from "./models";
import { View, Image } from "react-native";

const AppStack = createNativeStackNavigator<propsNavigationStack>();
const AppTab = createMaterialBottomTabNavigator();

function TabsEntryAndExit() {
    return (
        <AppTab.Navigator
            initialRouteName="Home"
            activeColor="#5467FF"
            inactiveColor="#f0edf6"
            barStyle={{
                backgroundColor: '#212326',
                height: 50,
                left: 15,
                right: 15,
                borderRadius: 15,
                elevation: 0,
                position: "absolute",
                bottom: 15
            }}
        >
            <AppTab.Screen name="Entrada" component={DisplayEntry} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../assets/listBlue.png")} style={{ width: 25, height: 25 }} />
                    </View>
                )
            }} />

            <AppTab.Screen name="Adicionar" component={PostReleaseFinance} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../assets/AddPost.png")} style={{ width: 25, height: 25 }} />
                    </View>
                )
            }} />

            <AppTab.Screen name="Saída" component={DisplayExit} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../assets/listBlue.png")} style={{ width: 25, height: 25 }} />
                    </View>
                )
            }} />
        </AppTab.Navigator>
    );
}

export function AppRoutes() {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="DisplayMain" component={TabsEntryAndExit} />
            <AppStack.Screen name="ReleaseInformation" component={ReleaseInformation} />
            <AppStack.Screen name="EditRelease" component={EditRelease} />
        </AppStack.Navigator>
    );
}
