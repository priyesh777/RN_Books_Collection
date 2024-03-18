import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React from "react";
import FavoriteCard from "../components/FavouriteCard";
import BookDetail from "../types/bookDetail";

// Define the interface for FavouriteScreenProps, which contains booksList property
interface FavouriteScreenProps {
    booksList: BookDetail[];
}

export default function FavouriteScreen({ booksList }: FavouriteScreenProps) {
    return (
        // Render SafeAreaView to ensure content displays safely on all devices
        <SafeAreaView>
            <FlatList
                data={booksList}
                renderItem={(book) => (
                    <FavoriteCard
                        id={book?.item._id}
                        book={book?.item}
                        author={book?.item?.author}
                        rating={book?.item?.rating}
                    //navigation={props.navigation}
                    />
                )}
                // Provide a unique key for each item in the FlatList
                keyExtractor={(item) => item.booksName}
            />
        </SafeAreaView>
    );
}

// Define styles using StyleSheet.create
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: "row",
    },
});
