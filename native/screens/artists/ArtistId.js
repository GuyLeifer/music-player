import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';

import Albums from '../albums/Albums';
import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global'

function ArtistId({ route }) {

    const { artistId } = route.params;

    const [artist, setArtist] = useState(null);

    useEffect(() => {
        fetchArtist();
    }, []);

    const fetchArtist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/artists/${artistId}`);
        setArtist(data);
    }


    return (
        artist ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Artist Name: {artist.name}</Text>
                        <Text style={globalStyles.detailsId}>Cover Image:</Text>
                        <Image
                            style={globalStyles.imageId}
                            source={{ uri: artist.coverImg }}
                        />
                        <Text style={globalStyles.detailsId}>Created At: {artist.createdAt.split('T')[0].slice(0, 10)}</Text>
                        <Text style={globalStyles.detailsId}>Updated At: {artist.updatedAt.split('T')[0].slice(0, 10)}</Text>
                    </View>
                    <View style={globalStyles.carouselsId}>
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Albums:</Text>
                            <Albums albums={artist.Albums} />
                        </View>
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Songs:</Text>
                            <Songs songs={artist.Songs} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

export default ArtistId
