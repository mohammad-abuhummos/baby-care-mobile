import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserSignUp from '../../models/UserSignUp';
import {displayError} from '../../models/helpers';
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function SignUpScreen({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const input = {
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
  };
  const SignOutUser = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  const validate = (email, password, passwordConfirmation) => {
    setLoading(true);
    let sign_up_info = new UserSignUp(email, password, passwordConfirmation);
    if (sign_up_info.isValid()) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          navigation.navigate('CompleteSignUp');
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          setLoading(false);
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('that email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('that email address is invalid!');
          }
          console.log(error);
        });
    } else {
      setLoading(false);
      console.log(sign_up_info.errors());
      displayError('Invalid Information', sign_up_info.errors().join(', '));
    }
  };
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{position: 'absolute', top: 30, left: 20}}>
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
          <View style={{paddingTop: 20, alignItems: 'center'}}>
            <Text style={styles.HedaerPink}>Sign Up</Text>
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
                label="Email"
                disableFullscreenUI={true}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                label="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                label="Retype password"
                onChangeText={(text) => setPasswordConfirmation(text)}
                secureTextEntry={true}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Next"
                onPress={() => validate(email, password, passwordConfirmation)}
              />
            </View>
            <View style={{paddingTop: 30}}>
               <Button title="sign out" onPress={() => SignOutUser()} />
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
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
