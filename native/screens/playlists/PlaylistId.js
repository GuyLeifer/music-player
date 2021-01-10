import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global';

import likeIcon from '../../shared/images/likeIcon.webp';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../../shared/Atoms/userState';

function PlaylistId({ route }) {

    const { playlistId } = route.params;
    const navigation = useNavigation();

    const [playlist, setPlaylist] = useState();
    const [emptyPlaylist, setEmptyPlaylist] = useState();
    const [user, setUser] = useRecoilState(userState);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchPlaylist();
        fetchIsLiked();
    }, []);

    const fetchPlaylist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/api/playlistsongs/${playlistId}`);
        if (data.length > 0) {
            setPlaylist(data);
        } else {
            const playlistIsEmpty = await axios.get(`http://10.0.2.2:8080/api/playlists/${playlistId}`)
            setEmptyPlaylist(playlistIsEmpty.data);
        }
    }

    const fetchIsLiked = async () => {
        if (user && playlist) {
            const { data } = await axios.get(`http://10.0.2.2:8080/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likePlaylist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        } else {
            await axios.post('http://10.0.2.2:8080/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikePlaylist = async () => {
        const data = await axios.get(`http://10.0.2.2:8080/api/interactions/playlists/${user.id}&${playlist[0].PlaylistId}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        } else {
            await axios.post('http://10.0.2.2:8080/api/interactions/playlists', {
                userId: user.id,
                playlistId: playlist[0].PlaylistId,
                isLiked: false
            })
        }
        setIsLiked(false)
    }


    return (
        playlist ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Playlist Name: {playlist[0].Playlist.name}</Text>
                        {user ?
                            <>
                                {!isLiked ?
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => likePlaylist()}
                                    >
                                        <Image source={likeIcon} style={globalStyles.likeIcon} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => unlikePlaylist()}>
                                        <Image source={likeIcon} style={globalStyles.unLikeIcon} />
                                    </TouchableOpacity>
                                }
                            </>
                            : null
                        }
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
                            <Songs songs={playlist.map(item => item.Song)} playlistId={playlist[0].Playlist.id} />
                        </View>
                    </View>
                    <View>
                        <Text style={globalStyles.topNameId}>List Of The Songs ({playlist.length}):</Text>
                        {playlist.map(item =>
                            <TouchableOpacity
                                style={styles.TouchableOpacitySong}
                                onPress={() => navigation.navigate('Song', {
                                    songId: item.Song.id,
                                    playlistId: playlist[0].Playlist.id
                                })}>
                                <Text style={styles.songTitle}>{item.Song.title}</Text>
                                <Text style={styles.songLength}>{item.Song.length}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

const styles = StyleSheet.create({
    songTitle: {
        color: 'white',
        fontSize: 18,
        flex: 0.7,
        marginTop: '3%',
        textAlign: 'center',
    },
    songLength: {
        color: 'white',
        fontSize: 18,
        flex: 0.3,
        marginTop: '3%',
        textAlign: 'center',
    },
    TouchableOpacitySong: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

export default PlaylistId
