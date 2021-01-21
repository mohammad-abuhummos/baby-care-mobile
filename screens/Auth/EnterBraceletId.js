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
export default function EnterBraceletId({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const {setBracelet} = React.useContext(UserContext);
  const [BarcletId, setBarcletId] = React.useState();
  const bracletValidation = () => {
    setLoading(true);
    database()
      .ref('bracelets')
      .once('value')
      .then((snapshot) => {
        var Barclet = snapshot.child(`${BarcletId}`).exists();
        if (Barclet) {
          setBracelet(BarcletId);
          setLoading(false);
          navigation.navigate('SignUp');
        } else {
          displayError('Invalid Information', 'Invalid Barclet Id');
          setLoading(false);
        }
      })
      .catch((e) => console.log(e));
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
                label="Barclet id"
                onChangeText={(text) => setBarcletId(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button title="Next" onPress={() => bracletValidation()} />
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
