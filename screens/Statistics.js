import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../components/Button';
import {UserContext} from '../App';
import database from '@react-native-firebase/database';
import LabelAndText from '../components/LabelAndText';
import {LineChart} from 'react-native-chart-kit';
import LoadingIndicator from '../components/LoadingIndicator';
import SelectButton from '../components/SelectButton';
import dayjs from 'dayjs';

export default function Statistics({navigation}) {
  const {user,babyId} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [loadingChart, setLoadingChart] = React.useState(false);
  const [userProfile, setuserProfile] = React.useState();
  const [Sign, setSign] = React.useState('bpm');
  const [queryOn, setqueryOn] = React.useState('1 Hour');
  const [query, setquery] = React.useState(null);
  const [queryResult, setqueryResult] = React.useState([]);

  let currntDate = () => {
    var currentdate = new Date();
    var Year = currentdate.getFullYear();
    var Month = currentdate.getMonth() + 1;
    var Day = currentdate.getDate();
    var Hour = currentdate.getHours() + 2;
    var Minute = currentdate.getMinutes();
    var Second = currentdate.getSeconds();
    let date =
      Year + '-' + Month + '-' + Day + 'T' + Hour + ':' + Minute + ':' + Second;
    return date;
  };
  let QcurrntDate = (mo, d, h, m) => {
    var currentdate = new Date();
    var Year = currentdate.getFullYear();
    var Month = currentdate.getMonth() + 1 - mo;
    var Day = currentdate.getDate() - d;
    var Hour = currentdate.getHours() + 2 - h;
    var Minute = currentdate.getMinutes() - m;
    var Second = currentdate.getSeconds();
    let date =
      Year + '-' + Month + '-' + Day + 'T' + Hour + ':' + Minute + ':' + Second;
    return date;
  };
  let lastHourDate = () => {
    var currentdate = new Date();
    var Hour = currentdate.getHours() + 2 - 1;
    return Hour;
  };

  // const RenderLables = (q) =>{
  //   return q[0].map((d) =>{

  //   })
  // }

  React.useEffect(() => {
    const onValueChange = database()
      .ref(`/users/${user._user.uid}/info`)
      .on('value', (snapshot) => {
        setuserProfile(snapshot.val());
      });
    return () => database().ref(`/Data`).off('value', onValueChange);
  }, []);
  React.useEffect(() => {
    setqueryResult(RenderKey(query));
    setLoading(false);
  }, [query]);
  React.useEffect(() => {
    qury();
  }, [queryOn, Sign]);

  const RenderKey = (data) => {
    if (!!data) {
      var keys = [];
      var val = [];
      let datalable = [
        `${lastHourDate()}:00`,
        `${lastHourDate()}:15`,
        `${lastHourDate()}:30`,
        `${lastHourDate()}:45`,
        `${lastHourDate() + 1}:00`,
      ];
      var sgin;
      // Object.entries(data).forEach(([key, value]) => {
      //   keys.push(key);
      //   val.push(value);
      // });
      // datalable = keys.map((key) => {
      //   return dayjs.unix(key).hour();
      // });

      let frag = 0;
      let initarry;
      if (queryOn === '1 Hour') {
        frag = 5;
        datalable = [
          `${lastHourDate()}:00`,
          `${lastHourDate()}:15`,
          `${lastHourDate()}:30`,
          `${lastHourDate()}:45`,
          `${lastHourDate() + 1}:00`,
        ];
        initarry = [0, 0, 0, 0, 0];
      } else if (queryOn === '7 Hour') {
        frag = 7;
        datalable = [
          `${lastHourDate()}`,
          `${lastHourDate()}`,
          `${lastHourDate()}`,
          `${lastHourDate()}`,
          `${lastHourDate() + 1}`,
          `${lastHourDate() + 1}`,
          `${lastHourDate() + 1}`,
        ];
        initarry = [0, 0, 0, 0, 0, 0, 0];
      } else if (queryOn === 'Week') {
        frag = 7;
        datalable = [
          `day 1`,
          `day 2`,
          `day 3`,
          `day 4`,
          `day 5`,
          `day 6`,
          `day 7`,
        ];
        initarry = [0, 0, 0, 0, 0, 0, 0];
      } else if (queryOn === 'Month') {
        frag = 4;
        datalable = [`w1`, `w2`, `w3`, `w4`];
        initarry = [0, 0, 0, 0];
      }
      let quarterSize = Math.floor(Object.values(data).length / frag);
      let res = Object.values(data)
        .reduce((accumulator, currentValue, currentIndex, array) => {
          let currentQuarter = Math.floor(currentIndex / quarterSize);
          accumulator[currentQuarter] =
            accumulator[currentQuarter] + currentValue;

          return accumulator;
        }, initarry)
        .map((sum) => sum / quarterSize);
      sgin = res.filter((value) => !Number.isNaN(value));
      console.log('res', Object.values(data));
      console.log('res', res);
      return [datalable, sgin];
    } else {
      return false;
    }
  };

  const qury = async () => {
    setLoadingChart(true);
    let start;
    let end;
    try {
      if (queryOn === '1 Hour') {
        start = dayjs(`${currntDate()}`).unix();
        end = dayjs(`${QcurrntDate(0, 0, 1, 0)}`).unix();
      } else if (queryOn === '7 Hour') {
        start = dayjs(`${currntDate()}`).unix();
        end = dayjs(`${QcurrntDate(0, 0, 7, 0)}`).unix();
      } else if (queryOn === 'Week') {
        start = dayjs(`${currntDate()}`).unix();
        end = dayjs(`${QcurrntDate(0, 7, 0, 0)}`).unix();
      } else if (queryOn === 'Month') {
        start = dayjs(`${currntDate()}`).unix();
        end = dayjs(`${QcurrntDate(1, 0, 0, 0)}`).unix();
      }
      console.log('startAt', start);
      console.log('endAt', end);
      console.log('startAt', dayjs.unix(start).toISOString());
      console.log('endAt', dayjs.unix(end).toISOString());
      const scores = await database()
        .ref(
          `users/${user.uid}/baby/${babyId}/logs/${Sign}`,
        )
        .orderByKey()
        .startAt(`${end}`)
        .endAt(`${start}`)
        .once('value');
      setquery(scores._snapshot.value);
      setLoadingChart(false);
      console.log(scores);
    } catch (error) {
      setLoadingChart(false);
      console.log('error', error);
    }
  };

  if (!!loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            alignItems: 'flex-start',
            width: '100%',
            paddingTop: 25,
            paddingLeft: 15,
          }}>
          <Text style={{fontWeight: 'bold'}}>Vital Signs:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            display: 'flex',
            width: '100%',
            paddingVertical: 15,
          }}>
          <SelectButton
            title="bpm"
            active={Sign === 'bpm'}
            onPress={() => setSign('bpm')}
          />
          <SelectButton
            title="Spo2"
            active={Sign === 'SpO2'}
            onPress={() => setSign('SpO2')}
          />
          <SelectButton
            title="Temp"
            active={Sign === 'temp'}
            onPress={() => setSign('temp')}
          />
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            width: '100%',
            paddingTop: 15,
            paddingLeft: 15,
          }}>
          <Text style={{fontWeight: 'bold'}}>Last:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            display: 'flex',
            width: '100%',
            paddingVertical: 20,
          }}>
          <SelectButton
            title="1 Hour"
            active={queryOn === '1 Hour'}
            onPress={() => setqueryOn('1 Hour')}
          />
          <SelectButton
            title="7 Hour"
            active={queryOn === '7 Hour'}
            onPress={() => setqueryOn('7 Hour')}
          />
          <SelectButton
            title="Week"
            active={queryOn === 'Week'}
            onPress={() => setqueryOn('Week')}
          />
          <SelectButton
            title="Month"
            active={queryOn === 'Month'}
            onPress={() => setqueryOn('Month')}
          />
        </View>
        <View style={styles.InnerContainer}>
          <View>
            {!loadingChart ? (
              <>
                {!!queryResult ? (
                  <LineChart
                    data={{
                      labels: queryResult[0],
                      datasets: [
                        {
                          data: queryResult[1],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width} // from react-native
                    height={300}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: '#EE979F',
                      backgroundGradientFrom: '#EE979F',
                      backgroundGradientTo: '#EE979F',
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
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
                ) : (
                  <View
                    style={{
                      height: 300,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>No data to show</Text>
                  </View>
                )}
              </>
            ) : (
              <View
                style={{
                  height: 300,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#EE979F" />
              </View>
            )}
          </View>
          {/* <Button title="qury" onPress={() => qury()} /> */}
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
    // justifyContent: 'center',
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
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
