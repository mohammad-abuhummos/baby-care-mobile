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
import {UserContext} from '../context/AppContext';
import database from '@react-native-firebase/database';
import LabelAndText from '../components/LabelAndText';
import LoadingIndicator from '../components/LoadingIndicator';
import Clipboard from '@react-native-community/clipboard';

export default function BabyProfile({route, navigation}) {
  const {bracelet, user, setReload, setInitializing} = React.useContext(
    UserContext,
  );
  const [loading, setLoading] = React.useState(true);
  const [copiedText, setCopiedText] = React.useState('');

  const copyToClipboard = () => {
    Clipboard.setString(parms.item.id);
  };
  const currentDate = () => {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  };

  const parms = route.params;

  const Updatebarclet = async () => {
    try {
      await database()
        .ref(`${bracelet}`)
        .update({babyId: `${parms.item.id}`, userId: `${user.uid}`})
        .then(() => {
          // navigation.navigate('Home');
          setInitializing(true);
          setReload(true);
        });
    } catch (error) {}
  };

  const CalculateAge = (birthday) => {
    if (!!birthday) {
      const today = currentDate().split('-');
      const date = birthday.split('-');
      return today[0] - date[0];
    }
  };

  React.useEffect(() => {
    if (!!parms) setLoading(false);
  }, [parms]);
  if (!!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.InnerContainer}>
          <View>
            <TouchableOpacity>
              <Image
                source={
                  !!parms.item.img
                    ? {uri: parms.item.img}
                    : require('../assets/profile-icon.png')
                }
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText label="Name" text={parms.item.name} />
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText
              label="Age"
              text={`${CalculateAge(parms.item.date)} year`}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText label="Gender" text={parms.item.gender} />
          </View>

          <View
            style={{
              paddingTop: 50,
              paddingHorizontal: 10,
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
            }}>
            <View style={{width: 140}}>
              <Button title="Select Baby" onPress={() => Updatebarclet()} />
            </View>
            <View style={{width: 140}}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate('EditBabyinfo', parms)}
              />
            </View>
          </View>
          <View style={{width: 140, paddingTop: 15}}>
            <Button title="Copy baby Id" onPress={copyToClipboard} />
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
