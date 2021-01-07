import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

import Songs from '../songs/Songs';

import { globalStyles } from '../../styles/global';

import likeIcon from '../../shared/images/likeIcon.webp';

//recoil
import { useRecoilState } from "recoil-react-native";
import { userState } from '../../shared/Atoms/userState';

function AlbumId({ route }) {

    const { albumId } = route.params;

    const [album, setAlbum] = useState(null);
    const [user, setUser] = useRecoilState(userState);
    const [isLiked, setIsLiked] = useState();

    useEffect(() => {
        fetchAlbum();
        fetchIsLiked();
    }, []);

    const fetchAlbum = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/albums/${albumId}`);
        console.log(data)
        setAlbum(data);
    }
    const fetchIsLiked = async () => {
        if (user && album) {
            const { data } = await axios.get(`http://10.0.2.2:8080/interactions/albums/${user.id}&${album.id}`);
            if (data) setIsLiked(data.isLiked);
            else setIsLiked(null)
        } else {
            setIsLiked(null)
        }
    };

    // Like Functions
    const likeAlbum = async () => {
        const { data } = await axios.get(`http://10.0.2.2:8080/interactions/albums/${user.id}&${album.id}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: true
            })
        } else {
            await axios.post('http://10.0.2.2:8080/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: true
            })
        }
        setIsLiked(true)
    }
    const unlikeAlbum = async () => {
        const data = await axios.get(`http://10.0.2.2:8080/interactions/albums/${user.id}&${album.id}`)
        if (data) {
            await axios.patch('http://10.0.2.2:8080/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: false
            })
        } else {
            await axios.post('http://10.0.2.2:8080/interactions/albums', {
                userId: user.id,
                albumId: album.id,
                isLiked: false
            })
        }
        setIsLiked(false)
    }

    return (
        album ?
            <ScrollView style={globalStyles.scrollViewId}>
                <View style={globalStyles.containerId} >
                    <View style={globalStyles.detailsViewId}>
                        <Text style={globalStyles.topNameId}>Album Name: {album.name}</Text>
                        <Text style={globalStyles.topNameId}>Artist Name: {album.Artist.name}</Text>
                        {user ?
                            <>
                                {!isLiked ?
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => likeAlbum()}
                                    >
                                        <Image source={likeIcon} style={globalStyles.likeIcon} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={globalStyles.likeView}
                                        onPress={() => unlikeAlbum()}>
                                        <Image source={likeIcon} style={globalStyles.unLikeIcon} />
                                    </TouchableOpacity>
                                }
                            </>
                            : null
                        }
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
