import React from 'react';
import {Text, View} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {VitalSignsCard, BabyInfoCard} from '../components/VitalSignsCard';
import database from '@react-native-firebase/database';
import {UserContext} from '../App';
import {Image} from 'react-native';
export default function Home() {
  const {authContext,user} = React.useContext(UserContext);
  const [currnetSign, setCurrnetSign] = React.useState(0);
  const [currnetBaby, setCurrnetBaby] = React.useState();
  const [DialogVal, setDialogVal] = React.useState({visible: false});

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/Data`)
      .on('value', (snapshot) => {
        setCurrnetSign(snapshot.val());
      });

    return () => database().ref(`/Data`).off('value', onValueChange);
  }, []);
  React.useEffect(() => {
    const onValueChange = database()
      .ref(`users/${authContext}/baby/babyInfo`)
      .on('value', (snapshot) => {
        setCurrnetBaby(snapshot.val());
      });

    return () =>
      database().ref(`users/${authContext}/baby/babyInfo`).off('value', onValueChange);
  }, []);
  React.useEffect(() => {
    if (!!user) {      
      if ((!!currnetSign && currnetSign.bpm === 0) || currnetSign.SpO2 === 0) {
        setDialogVal({visible: true});
      } else {
        setDialogVal({visible: false});
      }
    }
  }, [currnetSign]);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <View style={{paddingTop: 30, width: '100%'}}>
        <BabyInfoCard name={!!currnetBaby && currnetBaby.name} color="#fff" />
      </View>
      <View style={{paddingTop: 15, width: '100%'}}>
        <VitalSignsCard
          samllSymbols={'bpm'}
          name="Heart rate"
          from={60}
          to={120}
          currnet={!!currnetSign ? Math.ceil(currnetSign.bpm) : 0}
          color="#fff"
        />
      </View>
      <View style={{paddingTop: 15, width: '100%'}}>
        <VitalSignsCard
          symbols={'%'}
          name="Oxygen level"
          from={50}
          to={120}
          currnet={!!currnetSign ? Math.ceil(currnetSign.SpO2) : 0}
          color="#fff"
        />
      </View>
      <View style={{paddingTop: 15, width: '100%'}}>
        <VitalSignsCard
          symbols={'C'}
          name="Temp"
          from={50}
          to={120}
          currnet={!!currnetSign ? Math.ceil(currnetSign.temp) : 0}
          color="#fff"
        />
      </View>
      <Dialog
        visible={DialogVal.visible}
        onTouchOutside={() => {
          setDialogVal(false);
        }}>
        <DialogContent>
          <View
            style={{
              paddingHorizontal: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/bracelet-icon.png')}
              style={{
                aspectRatio: 1 / 2,
                resizeMode: 'contain',
                width: 200,
                height: 200,
              }}
            />
            <Text style={{fontWeight: 'bold'}}>Please check baby beraclet</Text>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
}
