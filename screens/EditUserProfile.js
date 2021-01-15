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
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import LoadingIndicator from '../components/LoadingIndicator';
import { UserContext } from '../context/AppContext';
import database, {firebase} from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
export default function EditUserProfile({navigation}) {
  const {user} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user._user.uid}/info`)
      .on('value', (snapshot) => {
        const info = snapshot.val();
        setFirstName(info.Firstname);
        setLastName(info.Lastname);
        setPhone(info.Phone);
      });
    setLoading(false);
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, []);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const handleInfo = async () => {
    setLoading(true);
    let id = `/users/${user.uid}/info`;
    const UserFirebase = id.toString();
    let task = await firebase
      .database()
      .ref(UserFirebase)
      .update({
        firstname: firstName,
        lastname: lastName,
        phone: phone,
        email: user.email,
      })
      .then(() => {
        setLoading(false);
        navigation.goBack();
      });
    try {

      task;
    
    } catch (err) {
      console.log(err);
    }
  };

  if (!!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.InnerContainer}>
            <View style={{paddingTop: 10}}>
              <TouchableOpacity>
                <Image
                  source={require('../assets/logo.png')}
                  style={{
                    width: 180,
                    height: 180,
                    resizeMode: 'center',
                    aspectRatio: 1 / 1,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                value={firstName}
                placeholder="First Name"
                label="First Name"
                autoCapitalize="words"
                onChangeText={(text) => setFirstName(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                value={lastName}
                placeholder="Last Name"
                label="Last Name"
                autoCapitalize="words"
                onChangeText={(text) => setLastName(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                placeholder="Phone"
                value={phone}
                label="Phone"
                autoCapitalize="words"
                onChangeText={(text) => setPhone(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button title="Finsh" onPress={() => handleInfo()} />
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
    fontFamily: 'Pacifico',
    fontSize: 36,
    fontWeight: 'normal',
    padding: 10,
  },
  InnerContainer: {
    flex: 1,
    minHeight: windowHeight - 118,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
