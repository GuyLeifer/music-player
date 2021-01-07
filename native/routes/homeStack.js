import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import Home from '../screens/home'
import ReviewDetails from '../screens/reviewDetails'

const screens = {
    Home: {
        screen: Home
    },
    reviewDetails: {
        screen: ReviewDetails
    }
}

const HomeStack = createStackNavigator(screens)

export default NavigationContainer(HomeStack)