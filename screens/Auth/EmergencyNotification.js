import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import UserSignIn from '../../models/UserSignIn';
import {displayError} from '../../models/helpers';
import LoadingIndicator from '../../components/LoadingIndicator';
import {UserContext} from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
export default function EmergencyNotification({navigation}) {
  const [notificationToken, setNotificationToken] = React.useState();
  const [babyId, setBabyId] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const getfmctoken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setNotificationToken(fcmToken);
    console.log('fcmToken from emrgency---------', fcmToken);
  };
  React.useEffect(() => {
    getfmctoken();
  }, []);
  const addRefBaby = () => {
    database()
      .ref('babys')
      .once('value')
      .then((snapshot) => {
        var Baby = snapshot.child(`${babyId}`).exists();
        if (Baby) {
          const newReference = database().ref(`babys/${babyId}/users/`).push();
          newReference
            .set({notificationToken: `${notificationToken}`})
            .then(() => {
              displayError(
                'Invalid Information',
                'Your emergency baby notifications have been added successfully',
              );
            });
        } else {
          displayError('Invalid Information', 'Invalid Baby id');
        }
      });
  };
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/Barcletid.png')}
              style={{
                width: 100,
                height: 70,
                resizeMode: 'center',
                marginBottom: -10,
              }}
            />
            <Image
              source={require('../../assets/header.png')}
              style={{
                width: Dimensions.get('window').width,
                resizeMode: 'contain',
                // aspectRatio: 1 / 2,
              }}
            />
          </View>
          <View style={styles.InnerContainer}>
            <View style={{paddingTop: 10}}>
              <Image
                source={require('../../assets/logo.png')}
                style={{
                  width: 180,
                  height: 180,
                  resizeMode: 'center',
                  aspectRatio: 1 / 2,
                }}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                label="Baby Id"
                onChangeText={(text) => setBabyId(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Next"
                onPress={() => {
                  addRefBaby();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
  HedaerPink: {
    color: '#EE979F',
    fontSize: 36,
    fontWeight: 'normal',
    padding: 10,
    fontFamily: 'Pacificos',
  },
  InnerContainer: {
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
