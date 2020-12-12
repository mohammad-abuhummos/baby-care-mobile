import React from 'react';
import {Text, View} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import {VitalSignsCard, BabyInfoCard} from '../components/VitalSignsCard';
import database from '@react-native-firebase/database';

export default function Placeholder() {
  const [currnet, setCurrnet] = React.useState(0);
  React.useEffect(() => {
    console.log('hi');
    const onValueChange = database()
      .ref(`/Dato`)
      .on('value', (snapshot) => {
        console.log('User data: ', snapshot.val());
        setCurrnet(snapshot.val());
      });

    // Stop listening for updates when no longer required
    return () => database().ref(`/Dato`).off('value', onValueChange);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {/* <BabyInfoCard color="#fff" /> */}
      <View >
        <VitalSignsCard
          samllSymbols={'bpm'}
          name="Heart rate"
          from={60}
          to={120}
          currnet={Math.ceil(currnet.Ritmo_cardiaco)}
          color="#fff"
        />
      </View>
      <View style={{paddingTop:10}}>
        <VitalSignsCard
          symbols={'%'}
          name="Oxygen level"
          from={50}
          to={120}
          currnet={Math.ceil(currnet.SpO2)}
          color="#fff"
        />
      </View>
      {/* <Text>hello</Text>
      <View style={{paddingVertical: 10, paddingTop: 20}}>
        <Button title="currnet+5" onPress={() => setCurrnet(currnet + 5)} />
      </View>
      <View style={{paddingVertical: 10}}>
        <Button title="currnet-5" onPress={() => setCurrnet(currnet - 5)} />
      </View> */}
    </View>
  );
}
