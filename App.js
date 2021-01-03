/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import WelcomeScreen from './screens/WelcomeScreen';
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import CompleteSignUp from './screens/Auth/CompleteSignUp';
import {NavigationContainer, DrawerItems} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import CreateBabyAccount from './screens/Auth/CreateBabyAccount';
import LoadingIndicator from './components/LoadingIndicator';
import AppDrawer from './roots/Drawer';
export const UserContext = React.createContext();
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

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
    setUser,
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
