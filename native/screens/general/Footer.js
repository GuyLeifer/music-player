import React from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet, Linking, Text } from 'react-native';

function Footer() {

    return (
        <View style={styles.container} >
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.facebook.com/guy.leifer')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/facebookIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.c}
                onPress={() => Linking.openURL('https://github.com/GuyLeifer')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/githubIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => Linking.openURL('https://www.linkedin.com/in/guy-leifer-a7036a1b6/')}
            >
                <ImageBackground
                    style={styles.image}
                    source={require('./images/linkedinIcon.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.03,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#494f52',
        padding: '3%',
    },
    image: {
        width: 30,
        height: 30,
        margin: '3%',
        borderRadius: 50,
    },

})

export default Footer
