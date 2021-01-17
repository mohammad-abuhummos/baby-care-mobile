import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import { UserContext } from '../../context/AppContext';
import CompleteSignUp from '../../models/CompleteSignUp';
import {displayError} from '../../models/helpers';
import LoadingIndicator from '../../components/LoadingIndicator';
import database from '@react-native-firebase/database';
export default function CompleteSignUpScreen({navigation}) {
  const {user,bracelet} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');  
  const handleInfo = (firstname, lastname, phone) => {
    let User_info = new CompleteSignUp(firstname, lastname, phone);
    if (User_info.isValid()) {
      const info = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: user.email,
      };
      database()
        .ref(`/users/${user.uid}`)
        .set({bracletId:bracelet,info})
        .then(() => navigation.navigate('CreateBabyAccount'));
    } else {
      setLoading(false);
      console.log(User_info.errors());
      displayError('Invalid Information', User_info.errors().join(', '));
    }
  };
  if (!!loading) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{position: 'absolute', top: 10, left: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/back-icon.png')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/Signup.png')}
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
              label="First name"
              autoCapitalize="words"
              onChangeText={(text) => setFirstname(text)}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <AppInput
              label="Last name"
              autoCapitalize="words"
              onChangeText={(text) => setLastname(text)}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <AppInput
              label="Phone number"
              keyboardType="phone-pad"
              onChangeText={(text) => setPhone(text)}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <Button
              title="Next"
              onPress={() => handleInfo(firstname, lastname, phone)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  HedaerPink: {
    color: '#EE979F',
    fontFamily: 'Pacifico',
    fontSize: 36,
    fontWeight: 'normal',
    padding: 10,
  },
  InnerContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
