import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';
// import { Link } from 'react-router-native';

// components
import Album from './Album';

function Albums({ albums }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            {albums.length > 0 && (
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
                        {albums.map(album => {
                            return (
                                <TouchableOpacity
                                    key={album.name}
                                    onPress={() => navigation.navigate('Album', {
                                        albumId: album.id
                                    })}
                                >
                                    <Album key={album.name} album={album} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default Albums;