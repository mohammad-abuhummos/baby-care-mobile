import React from 'react';
import {Text, View} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {VitalSignsCard, BabyInfoCard} from '../components/VitalSignsCard';
import database from '@react-native-firebase/database';
import {UserContext} from '../App';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import Card from '../components/Card';
export default function Home() {
  const {babyId, user, setBabyId, setBracelet, bracelet} = React.useContext(
    UserContext,
  );
  const [invoked, setInvoked] = React.useState(null);
  const [isBracelet, setIsBracelet] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [babyImage, setBabyImage] = React.useState(null);
  const [currnetSign, setCurrnetSign] = React.useState(0);
  const [currnetBaby, setCurrnetBaby] = React.useState();
  const [DialogVal, setDialogVal] = React.useState({visible: false});
  const getBabyImage = async () => {
    try {
      const url = await storage()
        .ref(`users/${user.uid}/baby/${babyId}`)
        .getDownloadURL();
      setBabyImage(url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getBabyInfo = () => {
    const onValueChange = database()
      .ref(`users/${user.uid}/baby/${babyId}/babyInfo`)
      .on('value', (snapshot) => {
        setCurrnetBaby(snapshot.val());
      });
    return () =>
      database()
        .ref(`users/${user.uid}/baby/${babyId}/babyInfo`)
        .off('value', onValueChange);
  };

  const getBraceletId = () => {
    const onValueChange = database()
      .ref(`users/${user.uid}/bracletId/`)
      .on('value', (snapshot) => {
        setBracelet(snapshot.val());
        setIsBracelet(true);
        console.log('setBracelet', snapshot.val());
      });
    return () =>
      database().ref(`users/${user.uid}/bracletId`).off('value', onValueChange);
  };
  const getBabyId = () => {
    const onValueChange = database()
      .ref(`${bracelet}/babyId`)
      .on('value', (snapshot) => {
        setBabyId(snapshot.val());
        setInvoked(true);
        console.log('getBabyId', snapshot.val());
      });

    return () =>
      database().ref(`users/${user.uid}`).off('value', onValueChange);
  };
  React.useEffect(() => {
    getBraceletId();
  }, []);
  React.useEffect(() => {
    console.log('braceletbracelet', !!bracelet);
    if (!!bracelet) {
      getBabyId();
    }
  }, [isBracelet]);

  React.useEffect(() => {
    getBabyImage();
    getBabyInfo();
  }, [invoked]);

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`users/${user.uid}/baby/${babyId}/Data`)
      .on('value', (snapshot) => {
        setCurrnetSign(snapshot.val());
      });
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, [invoked]);

  React.useEffect(() => {
    if (!!user) {
      if (!!currnetSign && !!currnetSign.bpm === 0) {
        setDialogVal({visible: true});
      } else {
        setDialogVal({visible: false});
      }
    }
  }, [currnetSign]);
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}>
        <View style={{paddingTop: 30, width: '100%'}}>
          <BabyInfoCard
            name={!!currnetBaby && currnetBaby.name}
            img={!!babyImage && {uri: babyImage}}
            color="#fff"
            status={true}
          />
          {/* {!!currnetBaby ? (
            <BabyInfoCard
              name={!!currnetBaby && currnetBaby.name}
              img={!!babyImage && {uri: babyImage}}
              color="#fff"
              status={true}
            />
          ) : (
            <Card>
              <View style={{flexDirection: 'row', width: '100%', height: 90}}>
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
          )} */}
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
              <Text style={{fontWeight: 'bold'}}>
                Please check baby beraclet
              </Text>
            </View>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}
