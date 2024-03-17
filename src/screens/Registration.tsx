import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import AuthHeader from "../components/AuthHeader";
import CustomTextInput from "../components/CustomTextInput";
import { RegisterUserPayload, registerUser } from "../api/users";

interface RegistrationScreenProps {
  navigation: any;
}

export default function Registration(props: RegistrationScreenProps) {
  const { navigation } = props;

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    //set validations
    setLoading(true);
    const data: RegisterUserPayload = {
      name: username,
      email,
      password,
    };
    try {
      const response = await registerUser(data);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        navigation.navigate("Login");
      }
      if (response.status === 400) {
        setLoading(false);
        alert("User already exists");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("User already exists");
    }
  };

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
                color: colors.primary,
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
