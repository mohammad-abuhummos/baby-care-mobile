import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import LoadingIndicator from '../components/LoadingIndicator';
import { UserContext } from '../context/AppContext';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

export default function EditBabyinfo({route, navigation}) {
  const parms = route.params;
  // const [currntBaby, setCurrntBaby] = React.useState();
  const {user} = React.useContext(UserContext);
  const [image, setImage] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState(parms.info.name);
  const [date, setDate] = React.useState(parms.info.date);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [gender, setGender] = React.useState(parms.info.gender);
  const currentDate = () => {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  };

  // React.useEffect(() => {
  //   if (!!imageUrl) {
  //     updateImge();
  //   }
  // }, [imageUrl]);
  const getBabyImage = async () => {
    try {
      const url = await storage()
        .ref(`/users/${user._user.uid}/baby/${parms.id}/`)
        .getDownloadURL();
      setImageUrl(url);
      console.log('url-----', url);
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoading(false);
  }, []);
  const handleInfo = () => {
    setLoading(true);
    // setIsLoading(true);
    const babyInfo = {
      name: name,
      date: date,
      gender: gender,
      img: !!imageUrl ? imageUrl : parms.info.img,
    };
    database()
      .ref(`/users/${user._user.uid}/baby/${parms.id}/`)
      .update({babyInfo})
      .then(() => {
        setLoading(false);
        navigation.navigate('Accounts');
      });
  };
  const data = [
    {
      label: 'Female',
    },
    {
      label: 'Male',
    },
  ];

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log('image =>', image);
      let {path} = image;
      setImage(path);
      uploadImage(path);
    });
  };

  const uploadImage = async (uri) => {
    const fileKey = `/users/${user._user.uid}/baby/${parms.id}/`;
    const uploadUri = uri;
    setUploading(true);
    const task = storage().ref(fileKey).putFile(uploadUri);
    try {
      await task;
      console.log('uploading');
    } catch (e) {
      console.error(e);
    }
    getBabyImage();
  };

  if (!!loading || uploading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.InnerContainer}>
            <TouchableOpacity onPress={pickImage}>
              <View style={{paddingTop: 40}}>
                {!!parms.info.img && (
                  <View style={{position: 'absolute', top: 40, zIndex: 5}}>
                    <Image
                      source={require('../assets/add-image.png')}
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 100,
                      }}
                    />
                  </View>
                )}
                <Image
                  source={
                    !!parms.info.img
                      ? {uri: !!image ? image : parms.info.img}
                      : require('../assets/profile-icon.png')
                  }
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: 100,
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{paddingTop: 30}}>
              <AppInput
                placeholder={parms.info.name}
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
                    placeholder={parms.info.date}
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
                        alignItems: 'flex-start',
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
