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
import {displayError, isValidEmail} from '../../models/helpers';
import LoadingIndicator from '../../components/LoadingIndicator';
import auth from '@react-native-firebase/auth';


export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const reset = async() => {
    if (!!isValidEmail(email)) {

        setLoading(true);
        try {
            await auth().sendPasswordResetEmail(email);
            setLoading(false);
            displayError("Success","Please Check Your Email");
        } catch (e) {
            setLoading(false);
            displayError("Faild", e.message);
        }
    }else{
        displayError("invalid information", "Invalid Email");
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
              source={require('../../assets/forgot-password.png')}
              style={{
                width: 200,
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
                label="Email"
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Reset"
                onPress={() => {
                    reset();
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
