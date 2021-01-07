import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Albums from '../albums/Albums';
import Songs from './Songs';

import { globalStyles } from '../../styles/global'

function SongId({ route }) {
    const navigation = useNavigation();
    const { songId, artistId, albumId, playlistId } = route.params;

    const [song, setSong] = useState(null);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        fetchSong();
    }, []);

    const fetchSong = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/songs/${songId}`);
        setSong(data);
        if (artistId) setArtist(data.Artist);
        if (albumId) setAlbum(data.Album);
        if (playlistId) {
            const playlistData = await axios.get(`http://10.0.2.2:8080/playlistsongs`);
            const playlistSongs = playlistData.data.filter((item) => item.PlaylistId === playlistId && item.SongId !== songId);
            setPlaylist(playlistSongs);
        }
    }

    return (
        song ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Song Title:</Text>
                        <Text style={globalStyles.topNameId}>{song.title}</Text>
                        <Text style={globalStyles.detailsId}>YouTube:</Text>

                        <Text style={globalStyles.detailsId}>Created At: {song.createdAt.split('T')[0].slice(0, 10)}</Text>
                        <Text style={globalStyles.detailsId}>Updated At: {song.updatedAt.split('T')[0].slice(0, 10)}</Text>
                        <View style={globalStyles.marginView}>
                            <TouchableOpacity
                                key={song.Artist.name}
                                onPress={() => navigation.navigate('Artist', {
                                    artistId: song.Artist.id
                                })}
                            >
                                <Text style={globalStyles.detailsId}>Artist Name: {song.Artist.name}</Text>
                                <Image
                                    style={globalStyles.imageId}
                                    source={{ uri: song.Artist.coverImg }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                key={song.Album.name}
                                onPress={() => navigation.navigate('Album', {
                                    albumId: song.Album.id
                                })}
                            >
                                <Text style={globalStyles.detailsId}>Album Name: {song.Album.name}</Text>
                                <Image
                                    style={globalStyles.imageId}
                                    source={{ uri: song.Album.coverImg }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={globalStyles.carouselsId}>
                        {album && (
                            <View style={globalStyles.carouselId}>
                                <Text style={globalStyles.carouselTitle}>Songs From Album:</Text>
                                <Songs songs={song.Album.Songs} />
                            </View>
                        )}
                        {artist && (
                            <View style={globalStyles.carouselId}>
                                <Text style={globalStyles.carouselTitle}>Songs From Artist:</Text>
                                <Songs songs={song.Artist.Songs} />
                            </View>
                        )}
                        {playlist && (
                            <View style={globalStyles.carouselId}>
                                <Text style={globalStyles.carouselTitle}>Songs From Playlist:</Text>
                                <Songs songs={playlist.map(playlist => playlist.Song)} />
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

export default SongId
