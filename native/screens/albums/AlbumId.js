import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';

import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global'

function AlbumId({ route }) {

    const { albumId } = route.params;

    const [album, setAlbum] = useState(null);

    useEffect(() => {
        fetchAlbum();
    }, []);

    const fetchAlbum = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/albums/${albumId}`);
        console.log(data)
        setAlbum(data);
    }


    return (
        album ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Album Name: {album.name}</Text>
                        <Text style={globalStyles.topNameId}>Artist Name: {album.Artist.name}</Text>
                        <Text style={globalStyles.detailsId}>Cover Image:</Text>
                        <Image
                            style={globalStyles.imageId}
                            source={{ uri: album.coverImg }}
                        />
                        <Text style={globalStyles.detailsId}>Created At: {album.createdAt.split('T')[0].slice(0, 10)}</Text>
                        <Text style={globalStyles.detailsId}>Updated At: {album.updatedAt.split('T')[0].slice(0, 10)}</Text>
                    </View>
                    <View style={globalStyles.carouselsId}>
                        <View style={globalStyles.carouselId}>
                            <Text style={globalStyles.carouselTitle}>Songs:</Text>
                            <Songs songs={album.Songs} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            :
            <>
            </>
    )
}

export default AlbumId
