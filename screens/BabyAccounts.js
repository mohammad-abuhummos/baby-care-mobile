import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BabyInfoCard} from '../components/VitalSignsCard';
import database from '@react-native-firebase/database';
import {UserContext} from '../context/AppContext';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';

export default function BabyAccounts({navigation}) {
  const {babyId, user,setEditLoding, EditLoding} = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const [Baby, setBaby] = React.useState(null);
  const [userbaby, setUserbaby] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);

  //   setTimeout(function(){setRefreshing(false),setEditLoding(false),setLoading(false)}, 1000);
  // }, []);

  React.useEffect(() => {
    const onValueChange = database()
    .ref(`users/${user.uid}/baby/`)
    .on('value', (snapshot) => {
        setLoading(true);
        setBaby(snapshot.val());
        setLoading(false);
      });
    return () =>
      database().ref(`users/${user.uid}`).off('value', onValueChange);
  }, []);
  var arr = [];

  // console.log('bbb', Baby);

  //   forEach(function(Baby) {
  //     groupRef.child(Baby.key).once(...)
  // })

  React.useEffect(() => {
    if (!!Baby) {
      var promises = Object.keys(Baby).map(function (key) {
        let id = Baby[key].id;
        return database().ref('/babys/').child(id).once('value');
      });
      Promise.all(promises)
        .then(function (snapshots) {
          // console.log('snapshots', snapshots);
          snapshots.forEach(function (snapshot) {
            // console.log('snapshot', snapshot);
            if (!!snapshot._snapshot.value) {
              let hi = snapshot._snapshot.value.babyInfo;
              arr.push(hi);
            }
          });
        })
        .then(() => {
          // console.log('arr', arr);
          setUserbaby(arr);
          // console.log('userbaby', userbaby);
        });
    }
  }, [Baby,EditLoding]);

  React.useEffect(() => {
    setLoading(true)
    setTimeout(function(){setLoading(false)}, 1000);
  }, []);
  // Object.keys(Baby).map((key) => {
  //   let id = Baby[key].id;
  //   database()
  //     .ref(`/babys/${id}`)
  //     .once('value')
  //     .then((snapshot) => {
  //       console.log('User data: ', snapshot.val());
  //     });
  // });
  // database()
  //   .ref('/users/123')
  //   .once('value')
  //   .then((snapshot) => {
  //     console.log('User data: ', snapshot.val());
  //   });

  // const fethbaby = async (id) => {
  //  return Object.keys(Baby).map((key) => {
  //     let id = Baby[key].id;
  //        database()
  //      .ref(`/babys/${id}`)
  //      .once('value')
  //      .then(snapshot => {
  //        console.log('User data: ', snapshot.val());
  //        arr.push(snapshot.val())
  //      });
  //     });

  // }

  // React.useEffect(() => {
  //   Promise.all(fethbaby())
  //   .then(videos => {
  //     console.log("videos",videos)
  //     // do something with the data
  //   })
  //   .catch(err => {
  //     // handle error
  //   })

  // }, [Baby]);
  // React.useEffect(() => {
  //   console.log("arr.length",arr.length)
  //   if (arr.length != 0) {
  //     setLoading(false);

  //   }
  // }, [arr]);

  // const fitehkeys = () => {
  //   return Object.keys(babys).map((key) => {
  //     let id = key;
  //     let info = babys[key].babyInfo;
  //     let parms = {
  //       id: id,
  //       info: info,
  //     };
  //     return (
  //       <TouchableOpacity
  //         key={id}
  //         onPress={() => {
  //           navigation.navigate('BabyProfile', parms);
  //         }}>
  //         <View style={{paddingTop: 30, width: '100%'}}>
  //           <BabyInfoCard
  //             name={!!info && info.name}
  //             img={
  //               info.img
  //                 ? {uri: info.img}
  //                 : require('../assets/profile-icon.png')
  //             }
  //             color="#fff"
  //             status={babyId === id}
  //           />
  //         </View>
  //       </TouchableOpacity>
  //     );
  //   });
  // };

  // console.log("arr",arr);
  const RenderBaby = (babys) => {
    return userbaby.map((item) => {
      let parms = {item};
      return (
        <TouchableOpacity
          key={item.name}
          onPress={() => {
            navigation.navigate('BabyProfile', parms);
          }}>
          <View style={{paddingTop: 30, width: '100%'}}>
            <BabyInfoCard
              name={!!item && item.name}
              img={
                !!item.img
                  ? {uri: item.img}
                  : require('../assets/profile-icon.png')
              }
              color="#fff"
              status={babyId === item.id}
            />
          </View>
        </TouchableOpacity>
      );
    });
  };
  if (loading) {
    return <LoadingIndicator />;
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              padding: 20,
            }}>
            {RenderBaby()}
            <View style={{paddingTop: 30, width: '100%'}}>
              <TouchableOpacity
                onPress={() => {
                  // setLoading(true);
                  navigation.navigate('AddBaby');
                }}>
                <Card>
                  <View style={styles.container}>
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
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
  },
});
