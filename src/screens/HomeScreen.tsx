import React from "react";
import FavouriteScreen from "./FavouriteScreen";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from "../theme/theme";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {

    return (
        <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen
                name="Favorite"
                options={{
                    headerShown: true,
                    title: "All Books",
                    tabBarIcon: ({ focused }) => (
                        // Render an Image component for the tabBarIcon, tinted based on focus state
                        <Image
                            tintColor={focused ? colors.secondary : "gray"}
                            source={require("../../assets/FavoriteIcon.png")}
                        />
                    ),
                }}
                component={FavouriteScreen}
            />

            <Tab.Screen
                name="Profile"
                options={{
                    headerShown: true,
                    title: `User Profile`,
                    // Set options for the "Profile" tab, including title and tabBarIcon
                    tabBarIcon: ({ focused }) => (
                        <Image
                            tintColor={focused ? colors.secondary : "gray"}
                            source={require("../../assets/ProfileIcon.png")}
                        />
                    ),
                }}
                component={ProfileScreen}
            />
        </Tab.Navigator >
    );
}
