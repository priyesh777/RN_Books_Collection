import React, { useEffect, useState } from "react";
import FavouriteScreen from "./FavouriteScreen";
import ProfileScreen from "./ProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";
import { colors } from "../theme/theme";
import BookDetail from "../types/bookDetail";
import { getBooks } from "../api/books";

const Tab = createBottomTabNavigator();


export default function HomeScreen() {
    // Declare state variable 'books' using useState hook,
    // initialized as an empty array of BookDetail objects
    const [books, setBooks] = useState<BookDetail[]>([]);

    useEffect(() => {
    // Define an asynchronous function initFetchBooks to fetch books data
        const initFetchBooks = async () => {
            try {
                 // Fetch books data asynchronously using the getBooks function
                const books = await getBooks();

                // Set the fetched books data to the 'books' state variable
                setBooks(books.data);
            } catch (error) {
                // Log any errors occurred during fetching books data
                console.error(error);
            }
        };
        // Call the initFetchBooks function defined above
        initFetchBooks();
    }, []);

    return (
        <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen
                name="Favorite"
                options={{
                    headerShown: true,
                    title: "All Books",
                    tabBarIcon: ({ focused }) => (
                         // Render an Image component for the tabBarIcon, tinted based on focus state
                        <Image
                            tintColor={focused ? colors.secondary : "gray"}
                            source={require("../../assets/FavoriteIcon.png")}
                        />
                    ),
                }}
            >
                {() => <FavouriteScreen booksList={books} />}
            </Tab.Screen>

            <Tab.Screen
                name="Profile"
                options={{
                    headerShown: true,
                    title: `User Profile`,
                    // Set options for the "Profile" tab, including title and tabBarIcon
                    tabBarIcon: ({ focused }) => (
                        <Image
                            tintColor={focused ? colors.secondary : "gray"}
                            source={require("../../assets/ProfileIcon.png")}
                        />
                    ),
                }}
                component={ProfileScreen}
            />
        </Tab.Navigator >
    );
}
