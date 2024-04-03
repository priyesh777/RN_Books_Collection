/* Books Collection, Chandrika Ghale, 200575692, 3/17/2024
Priyesh Gautam, 200568939,3/17/2024
*/

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/Registration";
import HomeScreen from "./src/screens/HomeScreen";
import { getToken } from "./src/data/token";
import { useEffect, useState } from "react";
import ProfileScreen from "./src/screens/ProfileScreen";
/*
Main app component for rendering the naviation stack and managing user authentication
*/
const Stack = createNativeStackNavigator();

export default function App() {
    const [token, setToken] = useState<string | null>(null);
    const [initialRoute, setInitialRoute] = useState<string | null>(null);

    useEffect(() => {
        //  Define an asynchronous function initializeAuth to handle authentication initialization
        const initializeAuth = async () => {
            const token = await getToken();
            setToken(token);
            const route = token ? "Home" : "Login";
            // Set the initial route state variable
            setInitialRoute(route);
        };
        initializeAuth();
    }, []);

    if (initialRoute === null) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Registration"
                    component={RegistrationScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
