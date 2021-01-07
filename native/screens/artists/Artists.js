import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/global';

// packages
import Carousel from 'react-native-carousel';
import { useNavigation } from '@react-navigation/native';

// components
import Artist from './Artist';

function Artists({ artists }) {
    const navigation = useNavigation();

    return (
        <View style={globalStyles.topContainer}>
            {artists.length > 0 && (
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
                        {artists.map(artist => {
                            return (
                                <TouchableOpacity
                                    key={artist.name}
                                    onPress={() => navigation.navigate('Artist', {
                                        artistId: artist.id
                                    })}
                                >
                                    <Artist key={artist.name} artist={artist} />
                                </TouchableOpacity>
                            )
                        })}
                    </Carousel>
                </View>
            )}
        </View>
    )
}

export default Artists;