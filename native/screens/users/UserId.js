import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";

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
    const { control, handleSubmit, errors } = useForm();

    const [user, setUser] = useState(null);
    const [username, setUsername] = useRecoilState(userState);
    const [userPlaylists, setUserPlaylists] = useState();
    const [newPlaylist, setNewPlaylist] = useState(false);

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
        await axios.delete(`http://10.0.2.2:8080/users/${user.id}`);
        await axios.delete(`http://10.0.2.2:8080/elasticsearch/users/${user.id}`);
        navigation.navigate('Home');
    }

    const createPlaylist = async (data) => {
        const { name, coverImg } = data;
        let playlist = await axios.post('http://10.0.2.2:8080/playlists', {
            userId: username.id,
            name: name,
            coverImg: coverImg
        });
        playlist = playlist.data;

        // send to 9200 port for elastic search
        await axios.post('http://10.0.2.2:8080/elasticsearch/playlists', {
            id: playlist.id,
            name: playlist.name
        })
        setNewPlaylist(false);
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
                    {username ?
                        username.id === user.id &&
                        <View style={styles.buttonCreateNew}>
                            <Button
                                title="Create a New Playlist"
                                color="#494f52"
                                onPress={() => setNewPlaylist(!newPlaylist)}
                            />
                        </View>
                        : null
                    }
                    {newPlaylist &&
                        <View style={styles.formView}>
                            <View style={styles.centeredView}>
                                <View>
                                    <Text style={styles.header}>New Playlist</Text>
                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>Playlist Name:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder={"name"}
                                                />
                                            </View>
                                        )}
                                        name="name"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.emailLogin && <Text>Playlist Name is required.</Text>}

                                    <Controller
                                        control={control}
                                        render={({ onChange, onBlur, value }) => (
                                            <View style={styles.viewLabel}>
                                                <Text style={styles.label}>Cover Image:</Text>
                                                <TextInput
                                                    style={styles.input}
                                                    onBlur={onBlur}
                                                    onChangeText={value => onChange(value)}
                                                    value={value}
                                                    placeholder="cover Image Link"
                                                />
                                            </View>
                                        )}
                                        name="coverImg"
                                        rules={{ required: true }}
                                        defaultValue=""
                                    />
                                    {errors.coverImg && <Text>Cover Image is required.</Text>}
                                    <Button title="Submit" color='black' onPress={handleSubmit(createPlaylist)} />
                                </View>
                            </View>
                        </View>
                    }

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
            </ScrollView >
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
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        letterSpacing: 1,
        textAlign: 'center',
    },
    viewLabel: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        margin: '2%',
    },
    label: {
        color: 'white',
        textAlign: 'center',
        margin: '2%',
    },
    input: {
        borderWidth: 1,
        fontSize: 20,
        width: 200,
        borderColor: 'white',
        color: 'white',
        paddingHorizontal: '5%',
        textAlign: 'center',
    },
    centeredView: {
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        padding: 10,
        backgroundColor: '#494f52',
    },
    formView: {
        justifyContent: "center",
        alignItems: "center",
    },
    buttonCreateNew: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: "center",
        marginTop: 20,
    }
})

export default UserId
