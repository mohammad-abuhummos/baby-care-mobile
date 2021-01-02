import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import {UserContext} from '../App';
import database from '@react-native-firebase/database';
import LabelAndText from '../components/LabelAndText';
import {
  LineChart,
} from 'react-native-chart-kit';
import LoadingIndicator from '../components/LoadingIndicator';
export default function Statistics({navigation}) {
  const {user} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [userProfile, setuserProfile] = React.useState();

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user._user.uid}/info`)
      .on('value', (snapshot) => {
        setuserProfile(snapshot.val());
        setLoading(false);
      });
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, []);
  if (!!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.InnerContainer}>
          <View>
            <Text>Bezier Line Chart</Text>
            <LineChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={Dimensions.get('window').width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#EE979F',
                backgroundGradientFrom: '#EE979F',
                backgroundGradientTo: '#EE979F',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
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
