import React from 'react';
import {Text, View} from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {VitalSignsCard, BabyInfoCard} from '../components/VitalSignsCard';
import database, {firebase} from '@react-native-firebase/database';
import {UserContext} from '../context/AppContext';
import storage from '@react-native-firebase/storage';
import {Image} from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [notificationToken, setNotificationToken] = React.useState();
  const [DialogVal, setDialogVal] = React.useState({visible: false});
  console.log('babyId', babyId);
  setTimeout(function () {
    setLoading(false);
  }, 3000);
  // // setTimeout(function(){ setLoading(false) }, );

  const getfmctoken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setNotificationToken(fcmToken);
  };
  const getBabyId = () => {
    const onValueChange = database()
      .ref(`${bracelet}/babyId`)
      .once('value', (snapshot) => {
        setBabyId(snapshot.val());
      })
      .then(() => {});
    return () =>
      database().ref(`${bracelet}/babyId`).off('value', onValueChange);
  };

  const getBabyInfo = () => {
    const onValueChange = database()
      .ref(`babys/${babyId}/babyInfo`)
      .once('value', (snapshot) => {
        setCurrnetBaby(snapshot.val());
      });
    return () =>
      database().ref(`babys/${babyId}/babyInfo`).off('value', onValueChange);
  };

  const getBraceletId = () => {
    const onValueChange = database()
      .ref(`users/${user.uid}/bracletId/`)
      .on('value', (snapshot) => {
        setBracelet(snapshot.val());
        setIsBracelet(true);
        // console.log('setBracelet', snapshot.val());
      });
    return () =>
      database().ref(`users/${user.uid}/bracletId`).off('value', onValueChange);
  };
  React.useEffect(() => {
    getBraceletId();
  }, []);
  React.useEffect(() => {
    getfmctoken();
    console.log(
      'notificationTokenHOme-------------------------',
      notificationToken,
    );
    database()
      .ref(`users/${user.uid}/notificationToken`)
      .set({notificationToken: notificationToken});
  }, [notificationToken]);
  React.useEffect(() => {
    // console.log('braceletbracelet', !!bracelet);
    if (!!bracelet) {
      getBabyId();
    }
  }, [isBracelet]);

  React.useEffect(() => {
    getBabyInfo();
    database()
      .ref(`babys/${babyId}/users/${user.uid}/`)
      .set({notificationToken: notificationToken});
  }, [babyId]);
  React.useEffect(() => {
    if (!!babyId) {
      // setLoading(false);
    }
  }, [babyId]);

  // getBabyInfo();
  React.useEffect(() => {
    if (!!babyId) {
      let babyref = `/babys/${babyId}/data`;
      const onValueChange = database()
        .ref(babyref)
        .on('value', (snapshot) => {
          setCurrnetSign(snapshot.val());
        });
      return () => database().ref(`/data`).off('value', onValueChange);
    }
  }, [babyId]);

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
          {!!currnetBaby ? (
            <BabyInfoCard
              name={!!currnetBaby && currnetBaby.name}
              img={
                !!currnetBaby.img
                  ? {uri: currnetBaby.img}
                  : require('../assets/profile-icon.png')
              }
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
                    Please Select Baby 
                  </Text>
                </View>
              </View>
            </Card>
          )}
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
            from={94}
            to={100}
            currnet={!!currnetSign ? Math.ceil(currnetSign.SpO2) : 0}
            color="#fff"
          />
        </View>
        <View style={{paddingTop: 15, width: '100%'}}>
          <VitalSignsCard
            symbols={'C'}
            name="Temp"
            from={36}
            to={37}
            currnet={!!currnetSign ? Math.ceil(currnetSign.tempc) : 0}
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
