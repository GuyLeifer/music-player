import React from 'react';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import { WebView } from 'react-native-webview';

import { View, Text, StyleSheet } from 'react-native';

function Song({ song }) {

    return (
        song ?
            <View>
                <Text style={styles.text}>{song.title}</Text>
                <Text style={styles.text}>{song.length}</Text>
                <View style={{ flex: 1 }}>
                    {/* <WebView
                        style={{ marginTop: 20, }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        source={{ uri: 'https://www.youtube.com/embed/' + song.youtubeLink }}
                        source={{ uri: 'https://reactnative.dev/' }}
                    /> */}
                    {/* <YouTube
                        // You must have an API Key for the player to load in Android
                        // apiKey={"AIzaSyB6XYA4brY4L9FhzAbf4W7QEvxWn6fo2wE"}
                        // Un-comment one of videoId / videoIds / playlist.
                        // You can also edit these props while Hot-Loading in development mode to see how
                        // it affects the loaded native module
                        // videoId={song.youtubeLink}
                    // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
                    // playlistId="PL3c6c2pNE7cLc5a0zpz7xZOW38H7lzzKM"
                    /> */}
                </View>
            </View>
            :
            <>
            </>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: 'white',
    },
})

export default Song
