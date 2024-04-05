/* Books Collection, Chandrika Ghale, 200575692, 4/4/2024
Priyesh Gautam, 200568939,4/4/2024
*/
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
import { booksData } from "../data/mockedBooks";

// Define the interface for FavouriteScreenProps, which contains booksList property
interface FavouriteScreenProps {
    navigation: any;
}

export default function FavouriteScreen(props: FavouriteScreenProps) {
    const { navigation } = props;

    // Declare state variable 'books' using useState hook,
    // initialized as an empty array of BookDetail objects
    const [books, setBooks] = useState<BookDetail[]>(booksData);

    const [refreshing, setRefreshing] = useState(false);
    const [latestData, setLatestData] = useState(books);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const bookResponse = await getBooks();
            let responseJson = bookResponse.data;
            setLatestData(responseJson);
            ToastAndroid.show('Refreshed with latest data!', ToastAndroid.SHORT);
            setRefreshing(false);
        } catch (error) {
            console.log("Error while refetching::>>>", error);
        }
    }, [refreshing]);

    useEffect(() => {
        // Define an asynchronous function initFetchBooks to fetch books data
        const initFetchBooks = async () => {
            try {
                // Fetch books data asynchronously using the getBooks function
                const bookResponse = await getBooks();

                // Set the fetched books data to the 'books' state variable
                setBooks(bookResponse.data);
                //if (!!books) {
                //    setRefreshing(false);
                //}
            } catch (error) {
                // Log any errors occurred during fetching books data
                console.log("Also check if the server is running :>>>");
                console.error(error);
            }
        };
        // Call the initFetchBooks function defined above
        initFetchBooks();
    }, []);


    return (
        // Render SafeAreaView to ensure content displays safely on all devices
        <SafeAreaView>
            <FlatList
                data={latestData}
                renderItem={(book) => (
                    <FavoriteCard
                        id={book?.item._id}
                        book={book?.item}
                        author={book?.item?.author}
                        rating={book?.item?.rating}
                        navigation={navigation}
                        onRefresh={onRefresh}
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
