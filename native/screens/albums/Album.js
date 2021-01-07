import React from 'react';
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { View, Text, Image, StyleSheet } from 'react-native';

import { globalStyles } from '../../styles/global'

function Album({ album }) {

    return (
        album ?
            <View style={styles.container} >
                <Text style={globalStyles.topTitle}>{album.name}</Text>
                <Image
                    style={styles.image}
                    source={{ uri: album.coverImg }}
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
    }
})

export default Album
