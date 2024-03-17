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
  const [books, setBooks] = useState<BookDetail[]>([]);

  useEffect(() => {
    const initFetchBooks = async () => {
      try {
        const books = await getBooks();
        setBooks(books.data);
      } catch (error) {
        console.error(error);
      }
    };
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
            <Image
              tintColor={focused ? colors.primary : "gray"}
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
          tabBarIcon: ({ focused }) => (
            <Image
              tintColor={focused ? colors.primary : "gray"}
              source={require("../../assets/ProfileIcon.png")}
            />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
