import React from 'react';
import {Text, View} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import {VitalSignsCard, BabyInfoCard} from '../components/VitalSignsCard';

export default function Placeholder() {
  const [currnet, setCurrnet] = React.useState(0);
  console.log(currnet);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <BabyInfoCard color="#fff" />
      <VitalSignsCard
        symbols={'c'}
        name="Oxygen level"
        from={10}
        to={20}
        currnet={currnet}
        color="#fff"
      />
      <View style={{paddingVertical: 10, paddingTop: 20}}>
        <Button title="currnet+5" onPress={() => setCurrnet(currnet + 5)} />
      </View>
      <View style={{paddingVertical: 10}}>
        <Button title="currnet-5" onPress={() => setCurrnet(currnet - 5)} />
      </View>
    </View>
  );
}
