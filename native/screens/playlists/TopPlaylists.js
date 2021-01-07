import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'react-router-native';

// components
import Playlist from './Playlist';

function TopPlaylists({ topPlaylists, topOption }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            <Text style={globalStyles.topHeader}>Top Playlists</Text>
            {topPlaylists.length > 0 && (
                <View style={globalStyles.carouselView}>
                    <Carousel
                        hideIndicators={false}
                        indicatorOffset={-20}
                        animate={true}
                        delay={2000}
                        loop={true}
                        inactiveIndicatorColor="white"
                        indicatorColor="grey"
                    >
                        {topPlaylists.map(interaction => {
                            return (
                                <TouchableOpacity
                                    key={interaction.Playlist.name}
                                    onPress={() => navigation.navigate('Playlist', {
                                        playlistId: interaction.Playlist.id
                                    })}
                                >
                                    <Playlist playlist={interaction.Playlist} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default TopPlaylists;