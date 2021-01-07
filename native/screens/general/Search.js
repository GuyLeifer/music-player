import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';

import { normalize } from '../../styles/global';

// icons
import songIcon from './images/songIcon.webp';
import artistIcon from './images/artistIcon.png';
import albumIcon from './images/albumIcon.webp';
import playlistIcon from './images/playlistIcon.jpg';
import userIcon from './images/userIcon.png';
import { ScrollView } from 'react-native-gesture-handler';

function Search({ navigation }) {

    const [search, setSearch] = useState("")
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [users, setUsers] = useState([])

    const handlePress = () => {
        navigation.navigate('Home')
    }

    const changeHandler = async (e) => {
        setSearch(e)
        if (e === '') {
            setSongs([]);
            setArtists([]);
            setAlbums([]);
            setPlaylists([]);
            setUsers([]);
        } else {

            try {
                // const { data } = await axios.get(`http://10.0.2.2:8080/search?params=${e}`);
                // console.log(data)
                // setOptions(data);
                const { data } = await axios.get(`http://10.0.2.2:8080/elasticsearch/all?params=${e}`);
                console.log(data)
                if (data !== undefined) {
                    setSongs(data[0]);
                    setArtists(data[1]);
                    setAlbums(data[2]);
                    setPlaylists(data[3]);
                    setUsers(data[4]);
                }
                else {
                    setSongs([]);
                    setArtists([]);
                    setAlbums([]);
                    setPlaylists([]);
                    setUsers([]);
                }
            }
            catch (err) {
                console.log(err.massage);
            }
        }
    }

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Type Here..."
                value={search}
                onChangeText={(e) => changeHandler(e)}
            />
            <ScrollView>
                {songs.map(song =>
                    <TouchableOpacity
                        key={song._source.id}
                        style={styles.searchView}
                        onPress={() => navigation.navigate('Song', {
                            songId: song._source.id
                        })}
                    >
                        <Text style={styles.searchText}>{song._source.title}</Text>
                        <Image style={styles.searchIcon} source={songIcon} />
                    </TouchableOpacity>
                )}
                {artists.map(artist =>
                    <TouchableOpacity
                        key={artist._source.id}
                        style={styles.searchView}
                        onPress={() => navigation.navigate('Artist', {
                            artistId: artist._source.id
                        })}
                    >
                        <Text style={styles.searchText}>{artist._source.name}</Text>
                        <Image style={styles.searchIcon} source={artistIcon} />
                    </TouchableOpacity>
                )}
                {albums.map(album =>
                    <TouchableOpacity
                        key={album._source.id}
                        style={styles.searchView}
                        onPress={() => navigation.navigate('Album', {
                            albumId: album._source.id
                        })}
                    >
                        <Text style={styles.searchText}>{album._source.name}</Text>
                        <Image style={styles.searchIcon} source={albumIcon} />
                    </TouchableOpacity>
                )}
                {playlists.map(playlist =>
                    <TouchableOpacity
                        key={playlist._source.id}
                        style={styles.searchView}
                        onPress={() => navigation.navigate('Playlist', {
                            playlistId: playlist._source.id
                        })}
                    >
                        <Text style={styles.searchText}>{playlist._source.name}</Text>
                        <Image style={styles.searchIcon} source={playlistIcon} />
                    </TouchableOpacity>
                )}
                {users.map(user =>
                    <TouchableOpacity
                        key={user._source.id}
                        style={styles.searchView}
                        onPress={() => navigation.navigate('User', {
                            userId: user._source.id
                        })}
                    >
                        <Text style={styles.searchText}>{user._source.name}</Text>
                        <Image style={styles.searchIcon} source={userIcon} />
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginVertical: '1%',
        borderColor: 'black',
        borderWidth: 1,
    },
    searchText: {
        fontSize: normalize(14),
        textAlign: 'left',
    },
    searchIcon: {
        width: 40,
        height: 40,
        margin: '1%',
        borderRadius: 100,
    },
})

export default Search
