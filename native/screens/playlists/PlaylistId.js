import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';

import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global'

function PlaylistId({ route }) {

    const { playlistId } = route.params;

    const [playlist, setPlaylist] = useState();
    const [emptyPlaylist, setEmptyPlaylist] = useState();

    useEffect(() => {
        fetchPlaylist();
    }, []);

    const fetchPlaylist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/playlistsongs/${playlistId}`);
        if (data.length > 0) {
            setPlaylist(data);
        } else {
            const playlistIsEmpty = await axios.get(`http://10.0.2.2:8080/playlists/${playlistId}`)
            setEmptyPlaylist(playlistIsEmpty.data);
        }
    }


    return (
        playlist ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Playlist Name: {playlist[0].Playlist.name}</Text>
                        <Text style={globalStyles.detailsId}>Cover Image:</Text>
                        <Image
                            style={globalStyles.imageId}
                            source={{ uri: playlist[0].Playlist.coverImg }}
                        />
                        <Text style={globalStyles.detailsId}>Created At: {playlist[0].Playlist.createdAt.split('T')[0].slice(0, 10)}</Text>
                        <Text style={globalStyles.detailsId}>Updated At: {playlist[0].Playlist.updatedAt.split('T')[0].slice(0, 10)}</Text>
                    </View>
                    <View style={globalStyles.carouselsId}>
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Songs:</Text>
                            <Songs songs={playlist.map(item => item.Song)} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

export default PlaylistId
