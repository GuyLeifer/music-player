import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'react-router-native';

// components
import Album from './Album';

function TopAlbums({ topAlbums, topOption }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            <Text style={globalStyles.topHeader}>Top Albums</Text>
            {topAlbums.length > 0 && (
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
                        {topAlbums.map(interaction => {
                            return (
                                <TouchableOpacity
                                    key={interaction.Album.name}
                                    onPress={() => navigation.navigate('Album', {
                                        albumId: interaction.Album.id
                                    })}
                                >
                                    <Album album={interaction.Album} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default TopAlbums;