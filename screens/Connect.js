import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import Button from '../components/Button';
import AppInput from '../components/AppInput';
import LoadingIndicator from '../components/LoadingIndicator';
import axios from 'axios';
export default function Connect({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [ssid, setSsid] = React.useState();
  const [pasword, setPasword] = React.useState();
  const send = async () => {
    try {
      axios
        .post(`http://192.168.4.1/setting?ssid=${ssid}&pass=${pasword}`, {
          headers: {'Access-Control-Allow-Origin': '*'},
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.InnerContainer}>
            <View style={{paddingTop: 10}}>
              <Image
                source={require('../assets/logo.png')}
                style={{
                  width: 180,
                  height: 180,
                  resizeMode: 'center',
                  aspectRatio: 1 / 2,
                }}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput label="SSID" onChangeText={(text) => setSsid(text)} />
            </View>
            <View style={{paddingTop: 30}}>
              <AppInput
                label="Password"
                onChangeText={(text) => setPasword(text)}
              />
            </View>
            <View style={{paddingTop: 30}}>
              <Button
                title="Connect"
                onPress={() => {
                  send();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
// http://192.168.4.1/setting?ssid=hhhh&pass=hhhhhh

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
  },
  HedaerPink: {
    color: '#EE979F',
    fontSize: 36,
    fontWeight: 'normal',
    padding: 10,
    fontFamily: 'Pacificos',
  },
  InnerContainer: {
    paddingHorizontal: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
