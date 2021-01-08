import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';
import * as RootNavigation from '../../navigation/rootNavigation';

function Header() {
    return (
        <View style={styles.container} >
            <TouchableOpacity
                onPress={() => RootNavigation.navigate('About')}
            >
                <Image
                    style={styles.image}
                    source={require('./images/settingsIcon.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.main}
                onPress={() => RootNavigation.navigate('Home')}
            >
                <Text style={globalStyles.header}>Music</Text>
                <Image
                    style={styles.image}
                    source={require('./images/streamerIcon.png')}
                />
                <Text style={globalStyles.header}>Player</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => RootNavigation.navigate('Search')}
            >
                <Image
                    style={styles.imageSide}
                    source={require('./images/searchIcon.png')}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.06,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#494f52',
        paddingTop: '3%',
        paddingHorizontal: '2%',
    },
    text: {
        color: 'white',
    },
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginHorizontal: '3%',
    },
    imageSide: {
        width: 30,
        height: 30,
        borderRadius: 100,
        marginHorizontal: '3%',
        backgroundColor: 'white',
        right: -16,
    },
})

export default Header
