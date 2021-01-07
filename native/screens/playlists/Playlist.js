import React from 'react';
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { View, Text, Image, StyleSheet } from 'react-native';

import { globalStyles } from '../../styles/global'

function Playlist({ playlist }) {

    return (
        playlist ?
            <View style={styles.container} >
                <Text style={globalStyles.topTitle}>{playlist.name}</Text>
                <Image
                    style={styles.image}
                    source={{ uri: playlist.coverImg }}
                />
            </View>
            :
            <>
            </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
    image: {
        width: 180,
        height: 180,
        margin: '1%',
        backgroundColor: 'white',
    }
})

export default Playlist
