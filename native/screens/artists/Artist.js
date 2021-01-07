import React from 'react';
// import { YouTubeStandaloneAndroid } from 'react-native-youtube';
import { View, Text, Image, StyleSheet } from 'react-native';

import { globalStyles } from '../../styles/global'

function Artist({ artist }) {

    return (
        artist ?
            <View style={styles.container} >
                <Text style={globalStyles.topTitle}>{artist.name}</Text>
                <Image
                    style={styles.image}
                    source={{ uri: artist.coverImg }}
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
        backgroundColor: 'white'
    }
})

export default Artist
