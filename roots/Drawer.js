import React from 'react';
import {View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import Statistics from '../screens/Statistics';
import ProfileStack from '../roots/Profile';
import {UserContext} from '../App';
import auth from '@react-native-firebase/auth';
import BabyStack from './Baby';
import BabyAccounts from '../screens/BabyAccounts';
import BabyAccountsStack from './BabyAccounts';
const Drawer = createDrawerNavigator();

BabyAccountsStack

export default function AppDrawer() {
  const {setInitializing, setUser,setUserAuth} = React.useContext(UserContext);
  const signOut = () => {
    setInitializing(true);
    auth()
      .signOut()
      .then(() => {setUser(null)
        setUserAuth(false);
      });
  };
  function CustomDrawerContentComponent(props) {
    return (
      <View style={{paddingVertical: 60}}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{fontWeight: 'bold', color: '#fff', fontSize: 17}}
          label="Sign Out"
          onPress={() => signOut()}
        />
      </View>
    );
  }

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: true}}
      drawerContentOptions={{
        activeBackgroundColor: '#fff',
        activeTintColor: '#EE979F',
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 17,
        },
        inactiveTintColor: '#fff',
      }}
      labelStyle={{fontWeight: 'bold', color: '#fff'}}
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
        name="Statistics"
        options={{
          title: 'Statistics',
          headerStyle: {
            backgroundColor: '#EE979F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={Statistics}
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
        component={ProfileStack}
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
        component={BabyStack}
      />
      <Drawer.Screen
        name="BabyAccountsStack"
        options={{
          title: 'Baby Accounts',
          headerStyle: {
            backgroundColor: '#EE979F',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={BabyAccountsStack}
      />
    </Drawer.Navigator>
  );
}
