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
import Button from '../components/Button';
import { UserContext } from '../context/AppContext';
import database from '@react-native-firebase/database';
import LabelAndText from '../components/LabelAndText';
import LoadingIndicator from '../components/LoadingIndicator';
export default function UserProfile({navigation}) {
  const {user} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [userProfile, setuserProfile] = React.useState();
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`users/${user.uid}/info`)
      .on('value', (snapshot) => {
        setuserProfile(snapshot.val());
        setLoading(false);
      });
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, []);
  if (!!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.InnerContainer}>
          <View>
            <View style={{paddingTop: 10}}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: 180,
                  height: 180,
                  resizeMode: 'center',
                  aspectRatio: 1 / 1,
                }}
              />
            </View>
          </View>
          <View style={{paddingTop: 10}}>
            <LabelAndText
              label="First Name"
              text={!!userProfile && userProfile.firstname}
            />
          </View>
          <View style={{paddingTop: 10}}>
            <LabelAndText
              label="laste Name"
              text={!!userProfile && userProfile.lastname}
            />
          </View>
          <View style={{paddingTop: 10}}>
            <LabelAndText
              label="Phone Number"
              text={!!userProfile && userProfile.phone}
            />
          </View>
          <View style={{paddingTop: 10}}>
            <LabelAndText
              label="Email"
              text={!!userProfile && userProfile.email}
            />
          </View>

          <View style={{paddingTop: 50, paddingHorizontal: 50}}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditUserProfile')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: '100%',
  },
});
