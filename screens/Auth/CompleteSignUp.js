import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';

export default function CompleteSignUpScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [retypePassword, setRetypePassword] = React.useState('');
  const input = {
    email: email,
    password: password,
    retypePassword: retypePassword,
  };
  const validate = (email, password) => {
    let user_account = new UserAccount(
      email,
      password,
      retypePassword,
    );
    if (sign_in_info.isValid()) {
      Alert.alert('valde');
    } else {
      console.log(sign_in_info.errors());
      displayError('Invalid Information', sign_in_info.errors().join(', '));
    }
  };

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
      <View style={{paddingTop: 20,alignItems:"center"}}>
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
          <AppInput
            label="Retype password"
            onChangeText={(text) => setRetypePassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingTop: 30}}>
          <Button title="Finsh" />
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