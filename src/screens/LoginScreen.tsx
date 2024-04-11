import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import AuthHeader from "../components/AuthHeader";
import CustomTextInput from "../components/CustomTextInput";
import { LoginPayLoad, loginUser } from "../api/users";
import { setToken } from "../data/token";
import UserContext from "../data/userContext";

interface LoginScreenProps {
    navigation: any;
}

// Define the functional component named LoginScreen
export default function LoginScreen(props: LoginScreenProps) {
    const { navigation } = props;

    const { setUserInfo } = useContext(UserContext);

    // Declare state variables email and password using useState hook
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Define the function to handle login button press
    const onLoginPress = async () => {
        // Create payload object with email and password
        const payload: LoginPayLoad = {
            email,
            password,
        };
        console.log("Login Pressed with payload ::>>", email, password);
        if (email === "" && password === "") {

            return Alert.alert(
                'Failed request',
                `Invalid Credentials !`,
            );
        }
        try {
            // Attempt to login user with provided credentials
            const result = await loginUser(payload);
            console.log("Response for login function::>>", result.data);
            // Save user token securel
            setToken(result.data.token);
            setUserInfo(email);
            // Navigate to Home screen upon successful login
            navigation.navigate("Home");
            setEmail("");
            setPassword("");
            // Show success alert
            Alert.alert(
                'Success!',
                `User has successfully logged IN !`,
            );
        } catch (error) {
            console.log("Also check if the server is running :>>>");
            console.log("Login error traced::>>", error);
            Alert.alert(
                'Failed request',
                `Invalid Credentials !`,
            );
        }
    };

    // Return JSX representing the LoginScreen component
    return (
        <SafeAreaView style={style.container}>
            <AuthHeader />

            <View style={{ flex: 1 / 2 }}>
                {/* Render CustomTextInput for email */}
                <CustomTextInput label="Email" value={email} onChange={setEmail} />
                <CustomTextInput
                    label="Password"
                    secureTextEntry={true}
                    value={password}
                    onChange={setPassword}
                />

                <View style={{ marginVertical: 50 }}>
                    {/* Render TouchableOpacity for login button */}
                    <TouchableOpacity style={style.button} onPress={onLoginPress}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            LOGIN
                        </Text>
                    </TouchableOpacity>
                    {/* Render text for registering new user */}
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 24,
                            fontWeight: "400",
                            fontSize: 13,
                        }}
                    >
                        Are you a new user?{" "}
                        <Text
                            onPress={() => navigation.navigate("Registration")}
                            style={{
                                textDecorationLine: "underline",
                                color: colors.secondary,
                                fontWeight: "bold",
                            }}
                        >
                            Register
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Define styles using StyleSheet.create
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "",
        alignItems: "center",
        marginVertical: 50,
    },

    button: {
        backgroundColor: colors.button,
        borderRadius: 20,
        height: 50,
        minWidth: "80%",
        justifyContent: "center",
    },
});
