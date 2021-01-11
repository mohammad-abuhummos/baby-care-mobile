import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Accounts from '../screens/BabyAccounts';
import EditBabyinfo from '../screens/EditBabyinfo';
import AddBaby from '../screens/AddBaby';

const BabyAccounts = createStackNavigator();


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
          component={AddBaby}
        />
      </BabyAccounts.Navigator>
    </>
  );
}
