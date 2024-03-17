import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { setToken } from "../data/token";
import { colors } from '../theme/theme';

interface ProfileScreenProps {
    navigation: any;
}

export default function ProfileScreen(props: ProfileScreenProps) {

    const { navigation } = props;

    const onLogoutPress = async () => {
        console.log("Logout Pressed");
        try {
            console.log("Tried to logout");
            setToken("");
            navigation.navigate("Login");
            Alert.alert(
                'GoodBye!',
                `User has successfully logged out !`,
            );

        } catch (error) {
            console.log("Logout error::", error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={{ top: 50, zIndex: 2 }}
                source={require('../../assets/UserProfile.png')}
            />
            <View style={styles.outerLayer}>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#495767',
                        fontWeight: '500',
                        fontSize: 18,
                        paddingBottom: 10,
                    }}
                >
                    HELLO USER !
                </Text>
                <View style={styles.innerLayer}>
                    <View style={styles.logoutBox}>
                        <TouchableOpacity style={styles.logoutBox} onPress={onLogoutPress}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                LOGOUT
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    outerLayer: {
        flex: 1 / 2,
        backgroundColor: colors.primary,
        borderRadius: 16,
        width: '95%',
        height: '40%',
        paddingTop: 70,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    innerLayer: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 16,
        paddingTop: 30,
        paddingHorizontal: 15,
        width: '100%',
    },
    logoutBox: {
        backgroundColor: colors.tertiary,
        borderRadius: 20,
        height: 50,
        minWidth: "80%",
        justifyContent: "center",
    }
});
