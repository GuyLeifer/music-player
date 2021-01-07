import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { SafeAreaView, StyleSheet, } from 'react-native';
import Constants from 'expo-constants';

//recoil
import { RecoilRoot } from 'recoil-react-native';

import Header from './screens/general/Header';
import Footer from './screens/general/Footer';

import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/drawerNavigator";

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
})


export default function App() {
  const [fontsLoaded, setFontLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <RecoilRoot>
        <SafeAreaView style={styles.container}>
          <Header />
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
          <Footer />
        </SafeAreaView>
      </RecoilRoot>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  }
})
