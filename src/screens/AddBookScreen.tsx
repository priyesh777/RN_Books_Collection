import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/theme";
import CustomTextInput from "../components/CustomTextInput";
import { BookPayload, createNewBook } from "../api/books";

// Define the interface for AddBookScreenProps
interface AddBookScreenProps {
    navigation: any;
}

// Define the functional component named AddBookScreen
export default function AddBookScreen(props: AddBookScreenProps) {
    const { navigation } = props;

    // Declare state variables using useState hook
    const [booksName, setBooksName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [rating, setRating] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Define the function to handle create a new book button press
    const handleNewBook = async () => {
        setLoading(true);
        // Create data object for creating a new book
        const data: BookPayload = {
            booksName,
            isbn,
            rating,
            author,
            genre,
            description,
        };
        try {
            // Attempt to create new book with provided details
            const response = await createNewBook(data);
            console.log("Create book response:::>>>", response);
            if (response.status === 200) {
                // If new book card creation is successful, set loading state to false
                setLoading(false);
                setBooksName("");
                setIsbn("");
                setRating("");
                setAuthor("");
                setGenre("");
                setDescription("");
                // Show success alert and navigate to Login screen
                Alert.alert(
                    `New Book has been successfully added !`,
                );
            }
            if (response.status === 400) {
                // If user already exists, set loading state to false and show alert
                setLoading(false);
                alert("Sorry, couldn't create new record !");
            }
        } catch (error) {
            // If an error occurs during new book creation, log the error and show alert
            console.log("Also check if the server is running :>>>");
            console.log(error);
            setLoading(false);
            alert("Sorry, couldn't create new record !");
        }
    };

    // Return JSX representing the AddBookScreen component
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Image source={require('../../assets/Back_Arrow.png')} />
                </TouchableOpacity>

                <View style={styles.customHeaderRightIcons}>
                    <Text style={styles.indexText}>NEW BOOK DETAIL FORM</Text>
                </View>
            </View>

            <View style={{ flex: 1 / 2, paddingTop: 10 }}>
                <CustomTextInput
                    label="BooksName"
                    value={booksName}
                    onChange={setBooksName}
                />
                <CustomTextInput
                    label="ISBN"
                    value={isbn}
                    onChange={setIsbn}
                />
                <CustomTextInput
                    label="Rating"
                    value={rating}
                    onChange={setRating}
                />
                <CustomTextInput
                    label="Author"
                    value={author}
                    onChange={setAuthor}
                />
                <CustomTextInput
                    label="Genre"
                    value={genre}
                    onChange={setGenre}
                />
                <CustomTextInput
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    descriptionBox={true}
                />

                <View style={{ marginVertical: 50 }}>
                    <TouchableOpacity style={styles.button} onPress={() => handleNewBook()}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "white",
                            }}
                        >
                            CREATE NEW BOOK CARD +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
// Define styles using StyleSheet.create
const styles = StyleSheet.create({
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
    customHeader: {
        flex: 1 / 16,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: colors.tertiary,
    },

    customHeaderRightIcons: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    indexText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
    }
});
