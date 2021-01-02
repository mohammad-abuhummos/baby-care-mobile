/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
// import WelcomeScreen from './screens/WelcomeScreen';
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
import CreateBabyAccount from './screens/Auth/CreateBabyAccount';
import Home from './screens/Home';
import BabyProfile from './screens/BabyProfile';
import EditBabyinfo from './screens/EditBabyinfo';
import LoadingIndicator from './components/LoadingIndicator';
import UserProfile from './screens/UserProfile';
import EditUserProfile from './screens/EditUserProfile';

export const UserContext = React.createContext();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const signOut = () => {
    setInitializing(true);
    auth()
      .signOut()
      .then(() => setUser(null));
  };
  const Drawer = createDrawerNavigator();
  const ProfileStack = createStackNavigator();

  function Profile() {
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <ProfileStack.Screen
            name="ProfileInfo"
            options={{
              title: 'Profile',
              headerStyle: {
                backgroundColor: '#EE979F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            component={UserProfile}
          />
          <Stack.Screen
            name="EditUserProfile"
            options={{
              title: 'Edit Profile',
              headerStyle: {
                backgroundColor: '#EE979F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            component={EditUserProfile}
          />
        </Stack.Navigator>
      </>
    );
  }

  function CustomDrawerContentComponent(props) {
    return (
      <View style={{paddingVertical: 60}}>
        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={() => signOut()} />
      </View>
    );
  }

  function AppDrawer() {
    return (
      <Drawer.Navigator
        screenOptions={{headerShown: true}}
        drawerStyle={{
          backgroundColor: 'rgba(238, 151, 159, 0.8)',
          width: 240,
        }}
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
        <Drawer.Screen
          name="Home"
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Home}
        />
        <Drawer.Screen
          name="BabyProfile"
          options={{
            title: 'Baby Profile',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={BabyProfile}
        />
        <Drawer.Screen
          name="UserProfile"
          options={{
            title: 'Profile',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Profile}
        />
      </Drawer.Navigator>
    );
  }

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const Stack = createStackNavigator();
  const appUserContext = {
    user,
    setInitializing,
  };
  if (initializing) {
    return <LoadingIndicator />;
  } else {
    return (
      <UserContext.Provider value={appUserContext}>
        <NavigationContainer>
          <View>
            {!!user ? (
              <Text>
                Welcome{user._user.email} + {user._user.uid}
              </Text>
            ) : (
              <Text>Login</Text>
            )}
          </View>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {!!user ? (
              <>
                <Stack.Screen name="Home" component={AppDrawer} />
                <Stack.Screen
                  name="CreateBabyAccount"
                  component={CreateBabyAccount}
                />
                <Stack.Screen
                  name="CompleteSignUp"
                  options={{
                    title: 'Edit Profile',
                    headerStyle: {
                      backgroundColor: '#EE979F',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                  component={CompleteSignUp}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="CompleteSignUp"
                  component={CompleteSignUp}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
