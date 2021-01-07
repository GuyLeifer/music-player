import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

// packages
import Carousel from 'react-native-carousel';
// import { Link } from 'react-router-native';

// components
import Song from './Song';

function TopSongs({ topSongs, topOption }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            <Text style={globalStyles.topHeader}>Top Songs</Text>
            {topSongs.length > 0 && (
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
                        {topSongs.map(interaction =>
                            <TouchableOpacity
                                key={interaction.Song.title}
                                onPress={() => navigation.navigate('Song', {
                                    songId: interaction.Song.id
                                })}
                            >
                                <Song song={interaction.Song} />
                            </TouchableOpacity>

                        )}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default TopSongs;