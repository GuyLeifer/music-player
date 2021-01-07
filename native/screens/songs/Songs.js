import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'react-router-native';

// components
import Song from './Song';

function Songs({ songs, artistId, albumId, playlistId }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            {songs.length > 0 && (
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
                        {songs.map(song => {
                            return (
                                <TouchableOpacity
                                    key={song.title}
                                    onPress={() => navigation.navigate('Song', {
                                        songId: song.id,
                                        artistId,
                                        albumId,
                                        playlistId
                                    })}
                                >
                                    <Song song={song} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default Songs;