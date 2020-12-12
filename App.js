/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import {StyleSheet, Text, View ,Image} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import Placeholder from './screens/Placeholder';
import {NavigationContainer, DrawerItems} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
function CustomDrawerContentComponent(props) {
  return (
    <View style={{paddingVertical: 60}}>
      <View style={{padding: 20}}>
        <Image
          source={require('./assets/baby.jpeg')}
          style={{width: 100, height: 100, borderRadius: 50}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', paddingLeft: 15}}>
          kdcnjdn
        </Text>
        <Text style={{paddingLeft: 15}}>Bela@gmail.com</Text>
      </View>

      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert('Link to help')} />
    </View>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
    drawerStyle={{
      backgroundColor: 'rgba(238, 151, 159, 0.8)',
      width: 240,
    }}
      initialRouteName="Placeholder"
      drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
      <Drawer.Screen name="Placeholder" component={Placeholder} />
    </Drawer.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
