import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BabyInfoCard} from '../components/VitalSignsCard';
import database from '@react-native-firebase/database';
import { UserContext } from '../context/AppContext';
import Card from '../components/Card';
export default function BabyAccounts({navigation}) {
  const {babyId, user} = React.useContext(UserContext);
  const [Baby, setBaby] = React.useState([]);
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`users/${user.uid}/baby/`)
      .on('value', (snapshot) => {
        setBaby(snapshot.val());
      });

    return () =>
      database().ref(`users/${user.uid}`).off('value', onValueChange);
  }, []);

  React.useEffect(() => {}, []);

  const RenderBaby = (babys) => {
    return Object.keys(babys).map((key) => {
      let id = key;
      let info = babys[key].babyInfo;
      let parms = {
        id: id,
        info: info,
      };
      return (
        <TouchableOpacity
          key={id}
          onPress={() => {
            navigation.navigate('BabyProfile', parms);
          }}>
          <View style={{paddingTop: 30, width: '100%'}}>
            <BabyInfoCard
              name={info.name}
              img={
                !!info.img
                  ? {uri: info.img}
                  : require('../assets/profile-icon.png')
              }
              color="#fff"
              status={babyId === id}
            />
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 20,
          }}>
          {RenderBaby(Baby)}
          <View style={{paddingTop: 30, width: '100%'}}>
            <TouchableOpacity onPress={() => navigation.navigate('AddBaby')}>
              <Card>
                <View style={styles.container}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#838487',
                      }}>
                      Add Baby Account
                    </Text>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 50,
                        color: '#838487',
                      }}>
                      +
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
  },
});
