import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { globalStyles } from '../../styles/global'

function Header() {

    return (
        <View style={styles.container} >
            <Text style={globalStyles.header}>Music</Text>
            <Image
                style={styles.image}
                source={require('./images/streamerIcon.png')}
            />
            <Text style={globalStyles.header}>Player</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.06,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#494f52',
        paddingTop: '3%',
    },
    text: {
        color: 'white',
    },
    image: {
        width: 30,
        height: 30,
        marginHorizontal: '3%',
    }
})

export default Header
