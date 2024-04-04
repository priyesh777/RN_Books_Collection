import React, {
    useState,
    useEffect,
    useCallback,
} from "react";
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    RefreshControl,
    ToastAndroid,
} from "react-native";
import FavoriteCard from "../components/FavouriteCard";
import BookDetail from "../types/bookDetail";
import { getBooks } from "../api/books";
import { booksData } from "../data/mockedBooks"


// Define the interface for FavouriteScreenProps, which contains booksList property
interface FavouriteScreenProps {
    booksList: BookDetail[];
}

export default function FavouriteScreen(props: FavouriteScreenProps) {
    const { booksList } = props;

    const [refreshing, setRefreshing] = useState(false);
    const [listData, setListData] = useState(booksData);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const bookResponse = await getBooks();
            let responseJson = bookResponse.data;
            setListData(responseJson);
            ToastAndroid.show('Refreshed with latest data!', ToastAndroid.SHORT);
            setRefreshing(false);
        } catch (error) {
            console.log("Error while refetching::>>>", error);
        }
    }, [refreshing]);

    useEffect(() => {
        if (!!booksList) {
            setRefreshing(false);
        }
    }, []);

    return (
        // Render SafeAreaView to ensure content displays safely on all devices
        <SafeAreaView>
            <FlatList
                data={listData}
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
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
