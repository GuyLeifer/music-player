import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'react-router-native';

// components
import Artist from './Artist';

function TopArtists({ topArtists, topOption }) {
    const navigation = useNavigation();
    return (
        <View style={globalStyles.topContainer}>
            <Text style={globalStyles.topHeader}>Top Artists</Text>
            {topArtists.length > 0 && (
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
                        {topArtists.map(interaction => {
                            return (
                                <TouchableOpacity
                                    key={interaction.Artist.name}
                                    onPress={() => navigation.navigate('Artist', {
                                        artistId: interaction.Artist.id
                                    })}
                                >
                                    <Artist artist={interaction.Artist} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default TopArtists;