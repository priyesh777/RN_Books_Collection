/* Books Collection, Chandrika Ghale, 200575692, 4/4/2024
Priyesh Gautam, 200568939,4/4/2024
*/
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';

// Import setToken function from data/token file and colors object from theme/theme file
import { setToken } from "../data/token";
import { colors } from '../theme/theme';
import UserContext from "../data/userContext";


// Define the interface for ProfileScreenProps, which contains navigation property
interface ProfileScreenProps {
    navigation: any;
}

// Define the interface for ProfileScreenProps, which contains navigation property
export default function ProfileScreen(props: ProfileScreenProps) {

    const { navigation } = props;

    const { userInfo } = useContext(UserContext);

    // Define the function to handle logout button press
    const onLogoutPress = async () => {
        console.log("Logout Pressed");
        try {
            // Clear user token
            setToken("");
            // Navigate to Login screen upon successful logout
            navigation.navigate("Login");
            // Show Logout alert
            Alert.alert(
                `User has successfully logged out !`,
            );

        } catch (error) {
            console.log("Logout error::", error);
        }
    };

    const createNewBook = () => {
        navigation.navigate("AddBookScreen");
    };

    // Return JSX representing the ProfileScreen component
    return (
        <View style={styles.container}>
            {/* Render user profile image */}
            <Image
                style={{ top: 50, zIndex: 2 }}
                source={require('../../assets/UserProfile.png')}
            />
            <View style={styles.outerLayer}>
                {/* Render greeting text */}
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#495767',
                        fontWeight: '500',
                        fontSize: 18,
                        paddingBottom: 10,
                    }}
                >
                    USER:&nbsp;  {userInfo ?? "---"}
                </Text>
                <View style={styles.innerLayer}>
                    <View style={styles.logoutBox}>
                        {/* Render TouchableOpacity for create book button */}
                        <TouchableOpacity style={styles.logoutBox} onPress={createNewBook}>
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                    color: "white",
                                }}
                            >
                                ADD NEW BOOK +
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.innerLayer}>
                    <View style={styles.logoutBox}>
                        {/* Render TouchableOpacity for logout button */}
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

// Define styles using StyleSheet.create
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
