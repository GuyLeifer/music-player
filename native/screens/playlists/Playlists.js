import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';

// components
import Playlist from './Playlist';

function Playlists({ playlists }) {
    const navigation = useNavigation();
    console.log(playlists)
    return (
        <View style={globalStyles.topContainer}>
            {playlists.length > 0 && (
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
                        {playlists.map(playlist => {
                            return (
                                <TouchableOpacity
                                    key={playlist.name}
                                    onPress={() => navigation.navigate('Playlist', {
                                        playlistId: playlist.id
                                    })}
                                >
                                    <Playlist playlist={playlist} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default Playlists;