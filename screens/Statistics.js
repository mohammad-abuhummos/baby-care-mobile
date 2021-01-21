import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {UserContext} from '../context/AppContext';
import database from '@react-native-firebase/database';
import {LineChart} from 'react-native-chart-kit';
import LoadingIndicator from '../components/LoadingIndicator';
import SelectButton from '../components/SelectButton';

export default function Statistics({navigation}) {
  const {user, babyId} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(true);
  const [loadingChart, setLoadingChart] = React.useState(false);
  const [userProfile, setuserProfile] = React.useState();
  const [Sign, setSign] = React.useState('bpm');
  const [queryOn, setqueryOn] = React.useState('1 Hour');
  const [query, setquery] = React.useState(null);
  const [queryResult, setqueryResult] = React.useState([]);
  const [arryOfdurtion, setArryOfdurtion] = React.useState([]);
  let lastHourDate = () => {
    var currentdate = new Date();
    var Hour = currentdate.getHours();
    return Hour;
  };


  const araryOfquters = () => {
    var date = Date.now();
    if (queryOn === '1 Hour') {
      let quters = [0, 0, 0, 0, 0];
      return quters.map((data,index) => {
        if (index === 0) {
          return date;
        } else {
          return ((date / 1000 *index) - 900 * index) * 100;
        }
      });
    } 
     if (queryOn === '7 Hour') {
      let quters = [0, 0, 0, 0, 0, 0, 0];
      return quters.map((data,index) => {
        if (index === 0) {
          return date;
        } else {
          return ((date / 1000*index) - (3600 * index)) * 100;
        }
      });
    } 
     if (queryOn === 'Week') {
      let quters = [0, 0, 0, 0,0,0,0];
      return quters.map((data,index) => {
       return  ((date / 1000) - (8600 * index)) * 10000;
        
      });
    } 
     if (queryOn === 'Month') {
      let quters = [0, 0, 0, 0];
      return quters.map((data,index) => {
        if (index === 0) {
          return date;
        } else {
          return (date / 1000000 - 604800 * index) * 1000000;
        }
      });
    }
  };

  console.log("araryOfquters()",araryOfquters())

  let lastDate = () => {
    var date = Date.now();
    if (queryOn === '1 Hour') {
      return (date / 1000 - 3600) * 1000;
    } else if (queryOn === '7 Hour') {
      return (date / 1000 - 3600 * 7) * 1000;
    } else if (queryOn === 'Week') {
      return (date / 1000 - 604800) * 1000;
    } else if (queryOn === 'Month') {
      return (date / 1000 - 604800 * 4) * 1000;
    }
  };
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
          `${lastHourDate() + 1}`,
          `${lastHourDate() + 2}`,
          `${lastHourDate() + 3}`,
          `${lastHourDate() + 4}`,
          `${lastHourDate() + 5}`,
          `${lastHourDate() + 6}`,
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
      // console.log("araryOfquters()",araryOfquters()) 
      const GetrAverge = () => {
        let q = arryOfdurtion;
        // console.log("arryOfdurtion",arryOfdurtion)
        // console.log('araryOfquters()', q);
        // console.log('araryOfquters()', query);
        if (!!query) {
          return q.map((index, date, elements) => {
            let next;
            if (date < q.length - 1) {
              next = q[date + 1];
            } else {
              next = q[date];
            }
            // console.log('next', next);
            let start = `${date}`
             let  end = `${q[date + 1]}`;
            let ans = Object.keys(query).filter((e) => e >= start && e <= end);
            let result = ans.reduce((a, b) => a + query[b], 0) / ans.length;
            if (!Number.isNaN(result)) {
              return result;
            } else {
              return 0;
            }
          });
        }
      };

      // console.log("GetrAverge()",GetrAverge())
      // let quarterSize = Math.floor(Object.values(data).length / frag);
      // let res = Object.values(data)
      //   .reduce((accumulator, currentValue, currentIndex, array) => {
      //     let currentQuarter = Math.floor(currentIndex / quarterSize);
      //     accumulator[currentQuarter] =
      //       accumulator[currentQuarter] + currentValue;
      //     return accumulator;
      //   }, initarry)
      //   .map((sum) => sum / quarterSize);
      // sgin = res.filter((value) => !Number.isNaN(value));
      // console.log("Getrange()",Getrange())
      // console.log('res', Object.values(data));
      // console.log('res', res);
      return [datalable, GetrAverge()];
    } else {
      return false;
    }
  };

  const qury = async () => {
    setLoadingChart(true);
    var start = Date.now();
    var end = lastDate();

    // console.log("lastDate()",lastDate())
    setArryOfdurtion(araryOfquters())
    try {
      // console.log("end",end)
      const scores = await database()
        .ref(`babys/${babyId}/logs/${Sign}`)
        .orderByKey()
        .startAt(`${end}`)
        .endAt(`${start}`)
        .once('value');
      setquery(scores._snapshot.value);

      setLoadingChart(false);
      // console.log('araryOfquters()', );
      // console.log(scores);
    } catch (error) {
      setLoadingChart(false);
      // console.log('error', error);
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
