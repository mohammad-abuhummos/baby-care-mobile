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
import database from '@react-native-firebase/database';
export default function EnterBabyid({navigation}) {
  const {user, setUserAuth, setBabyId, setIsSignUp, babyId} = React.useContext(
    UserContext,
  );
  const [loading, setLoading] = React.useState(false);
  const addRefBaby = () => {
    database()
      .ref('babys')
      .once('value')
      .then((snapshot) => {
        var Baby = snapshot.child(`${babyId}`).exists();
        if (Baby) {
          const newReference = database()
            .ref(`/users/${user.uid}/baby/`)
            .push();
          newReference.set({id: `${babyId}`}).then(() => {
            setIsSignUp(true);
            setUserAuth(true);
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
