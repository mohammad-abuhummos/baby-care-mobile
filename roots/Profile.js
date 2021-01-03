

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EditUserProfile from '../screens/EditUserProfile';
import UserProfile from '../screens/UserProfile';

const profile = createStackNavigator();

export default function ProfileStack() {
  return (
    <>
      <profile.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <profile.Screen
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
        <profile.Screen
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
      </profile.Navigator>
    </>
  );
}