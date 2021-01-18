import React from 'react';
import {
  StyleSheet,
  Text,
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
import auth from '@react-native-firebase/auth';
import LoadingIndicator from '../../components/LoadingIndicator';
import {UserContext} from '../../context/AppContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default function SignInScreen({navigation}) {
  const {setIsSignUp, setUserAuth} = React.useContext(UserContext);
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
          console.log('User account created & signed in!');
        })
        .catch((error) => {
          setLoading(false);
          displayError('Invalid Information', 'invalid email or password');
          console.log(error);
        });
    } else {
      setLoading(false);
      console.log(sign_in_info.errors());
      displayError('Invalid Information', sign_in_info.errors().join(', '));
    }
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
              source={require('../../assets/Signin.png')}
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
            <View style={{paddingTop: 5}}>
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
            <View style={{paddingTop: 20}}>
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
                onPress={() => {
                  setIsSignUp(false);
                  navigation.navigate('EnterBraceletId');
                }}
              />
            </View>
            <View style={{paddingTop: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setIsSignUp(false);
                  navigation.navigate('EnterBraceletIdByBabyid');
                }}>
                <Text style={{color: '#EE979F'}}>Already have baby account</Text>
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 15}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EmergencyNotification');
                }}>
                <Text style={{color: '#EE979F'}}>Emergency Notifications</Text>
              </TouchableOpacity>
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
