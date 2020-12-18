import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import UserSignIn from '../../models/UserSignIn';
import {displayError} from '../../models/helpers';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function SignInScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const input = {
    email: Email,
    password: Password,
  };
  const validate = (email, password) => {
    setLoading(true);
    let sign_in_info = new UserSignIn(email, password);
    if (sign_in_info.isValid()) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          navigation.navigate('Home');
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === 'auth/invalid-email') {
            Alert.alert('that email address is invalid!');
          }
          console.log(error);
        });
    } else {
      setLoading(false);
      console.log(sign_in_info.errors());
      displayError('Invalid Information', sign_in_info.errors().join(', '));
    }
  };
  if (loading) {
    return <LoadingIndicator />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{
              borderBottomColor: '#EE979F',
              borderLeftColor: '#EE979F',
              borderRightColor: '#EE979F',
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderLeftWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 10,
            }}>
            <Text style={styles.HedaerPink}>Sign In</Text>
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
              <AppInput label="Email" onChangeText={(text) => setEmail(text)} />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                label="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Sign in"
                onPress={() => validate(Email, Password)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Sign up"
                onPress={() => navigation.navigate('SignUp')}
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
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  HedaerPink: {
    color: '#EE979F',
    fontSize: 36,
    fontWeight: 'normal',
    padding: 10,
  },
  InnerContainer: {
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
