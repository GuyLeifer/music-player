import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

import Albums from '../albums/Albums';
import Songs from './Songs';

import { globalStyles } from '../../styles/global';

import likeIcon from '../../shared/images/likeIcon.webp';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../../shared/Atoms/userState';

function SongId({ route }) {
    const navigation = useNavigation();
    const { songId, artistId, albumId, playlistId } = route.params;

    const [song, setSong] = useState(null);
    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [playlist, setPlaylist] = useState(null);

    const [user, setUser] = useRecoilState(userState);
    const [isLiked, setIsLiked] = useState();
    const [playCount, setPlayCount] = useState();
    const [playlists, setPlaylists] = useState(null);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        fetchSong();
    }, []);

    useEffect(() => {
        fetchIsLikedAndIncrementPlayCount();
        fetchPlaylists()
    }, [user, song]);

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

    const fetchIsLikedAndIncrementPlayCount = async () => {
        if (user && song) {
            const { data } = await axios.get(`http://10.0.2.2:8080/interactions/songs/${user.id}&${song.id}`);
            if (data) {
                setIsLiked(data.isLiked);
                if (data.playCount === null) {
                    setPlayCount(1);
                    axios.patch('http://10.0.2.2:8080/interactions/songs/', {
                        userId: user.id,
                        songId: song.id,
                        playCount: 1
                    })
                } else {
                    setPlayCount(data.playCount + 1);
                    axios.patch('http://10.0.2.2:8080/interactions/songs/', {
                        userId: user.id,
                        songId: song.id,
                        playCount: data.playCount + 1
                    })
                }
            } else {
                setIsLiked(false);
                setPlayCount(1);
                axios.post('http://10.0.2.2:8080/interactions/songs/', {
                    userId: user.id,
                    songId: song.id,
                    playCount: 1
                })
            }
        } else {
            setIsLiked(null)
        }
    };

    const likeSong = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/interactions/songs/${user.id}&${song.id}`);
        if (data) {
            await axios.patch('http://10.0.2.2:8080/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: true
            })
        } else {
            await axios.post('http://10.0.2.2:8080/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeSong = async () => {
        const data = await axios.get(`http://10.0.2.2:8080/interactions/songs/${user.id}&${song.id}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: false
            })
        } else {
            await axios.post('http://10.0.2.2:8080/interactions/songs', {
                userId: user.id,
                songId: song.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    const fetchPlaylists = async () => {
        if (user) {
            const { data } = await axios.get(`http://10.0.2.2:8080/users/playlists/${user.id}`);
            setPlaylists(data.Playlist || data.Playlists)
        } else {
            setPlaylists(null);
        }
    }

    const addToPlaylist = async (playlistId, songId) => {
        await axios.post('http://10.0.2.2:8080/playlistsongs', {
            "playlistId": Number(playlistId),
            "songId": songId,
        });
    }

    return (
        song ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Song Title:</Text>
                        <Text style={globalStyles.topNameId}>{song.title}</Text>
                        <Text style={globalStyles.detailsId}>Total Plays: {song.playCount + 1}</Text>
                        <Text style={globalStyles.detailsId}>YouTube:</Text>

                        {user ?
                            <>
                                {playCount &&
                                    <>
                                        <Text style={globalStyles.detailsId}>Play Count By Me: {playCount}</Text>
                                    </>
                                }
                                {!isLiked ?
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => likeSong()}
                                    >
                                        <Image source={likeIcon} style={globalStyles.likeIcon} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => unlikeSong()}>
                                        <Image source={likeIcon} style={globalStyles.unLikeIcon} />
                                    </TouchableOpacity>
                                }
                                {playlists && (
                                    <View style={globalStyles.addPlView}>
                                        <Text style={globalStyles.addPlText}>Add To Your Playlist</Text>
                                        <View className="buttons">
                                            <Picker
                                                selectedValue={selectedValue}
                                                style={{ backgroundColor: 'white', }}
                                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                                itemStyle={{ color: 'white' }}
                                            >
                                                {playlists.map(playlist =>
                                                    <Picker.Item label={playlist.name} value={playlist.id} />
                                                )}
                                            </Picker>
                                            <Button color="#494f52" title="ADD" onPress={() => addToPlaylist(selectedValue, song.id)} />
                                        </View>
                                    </View>
                                )}
                            </>
                            : null
                        }

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
                        </View>
                        <View style={globalStyles.marginView}>
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
            </ScrollView >
            :
            <>
            </>
    )
}

export default SongId
