import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Accounts from '../screens/BabyAccounts';
import EditBabyinfo from '../screens/EditBabyinfo';
import AddBaby from '../screens/AddBaby';
import BabyProfile from '../screens/BabyProfile';
const BabyAccounts = createStackNavigator();
const AddBabyAccounts = createStackNavigator();


 function BabynavAccountsStack() {
  return (
    <>
      <AddBabyAccounts.Navigator
        screenOptions={{
          headerShown: false,
        }}>
    
        <AddBabyAccounts.Screen
          name="AddBaby"
          options={{
            title: 'Add Baby',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={AddBaby}
        />
      </AddBabyAccounts.Navigator>
    </>
  );
}
export default function BabyAccountsStack() {
  return (
    <>
      <BabyAccounts.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <BabyAccounts.Screen
          name="Accounts"
          options={{
            title: 'Accounts',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={Accounts}
        />
        <BabyAccounts.Screen
          name="AddBaby"
          options={{
            title: 'Add Baby',
            headerStyle: {
              backgroundColor: '#EE979F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          component={BabynavAccountsStack}
        />
        <BabyAccounts.Screen
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
        <BabyAccounts.Screen
          name="EditBabyinfo"
          options={{
            title: 'Edit Baby',
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
      </BabyAccounts.Navigator>
    </>
  );
}
