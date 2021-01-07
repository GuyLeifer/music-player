import { StyleSheet, Dimensions, Platform, PixelRatio } from 'react-native';
const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export const globalStyles = StyleSheet.create({
    header: {
        fontSize: normalize(30),
        color: 'white',
    },
    topHeader: {
        fontSize: normalize(24),
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 8,
        color: 'white',
    },
    topContainer: {
        flex: 1
    },
    carouselView: {
        flex: 1,
    },
    topTitle: {
        fontSize: normalize(18),
        textAlign: 'center',
        color: 'white',
    },
    topName: {
        fontSize: normalize(24),
        color: 'white',
    },
    details: {
        fontSize: normalize(18),
        color: 'white',
    },

    // Id Components
    containerId: {
        marginVertical: '3%',
        flex: 1,
        backgroundColor: 'black',
        color: 'white',
    },
    detailsViewId: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textId: {
        textAlign: 'center',
        fontSize: normalize(18),
    },
    imageId: {
        width: 180,
        height: 180,
        margin: '2%',
        backgroundColor: 'white',
    },
    topNameId: {
        color: 'white',
        fontSize: normalize(22),
        textAlign: 'center',
    },
    detailsId: {
        color: 'white',
        fontSize: normalize(18),
        marginTop: '3%',
    },
    carouselsId: {
        marginVertical: '15%',
    },
    carouselId: {
        height: 300,
    },
    scrollViewId: {
        backgroundColor: 'black',
    },
    touchableOpacityId: {
        width: 375,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    carouselTitle: {
        fontSize: normalize(18),
        textAlign: 'center',
        color: 'white',
        marginTop: 15,
        marginBottom: 8,
    },
    marginView: {
        marginTop: 20,
        marginBottom: 8,
        flex: 1,
        alignItems: 'center',
    },
})
