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
import {UserContext} from '../App';
import storage from '@react-native-firebase/storage';
import Card from '../components/Card';
export default function BabyAccounts({navigation}) {
  const {babyId, user} = React.useContext(UserContext);
  const [babyImage, setBabyImage] = React.useState(null);
  const [Baby, setBaby] = React.useState([]);
  console.log(babyImage);
  const getBabyImage = async () => {
    try {
      const url = await storage()
        .ref(`users/${user.uid}/baby/${babyId}`)
        .getDownloadURL();
      setBabyImage(url);
    } catch (error) {}
  };
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`users/${user.uid}/baby/`)
      .on('value', (snapshot) => {
        setBaby(snapshot.val());
        console.log(snapshot.val());
      });

    return () =>
      database().ref(`users/${user.uid}`).off('value', onValueChange);
  }, []);
  React.useEffect(() => {
    getBabyImage();
  }, []);
  React.useEffect(() => {}, []);

  const RenderBaby = (babys) => {
    return Object.keys(babys).map((key) => {
      console.log(key, babys[key].babyInfo);
      let info = babys[key].babyInfo;
      return (
        <View style={{paddingTop: 30, width: '100%'}}>
          <BabyInfoCard
            name={info.name}
            img={!!babyImage && {uri: babyImage}}
            color="#fff"
          />
        </View>
      );
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding:20,
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
