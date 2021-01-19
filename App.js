/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Fragment, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import SignIn from './screens/Auth/SignIn';
import SignUp from './screens/Auth/SignUp';
import CompleteSignUp from './screens/Auth/CompleteSignUp';
import {NavigationContainer, DrawerItems} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import CreateBabyAccount from './screens/Auth/CreateBabyAccount';
import LoadingIndicator from './components/LoadingIndicator';
import AppDrawer from './roots/Drawer';
import EnterBraceletId from './screens/Auth/EnterBraceletId';
import {UserContext} from './context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnterBabyid from './screens/Auth/EnterBabyid';
import SignupByIdScreen from './screens/Auth/SignupById';
import CompleteSignUpBabyidScreen from './screens/Auth/CompleteSignUpBabyid';
import EnterBraceletIdByBabyid from './screens/Auth/EnterBraceletIdByBabyid';
import EmergencyNotification from './screens/Auth/EmergencyNotification';
import ForgotPassword from './screens/Auth/ForgotPassword';
import messaging from '@react-native-firebase/messaging';


export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [babyId, setBabyId] = useState(null);
  const [bracelet, setBracelet] = useState(null);
  const [braceletIds, setBraceletIds] = useState(null);
  const [reload, setReload] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);
  const [notificationToken, setnotificationToken] = useState(null);
  const [EditLoding, setEditLoding] = useState(null);
  const [loading, setLoading] = useState(true);

  function onAuthStateChanged(user) {
    if (!!user && isSignUp) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    setInitializing(false);
    setReload(false);
  }, [reload]);

  useEffect(() => {
    getFcmToken();
    setTimeout(function () {
      setLoading(false);
    }, 4000);
  }, []);
  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  };
  const Stack = createStackNavigator();
  const appUserContext = {
    user,
    bracelet,
    babyId,
    braceletIds,
    EditLoding,
    setReload,
    setInitializing,
    setUser,
    setBracelet,
    setUserAuth,
    setBabyId,
    setBraceletIds,
    setIsSignUp,
    setEditLoding,
  };
  if (!!initializing || !!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <UserContext.Provider value={appUserContext}>
        <NavigationContainer>
          {/* <View>
            {!!user ? (
              <Text>
                Welcome{user._user.email} + {user._user.uid}
              </Text>
            ) : (
              <Text>Login</Text>
            )}
          </View> */}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {!!userAuth ? (
              <>
                <Stack.Screen name="Home" component={AppDrawer} />
                {/* <Stack.Screen
                  name="CreateBabyAccount"
                  component={CreateBabyAccount}
                /> */}
                {/* <Stack.Screen
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
                /> */}
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen
                  name="EnterBraceletId"
                  component={EnterBraceletId}
                />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen
                  name="CreateBabyAccount"
                  component={CreateBabyAccount}
                />
                <Stack.Screen
                  name="CompleteSignUp"
                  component={CompleteSignUp}
                />
                <Stack.Screen
                  name="EnterBabyid"
                  component={EnterBabyid}
                />
                <Stack.Screen
                  name="SignupByIdScreen"
                  component={SignupByIdScreen}
                />
                <Stack.Screen
                  name="CompleteSignUpBabyidScreen"
                  component={CompleteSignUpBabyidScreen}
                />
                <Stack.Screen
                  name="EnterBraceletIdByBabyid"
                  component={EnterBraceletIdByBabyid}
                />
                <Stack.Screen
                  name="EmergencyNotification"
                  component={EmergencyNotification}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
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
