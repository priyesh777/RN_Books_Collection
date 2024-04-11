/* Books Collection, Chandrika Ghale, 200575692, 4/4/2024
Priyesh Gautam, 200568939,4/4/2024
*/
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import AuthHeader from "../components/AuthHeader";
import CustomTextInput from "../components/CustomTextInput";
import { RegisterUserPayload, registerUser } from "../api/users";

// Define the interface for RegistrationScreenProps
interface RegistrationScreenProps {
    navigation: any;
}

// Define the functional component named Registration
export default function Registration(props: RegistrationScreenProps) {
    const { navigation } = props;

    // Declare state variables using useState hook
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Define the function to handle sign up button press
    const handleSignUp = async () => {
        setLoading(true);
        // Create data object with user registration details
        const data: RegisterUserPayload = {
            name: username,
            email,
            password,
        };
        if (
            username === ""
            && email === ""
            && password === ""
            && confirmPassword === ""
        ) {
            return Alert.alert(
                'Failed request',
                `Invalid Credentials !`,
            );
        }
        try {
            // Attempt to register user with provided details
            const response = await registerUser(data);
            console.log(response);
            if (response.status === 200) {
                // If registration is successful, set loading state to false
                setLoading(false);
                // Show success alert and navigate to Login screen
                Alert.alert(
                    'Congratulations!',
                    `User has successfully registered !`,
                );
                navigation.navigate("Login");
            }
            if (response.status === 400) {
                // If user already exists, set loading state to false and show alert
                setLoading(false);
                alert("Sorry, could not register right now!");
            }
        } catch (error) {
            // If an error occurs during registration, log the error and show alert
            console.log("Also chceck if the server is running :>>>");
            console.log(error);
            setLoading(false);
            alert("Invalid Credentials !");
        }
    };

    // Return JSX representing the Registration component
    return (
        <SafeAreaView style={style.container}>
            <AuthHeader />

            <View style={{ flex: 1 / 2 }}>
                <CustomTextInput
                    label="Username"
                    value={username}
                    onChange={setUserName}
                />
                <CustomTextInput label={"Email"} value={email} onChange={setEmail} />
                <CustomTextInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                    secureTextEntry
                />
                <CustomTextInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    secureTextEntry
                />

                <View style={{ marginVertical: 50 }}>
                    <TouchableOpacity style={style.button} onPress={() => handleSignUp()}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            REGISTER
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            textAlign: "center",
                            marginTop: 24,
                            fontWeight: "400",
                            fontSize: 13,
                        }}
                    >
                        Already a trainer?{" "}
                        <Text
                            onPress={() => navigation.navigate("Login")}
                            style={{
                                textDecorationLine: "underline",
                                color: colors.secondary,
                                fontWeight: "bold",
                            }}
                        >
                            Signin
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
