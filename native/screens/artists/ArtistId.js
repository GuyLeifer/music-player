import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Albums from '../albums/Albums';
import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global';

import likeIcon from '../../shared/images/likeIcon.webp';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../../shared/Atoms/userState';

function ArtistId({ route }) {

    const { artistId } = route.params;

    const [artist, setArtist] = useState(null);
    const [user, setUser] = useRecoilState(userState);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchArtist();
        fetchIsLiked();
    }, []);

    const fetchArtist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/api/artists/${artistId}`);
        setArtist(data);
    }

    const fetchIsLiked = async () => {
        if (user && artist) {
            const { data } = await axios.get(`http://10.0.2.2:8080/api/interactions/artists/${user.id}&${artist.id}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likeArtist = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/api/interactions/artists/${user.id}&${artist.id}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/api/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: true
            })
        } else {
            await axios.post('http://10.0.2.2:8080/api/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeArtist = async () => {
        const data = await axios.get(`http://10.0.2.2:8080/api/interactions/artists/${user.id}&${artist.id}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/api/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: false
            })
        } else {
            await axios.post('http://10.0.2.2:8080/api/interactions/artists', {
                userId: user.id,
                artistId: artist.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }
    return (
        artist ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Artist Name: {artist.name}</Text>
                        {user ?
                            <>
                                {!isLiked ?
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => likeArtist()}
                                    >
                                        <Image source={likeIcon} style={globalStyles.likeIcon} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => unlikeArtist()}>
                                        <Image source={likeIcon} style={globalStyles.unLikeIcon} />
                                    </TouchableOpacity>
                                }
                            </>
                            : null
                        }
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
                            <Songs songs={artist.Songs} artistId={artist.id} />
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
