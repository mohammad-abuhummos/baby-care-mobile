import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BabyProfile from '../screens/BabyProfile';
import EditBabyinfo from '../screens/EditBabyinfo';

const Baby = createStackNavigator();

export default function BabyStack() {
  return (
    <>
      <Baby.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Baby.Screen
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
        <Baby.Screen
          name="EditBabyinfo"
          options={{
            title: 'EditBabyinfo',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={EditBabyinfo}
        />
      </Baby.Navigator>
    </>
  );
}
