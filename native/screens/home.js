import React, { useState, useEffect } from 'react';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../shared/Atoms/userState';

import TopSongs from './songs/TopSongs';
import TopArtists from './artists/TopArtists';
import TopAlbums from './albums/TopAlbums';
import TopPlaylists from './playlists/TopPlaylists';

import axios from 'axios'
import { View, StyleSheet, ScrollView } from 'react-native';

export default function Home({ navigation }) {

    const [topSongs, setTopSongs] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);
    const [user, setUser] = useRecoilState(userState);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://10.0.2.2:8080/users/verify');
            setUser(data.user)
            const songsData = await axios.get('http://10.0.2.2:8080/songs/top');
            const artistsData = await axios.get('http://10.0.2.2:8080/artists/top');
            const albumsData = await axios.get('http://10.0.2.2:8080/albums/top');
            const playlistsData = await axios.get('http://10.0.2.2:8080/playlists/top');

            songsData.data && setTopSongs(songsData.data[0])
            artistsData.data && setTopArtists(artistsData.data[0])
            albumsData.data && setTopAlbums(albumsData.data[0])
            playlistsData.data && setTopPlaylists(playlistsData.data[0])
        })()
    }, [])

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
            // contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.homeView}>
                    {topSongs ? (
                        topSongs.length > 0 ? <TopSongs topSongs={topSongs} /> : null
                    ) : (null)}
                </View>
                <View style={styles.homeView}>
                    {topArtists ? (
                        topArtists.length > 0 ? <TopArtists topArtists={topArtists} /> : null
                    ) : (null)}
                </View>
                <View style={styles.homeView}>
                    {topAlbums ? (
                        topAlbums.length > 0 ? <TopAlbums topAlbums={topAlbums} /> : null
                    ) : (null)}
                </View>
                <View style={styles.homeView}>
                    {topPlaylists ? (
                        topPlaylists.length > 0 ? <TopPlaylists topPlaylists={topPlaylists} /> : null
                    ) : (null)}
                </View>
            </ScrollView>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        backgroundColor: '#000000',
    },
    contentContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#222222',
        alignContent: 'center',
    },
    homeView: {
        height: 300,
    }
})