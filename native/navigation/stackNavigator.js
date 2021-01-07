import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/home";
import SongId from '../screens/songs/SongId'
import ArtistId from '../screens/artists/ArtistId'
import AlbumId from '../screens/albums/AlbumId'
import PlaylistId from '../screens/playlists/PlaylistId'
import UserId from '../screens/users/UserId'
import About from "../screens/about/About";
import Search from "../screens/general/Search";

import Header from '../shared/header';

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#494f52",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}
        >
            <Stack.Screen
                name="Home" component={Home}
                options={{ headerTitle: props => <Header title="Home" /> }}
            />
            <Stack.Screen
                name="Song" component={SongId}
                options={{ headerTitle: () => <Header title="Song" /> }}
            />
            <Stack.Screen
                name="Artist" component={ArtistId}
                options={{ headerTitle: () => <Header title="Artist" /> }}
            />
            <Stack.Screen
                name="Album" component={AlbumId}
                options={{ headerTitle: () => <Header title="Album" /> }}
            />
            <Stack.Screen
                name="Playlist" component={PlaylistId}
                options={{ headerTitle: () => <Header title="Playlist" /> }}
            />
            <Stack.Screen
                name="User" component={UserId}
                options={{ headerTitle: () => <Header title="User" /> }}
            />
        </Stack.Navigator>
    );
}

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen
                name="Search" component={Search}
                options={{ headerTitle: props => <Header title="Search" /> }}
            />
        </Stack.Navigator>
    );
}
const AboutStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen
                name="About" component={About}
                options={{ headerTitle: props => <Header title="About" /> }}
            />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, SearchStackNavigator, AboutStackNavigator };