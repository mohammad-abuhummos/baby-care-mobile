/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen';
import Placeholder from './screens/Placeholder';
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import CompleteSignUp from './screens/Auth/CompleteSignUp';
import {NavigationContainer, DrawerItems} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

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
export const UserContext = React.createContext();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  console.log('user', user);
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  console.log('initializing ', initializing);

  const Stack = createStackNavigator();
  let authContext = 'null';
  if (!!user && !initializing) {
    authContext = user._user.uid;
  }
  console.log('authContextAPp', authContext);
  return (
    <UserContext.Provider value={authContext}>
      <NavigationContainer>
        <View>
          {!!user && !initializing ? (
            <Text>
              Welcome{user._user.email} + {authContext}
            </Text>
          ) : (
            <Text>Login</Text>
          )}
        </View>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SignIn">
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="CompleteSignUp" component={CompleteSignUp} />
          <Stack.Screen name="Home" component={AppDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
