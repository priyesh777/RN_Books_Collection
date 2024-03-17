import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import React from "react";
import FavoriteCard from "../components/FavouriteCard";
import BookDetail from "../types/bookDetail";

interface FavouriteScreenProps {
    booksList: BookDetail[];
}

export default function FavouriteScreen({ booksList }: FavouriteScreenProps) {
    return (
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
                keyExtractor={(item) => item.booksName}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        flexDirection: "row",
    },
});
