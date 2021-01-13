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
// import WelcomeScreen from './screens/WelcomeScreen';
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
import messaging from '@react-native-firebase/messaging';
firebase;
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [userAuth, setUserAuth] = useState(null);
  const [babyId, setBabyId] = useState(null);
  const [bracelet, setBracelet] = useState(null);
  const [braceletIds, setBraceletIds] = useState(null);
  const [reload, setReload] = useState(null);
  const [isSignUp, setIsSignUp] = useState(true);

  function onAuthStateChanged(user) {
    setUser(user);
    if (!!user) {
      setUserAuth(true);
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    if (!!isSignUp) {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }
  }, [userAuth]);
  useEffect(() => {
    setInitializing(false);
    setReload(false);
  }, [reload]);

  // const RE = async() =>{
  //   try {
  //   const reg =  await  messaging()
  //     .registerDeviceForRemoteMessages()
  //     .then(rsss => {
  //       console.log("registerDeviceForRemoteMessagesResss------",ress);
  //     });
  //     console.log("registerDeviceForRemoteMessagesResss------",reg);
  //   } catch (error) {

  //   }
  // }

  //   const hi= async () =>{
  //     try {
  //     const defaultAppMessaging = firebase.messaging();
  //     const notTok = await messaging().isDeviceRegisteredForRemoteMessages();
  //     console.log("defaultAppMessaging",notTok)
  //   } catch (error) {
  //     console.log("e---",error)
  //   }
  // }
  // hi()

  useEffect(() => {
    this.checkPermission();
    this.messageListener();
  }, []);
  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.showAlert('Your Firebase Token is:', fcmToken);
    } else {
      this.showAlert('Failed', 'No token received');
    }
  };
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  };
  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };
  messageListener = async () => {
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  };
  showAlert = (title, message) => {
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
