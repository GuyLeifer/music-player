import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { MainStackNavigator, SearchStackNavigator, AboutStackNavigator } from "./stackNavigator";
import TabNavigator from "./tabNavigator";


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#494f52',
                width: 150,
            }}
            drawerContentOptions={{
                activeTintColor: 'white',
                itemStyle: { paddingVertical: 7 },
                labelStyle: {
                    fontSize: 20,
                },
                inactiveTintColor: 'black',
            }}
        >
            <Drawer.Screen
                name="Home" component={MainStackNavigator}
                options={({ navigation }) => ({
                    // title: 'Awesome app',
                    headerLeft: () => (
                        <DrawerButton onPress={() => navigation.toggleDrawer()} />
                    ),
                })}
            />
            <Drawer.Screen name="Search" component={SearchStackNavigator} />
            <Drawer.Screen name="About" component={AboutStackNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;