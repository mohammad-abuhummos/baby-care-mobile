import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Card from './Card';

function ColorRange(from, to, current) {
  if (current >= from && to >= current) {
    console.log('normal');
    return '#C3F584';
  } else if (current < from) {
    console.log('low');
    return '#FCCA4A';
  } else if (current > to) {
    console.log('high');
    return '#FF3D00';
  } else {
    return '#6DE15A';
  }
}
function Status(from, to, current) {
  if (current >= from && to >= current) {
    console.log('normal');
    return 'Normal';
  } else if (current < from) {
    console.log('low');
    return 'Low';
  } else if (current > to) {
    console.log('high');
    return 'High';
  } else {
    return 'Normal';
  }
}

export function VitalSignsCard(props) {
  const {name, symbols, from, to, currnet} = props;
  let color = ColorRange(from, to, currnet);
  console.log(color);
  return (
    <Card>
      <View style={styles.container}>
        <View style={[styles.Vital, {borderColor: color}]}>
          <Text style={{fontSize: 33, fontWeight: 'bold', color: '#838487'}}>
            {currnet}
          </Text>
        </View>
        <Text style={styles.Sings}>{symbols}</Text>
        <View style={styles.status}>
          <Text style={[styles.textCenter, styles.text]}>{name}</Text>
          <Text style={[styles.textCenter, styles.text, {color: color}]}>
            {Status(from, to, currnet)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

export function BabyInfoCard(props) {
  const {color, img, name, status, isSleep, from, to} = props;
  const [statusColor, setStatusColor] = React.useState(color);
  return (
    <Card>
      <View style={styles.container}>
        <View style={[styles.Vital, {borderColor: statusColor}]}>
          {!!img && (
            <Image
              source={img}
              style={{width: 80, height: 80, borderRadius: 50}}
            />
          )}
        </View>
        <View style={styles.info}>
          <Text style={[styles.smallText]}>{name}</Text>
          {!!status && (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.smallText]}>Status:</Text>
              <Text style={[styles.smallText, {color: statusColor}]}>
                {status}
              </Text>
            </View>
          )}
          {!isSleep && (
            <Text style={[styles.smallText]}>Your baby {name} is Sleeping</Text>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  Vital: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 9,
    borderRadius: 50,
  },
  Sings: {
    fontSize: 43,
    fontWeight: 'bold',
    color: '#838487',
    alignSelf: 'center',
    paddingLeft: 5,
  },
  status: {
    width: 160,
    padding: 5,
    justifyContent: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#838487',
  },
  smallText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#838487',
  },
  info: {
    padding: 5,
    paddingLeft: 10,
    justifyContent: 'center',
  },
});
