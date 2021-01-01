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
import {UserContext} from '../App';
import database from '@react-native-firebase/database';
import LabelAndText from '../components/LabelAndText';
import LoadingIndicator from '../components/LoadingIndicator';
export default function BabyProfile({navigation}) {
  const {user} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const currentDate = () => {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  };
  const [currntBaby, setCurrntBaby] = React.useState();
  const [gender, setGender] = React.useState('Female');
  const data = [
    {
      label: 'Female',
    },
    {
      label: 'Male',
    },
  ];
  const CalculateAge = (birthday) => {
    if (!!birthday) {
      const today = currentDate().split('-');
      const date = birthday.split('-');
      return today[0] - date[0];
    }
  };

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user._user.uid}/baby/babyInfo`)
      .on('value', (snapshot) => {
        setCurrntBaby(snapshot.val());
        setLoading(false)
      });
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, [currntBaby]);
  const pickImage = () => {};
  if (!!loading) {
    return <LoadingIndicator />
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.InnerContainer}>
          <View>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={require('../assets/add-image-icon.png')}
                style={{
                  width: 180,
                  height: 180,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText label="Name" text={!!currntBaby && currntBaby.name} />
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText
              label="Age"
              text={CalculateAge(!!currntBaby && currntBaby.date)}
            />
          </View>
          <View style={{paddingTop: 30}}>
            <LabelAndText label="Gender" text={!!currntBaby && currntBaby.gender} />
          </View>
  
          <View style={{paddingTop: 50,paddingHorizontal:50}}>
            <Button title="Edit" onPress={() => navigation.navigate('EditBabyinfo')} />
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
