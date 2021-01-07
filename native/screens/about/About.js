import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { normalize } from '../../styles/global';
import youtubeIcon from './images/youtubeIcon.jpg'

function About({ navigation }) {

    const handlePress = () => {
        navigation.navigate('Home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Screen</Text>
            <Text style={styles.text}>This is a Music Streamer Included a Database of Songs, Artists, Albums and Playlists.</Text>
            <Image style={styles.image} source={youtubeIcon} />
            <Text style={styles.text}>Enjoy the Experience of the Streamer!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        alignContent: 'center',
        padding: '5%',
    },
    title: {
        fontSize: normalize(24),
        color: 'white',
        padding: '5%',
    },
    text: {
        fontSize: normalize(20),
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: 180,
        height: 180,
        margin: '10%',
        borderRadius: 100,
    },
})

export default About
