import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Songs from '../songs/Songs';
import Artists from '../artists/Artists';
import Albums from '../albums/Albums';
import Playlists from '../playlists/Playlists';

import deleteIcon from './images/deleteIcon.png'

import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../../shared/Atoms/userState';

function UserId({ route }) {
    const { userId } = route.params;
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useRecoilState(userState);
    const [userPlaylists, setUserPlaylists] = useState();

    useEffect(() => {
        fetchUser();
        fetchUserPlaylists();
    }, []);

    const fetchUser = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/users/${userId}`);
        console.log(data)
        setUser(data);
    }
    const fetchUserPlaylists = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/users/playlists/${userId}`)
        setUserPlaylists(data.Playlist || data.Playlists)
    };
    const logout = async () => {
        await axios.post('http://10.0.2.2:8080/users/logout');
        setUsername(null);
    }
    const deleteUser = async () => {

    }

    return (
        user ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>User Name: {user.name}</Text>
                        <Text style={globalStyles.detailsId}>Created At: {user.createdAt.split('T')[0].slice(0, 10)}</Text>
                        <Text style={globalStyles.detailsId}>Updated At: {user.updatedAt.split('T')[0].slice(0, 10)}</Text>
                        {username ?
                            username.id === user.id ?
                                <View style={styles.button}>
                                    <Button color="#494f52" title={"logout"} onPress={() => logout()} />
                                </View>
                                :
                                <View style={styles.button}></View>
                            :
                            <View style={styles.button}></View>
                        }
                    </View>
                    {userPlaylists && (
                        <View style={globalStyles.carouselId}>
                            {username ?
                                username.id === user.id ? <Text style={globalStyles.carouselTitle}>My Playlists:</Text>
                                    : userPlaylists &&
                                        userPlaylists.length > 0 ?
                                        <Text style={globalStyles.carouselTitle}>User Playlists:</Text>
                                        : null
                                : userPlaylists &&
                                    userPlaylists.length > 0 ?
                                    <Text style={globalStyles.carouselTitle}>User Playlists:</Text>
                                    : null
                            }
                            {userPlaylists && (
                                <Playlists playlists={userPlaylists} />
                            )}
                        </View>
                    )}

                    {user.InteractionSongs && (
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Songs Liked By User:</Text>
                            <Songs songs={user.InteractionSongs.map((interaction) => interaction.Song)} />
                        </View>
                    )}
                    {user.InteractionArtists && (
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Artists Liked By User:</Text>
                            <Artists artists={user.InteractionArtists.map((interaction) => interaction.Artist)} />
                        </View>
                    )}
                    {user.InteractionAlbums && (
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Albums Liked By User:</Text>
                            <Albums albums={user.InteractionAlbums.map((interaction) => interaction.Album)} />
                        </View>
                    )}
                    {user.InteractionPlaylists && (
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Playlists Liked By User:</Text>
                            <Playlists playlists={user.InteractionPlaylists.map((interaction) => interaction.Playlist)} />
                        </View>
                    )}
                    {username ?
                        username.id === user.id &&
                        <TouchableOpacity style={styles.deleteView} onPress={() => deleteUser()}>
                            <Image style={styles.deleteIcon} source={deleteIcon} />
                        </TouchableOpacity>
                        : null
                    }
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#494f52',
        textAlign: 'center',
        fontSize: 20,
    },
    button: {
        margin: 30,
    },
    deleteView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: '7%',
    },
    deleteIcon: {
        backgroundColor: 'red',
        borderRadius: 100,
        height: 60,
        width: 60,
    }
})

export default UserId
