import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import {UserContext} from '../../context/AppContext';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import LoadingIndicator from '../../components/LoadingIndicator';
import { makeid } from '../../utils/string';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateBabyAccount({navigation}) {
  const {
    user,
    setUserAuth,
    bracelet,
    setBabyId,
    setIsSignUp,
    babyId,
  } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [image, setImage] = React.useState(null); 
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('2016-05-15');
  const [gender, setGender] = React.useState('Female');
  const [imageUrl, setImageUrl] = React.useState(null);
  const [id, gitId] = React.useState(true);
  const [notificationToken, setNotificationToken] = React.useState();
  const getfmctoken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    setNotificationToken(fcmToken);
    console.log('fcmToken from emrgency---------', fcmToken);
  };
  React.useEffect(() => {
    getfmctoken();
  }, []);
  React.useEffect(() => {
    if (!!id) {
      setBabyId(makeid(12));
      gitId(false)
    }
  }, []);
  
  React.useEffect(() => {
    if (!!imageUrl) {
      updateImge();
    }
  }, [imageUrl]);
  const getBabyImage = async () => {
    try {
      const url = await storage().ref(`/babys/${babyId}/`).getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      setLoading(false);
    }
  };
  const updateImge = () => {
    const babyInfo = {
      name: name,
      date: date,
      gender: gender,
      img: imageUrl,
      id:babyId,
    };
    database()
      .ref(`/babys/${babyId}/`)
      .update({babyInfo})
      .then(() => {
        setLoading(false);
        setIsSignUp(true);
        setUserAuth(true);
      });
  };

  const currentDate = () => {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  };
  const handleInfo = () => {

    setLoading(true);

    const babyInfo = {
      name: name,
      date: date,
      gender: gender,
      id:babyId,
    };
    database()
      .ref(`/babys/${babyId}`)
      .set({babyInfo})
      .then(() => {
        addRefBaby();
        updateUserIdBaby();
        addNotificationToken()
        Updatebarclet();
        uploadImage(image);
      });
  };

  const addRefBaby = () => {
    const newReference = database().ref(`/users/${user.uid}/baby/`).push();
    newReference.set({id: `${babyId}`}).then(() => {});
  };
  const addNotificationToken = () => {
    database()
    .ref(`babys/${babyId}/users/${user.uid}/`)
    .set({notificationToken: notificationToken});
  };
  const updateUserIdBaby = () => {
    database()
      .ref(`/users/${user.uid}/currentbaby`)
      .set({currentbaby: `${babyId}`})
      .then(() => {});
  };

  const Updatebarclet = () => {
    database()
      .ref(`${bracelet}`)
      .update({
        babyId: `${babyId}`,
        userId: `${user.uid}`,
      })
      .then(() => {});
  };
  const data = [
    {
      label: 'Female',
    },
    {
      label: 'Male',
    },
  ];

  const pickImage = async () => {
    try {
      await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      }).then((image) => {
        console.log('image =>', image);
        let {path} = image;
        setImage(path);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const uploadImage = async (uri) => {
    const fileKey = `/babys/${babyId}/`;
    const uploadUri = uri;
    setUploading(true);
    setLoading(true);
    const task = storage().ref(fileKey).putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    setLoading(true);
    getBabyImage();
  };
  if (!!loading) {
    return <LoadingIndicator />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{position: 'absolute', top: 10, left: 20}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/back-icon.png')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/CreateBaby.png')}
            style={{
              width: 200,
              height: 70,
              resizeMode: 'center',
              marginBottom: -10,
            }}
          />
          <Image
            source={require('../../assets/header.png')}
            style={{
              width: Dimensions.get('window').width,
              resizeMode: 'contain',
              // aspectRatio: 1 / 2,
            }}
          />
        </View>
        <View style={styles.InnerContainer}>
          <View style={{paddingTop: 10}}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  !!image
                    ? {uri: image}
                    : require('../../assets/add-image-icon.png')
                }
                style={
                  !!image
                    ? {
                        width: 180,
                        height: 180,
                        borderRadius: 100,
                        resizeMode: 'center',
                      }
                    : {
                        width: 180,
                        height: 180,
                      }
                }
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop: 30}}>
            <AppInput
              label="Name"
              autoCapitalize="words"
              onChangeText={(text) => setName(text)}
            />
          </View>
          <View style={{paddingTop: 30, width: '100%', flexDirection: 'row'}}>
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#7F8083',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                Date of Birth
              </Text>
            </View>
            <View
              style={{
                flex: 8.5,
                justifyContent: 'center',
                shadowOpacity: 1,
                shadowRadius: 3,
                shadowOffset: {
                  height: 0,
                  width: 0,
                },
                elevation: 10,
              }}>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 5.46,
                  elevation: 9,
                }}>
                <DatePicker
                  style={{width: '100%'}}
                  date={date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2016-05-01"
                  maxDate={currentDate()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  showIcon={false}
                  customStyles={{
                    dateInput: {
                      width: '100%',
                      height: 40,
                      borderColor: '#EC4468',
                      borderWidth: 1,
                      padding: 5,
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {
                    setDate(date);
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{paddingTop: 10, width: '100%', flexDirection: 'row'}}>
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#7F8083',
                  alignSelf: 'flex-start',
                  textAlign: 'center',
                  paddingTop: 10,
                }}>
                Gender
              </Text>
            </View>
            <View
              style={{
                flex: 8,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
              }}>
              <RadioButtonRN
                data={data}
                initial={1}
                boxStyle={{height: 10, borderRadius: 0}}
                circleSize={10}
                activeColor="#EE979F"
                selectedBtn={(e) => setGender(e.label)}
              />
            </View>
          </View>
          <View style={{paddingTop: 30}}>
            <Button title="Finsh" onPress={() => handleInfo()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
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
  },
});
