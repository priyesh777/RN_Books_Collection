import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ToastAndroid,
} from "react-native";
import React from "react";
import BookDetail from "../types/bookDetail";
import { colors } from "../theme/theme";
import { deleteBook } from "../api/books";

/* This component is used as a reusable component for listing the Book collections in Card component */

interface FavoriteCardProps {
    id: string;
    book: BookDetail;
    author?: string;
    rating: number;
    navigation: any;
    onRefresh: () => void;
}

export default function FavoriteCard(props: FavoriteCardProps) {

    const { id, book, navigation, onRefresh } = props;
    const {
        booksName,
        genre,
        description,
        author,
        rating,
    } = book;

    const booksLatestData = {
        bookTitle: booksName ?? " ",
        bookGenre: genre[0] ?? " ",
        bookDescription: description ?? " ",
        booksAuthor: author ?? " ",
        booksRating: rating ?? " ",
    };

    const handleDeleteBook = async (bookId: string) => {
        try {
            await deleteBook(bookId);
            onRefresh();
            ToastAndroid.show('Successfully deleted the book !', ToastAndroid.SHORT);
        } catch (error) {
            console.log("Error while deleting::>>", error);
            ToastAndroid.show('Sorry could not update right now!', ToastAndroid.SHORT);
        }
    };

    return (
        <TouchableOpacity
            key={booksName}
            style={styles.container}
        >
            <View key={booksName} style={styles.row}>
                <View style={styles.contentWrapper}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.miniButtons}
                            onPress={() => navigation.navigate('EditBookScreen', { book, index: id })}
                        >
                            <Text style={styles.miniButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.miniButtons}
                            onPress={() => handleDeleteBook(id)}
                        >
                            <Text style={styles.miniButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={[
                            styles.firstRowText,
                            { alignSelf: "flex-start", fontSize: 18 },
                        ]}
                    >
                        {booksLatestData.bookTitle}
                    </Text>
                    <Text
                        style={[
                            styles.firstRowText,
                            {
                                alignSelf: "flex-start",
                                fontSize: 14,
                            },
                        ]}
                    >
                        by {booksLatestData.booksAuthor} &nbsp; &#9733; {booksLatestData.booksRating}
                    </Text>
                    <Text
                        style={[
                            styles.firstRowText,
                            {
                                alignSelf: "flex-start",
                                fontWeight: "normal",
                                backgroundColor: "#BACBA9",
                                fontSize: 14,
                                padding: 5,
                                borderRadius: 5,
                                overflow: "hidden",
                                marginTop: 2,
                            },
                        ]}
                    >
                        {booksLatestData.bookGenre}
                    </Text>
                    <Text
                        style={[
                            styles.firstRowText,
                            {
                                alignSelf: "flex-start",
                                fontWeight: "normal",
                                marginTop: 10,
                                fontSize: 13,
                            },
                        ]}
                    >
                        {(booksLatestData?.bookDescription ? (booksLatestData.bookDescription.slice(0, 40) + "...") : ".....")}
                    </Text>
                </View>

                <View style={styles.imageWrapper}>
                    <Image
                        style={{
                            width: 120,
                            height: 120,
                            alignSelf: "center",
                        }}
                        source={require('../../assets/books_logo.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.tertiary,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        justifyContent: "space-around",
    },

    row: {
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: "space-between",
        width: "90%",
    },

    contentWrapper: {
        flex: 0,
    },

    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
    },

    miniButtons: {
        backgroundColor: colors.button,
        borderRadius: 20,
        minWidth: "30%",
        alignItems: "center",
        justifyContent: "flex-end",
        margin: 2,
        padding: 1,
    },

    miniButtonText: {
        color: "white",
    },

    imageWrapper: {
        flex: 1,
    },

    typeSection: {
        flex: 1 / 2,
        borderRadius: 20,
        marginVertical: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    firstRowText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 18,
    },
});
