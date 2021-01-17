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
import firebase from 'react-native-firebase';
import CreateBabyAccount from './screens/Auth/CreateBabyAccount';
import LoadingIndicator from './components/LoadingIndicator';
import AppDrawer from './roots/Drawer';
import EnterBraceletId from './screens/Auth/EnterBraceletId';
import {UserContext} from './context/AppContext';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
// console.log("notificationToken",notificationToken)

  // console.log(
  //   'notificationToken-------',
  //   notificationToken,
  //   'isSignUp-------',
  //   isSignUp,
  //   'userAuth-------',
  //   userAuth,
  //   '----------user',
  //   user,
  // );
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
    if (isSignUp && !!user) {
      database()
        .ref(`users/${user.uid}/notificationToken`)
        .set({notificationToken: notificationToken})
        .then(() => setUserAuth(true));
    }
  }, [user]);


  useEffect(() => {
    checkPermission();
    messageListener();
  }, []);
  // const reg = async () => {
  //   try {
  //     let register =  firebase.notifications().;
  //       console.log("registerDeviceForRemoteMessages---",register)
  //     setnotificationToken(register);
  //   } catch (error) {
  //     console.log("registerDeviceForRemoteMessages---",error)
  //   }
  //   // if (fcmToken) {
  //   //   console.log(fcmToken);
  //   //   showAlert('Your Firebase Token is:', fcmToken);
  //   // } else {
  //   //   showAlert('Failed', 'No token received');
  //   // }
  // };
  const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
          await AsyncStorage.setItem('fcmToken', fcmToken);
      }
  }
  };
  const checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission(); 
    }
  };
  const requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };
  messageListener = async () => {
    notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const {title, body} = notification;
        // showAlert(title, body);
      });

    notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        // showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      // showAlert(title, body);
    }

    messageListener = firebase.messaging().onMessage((message) => {
      // console.log(JSON.stringify(message));
    });
  };
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  };
  // useEffect(() => {
  //   messaging()
  //   .getToken()
  //   .then(token => {
  //    console.log("DeviceToken------",token)
  //   })
  //   // RE()
  // }, []);

  const Stack = createStackNavigator();
  const appUserContext = {
    user,
    bracelet,
    babyId,
    braceletIds,
    setReload,
    setInitializing,
    setUser,
    setBracelet,
    setUserAuth,
    setBabyId,
    setBraceletIds,
    setIsSignUp,
  };
  if (initializing) {
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
