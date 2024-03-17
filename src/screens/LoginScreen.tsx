import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import AuthHeader from "../components/AuthHeader";
import CustomTextInput from "../components/CustomTextInput";
import { LoginPayLoad, loginUser } from "../api/users";
import * as SecureStore from "expo-secure-store";
import { setToken } from "../data/token";

interface LoginScreenProps {
    navigation: any;
}

export default function LoginScreen(props: LoginScreenProps) {
    const { navigation } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLoginPress = async () => {
        console.log("Login Pressed");
        const payload: LoginPayLoad = {
            email,
            password,
        };
        try {
            const result = await loginUser(payload);
            console.log(result.data);
            setToken(result.data.token);
            navigation.navigate("Home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={style.container}>
            <AuthHeader />

            <View style={{ flex: 1 / 2 }}>
                <CustomTextInput label="Email" value={email} onChange={setEmail} />
                <CustomTextInput
                    label="Password"
                    secureTextEntry={true}
                    value={password}
                    onChange={setPassword}
                />

                <View style={{ marginVertical: 50 }}>
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
                                color: colors.primary,
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
