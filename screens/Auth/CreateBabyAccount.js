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
import Button from '../../components/Button';
import AppInput from '../../components/AppInput';
import {UserContext} from '../../App';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
export default function CreateBabyAccount({navigation}) {
  const id = React.useContext(UserContext);
  console.log('authContext', id);
  const [loading, setLoading] = React.useState(false);
  const currentDate = () => {
    return new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  };
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('2016-05-15');
  const [gender, setGender] = React.useState('Female');
  const handleInfo = () => {
    const babyInfo = {
      name: name,
      date: date,
      Phone: gender,
    };
    database()
      .ref(`/users/${id}/baby`)
      .set({babyInfo})
      .then(() => console.log('Data set.'));
  };
  const data = [
    {
      label: 'Female',
    },
    {
      label: 'Male',
    },
  ];

  const pickImage = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{position: 'absolute', top: 30, left: 20}}>
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
        <View style={{paddingTop: 20, alignItems: 'center'}}>
          <Text style={styles.HedaerPink}>create baby account</Text>
        </View>
        <View style={styles.InnerContainer}>
          <View style={{paddingTop: 10}}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  !!image
                    ? {uri: image.uri}
                    : require('../../assets/add-image-icon.png')
                }
                style={{
                  width: 180,
                  height: 180,
                }}
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
            <Button
              title="Finsh"
              onPress={() => handleInfo()}
            />
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
