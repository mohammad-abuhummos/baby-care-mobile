import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Card from './Card';

function ColorRange(from, to, current) {
  if (current >= from && to >= current) {
    return '#C3F584';
  } else if (current < from) {
    return '#FCCA4A';
  } else if (current > to) {
    return '#FF3D00';
  } else {
    return '#6DE15A';
  }
}
function Status(from, to, current) {
  if (current >= from && to >= current) {
    return 'Normal';
  } else if (current < from) {
    // console.log('low');
    return 'Low';
  } else if (current > to) {
    return 'High';
  } else {
    return 'Normal';
  }
}

export function VitalSignsCard(props) {
  const {name, symbols, from, to, currnet, samllSymbols} = props;
  let color = ColorRange(from, to, currnet);
  return (
    <Card>
      <View style={styles.container}>
        <View style={[styles.Vital, {borderColor: color}]}>
          <Text style={{fontSize: 33, fontWeight: 'bold', color: '#838487'}}>
            {currnet}
          </Text>
        </View>
        {!!symbols && <Text style={styles.Sings}>{symbols}</Text>}
        {!!samllSymbols && (
          <Text style={styles.samllSymbols}>{samllSymbols}</Text>
        )}
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
  const {img, name, status} = props;
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.Vital}>
          {!!img && (
            <Image
              source={img}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                resizeMode: 'center',
              }}
            />
          )}
        </View>
        <View style={styles.info}>
          <Text style={[styles.smallText]}>{name}</Text>
          {!!status ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.smallText]}>Status:</Text>
              <Text style={[styles.smallText, {color: '#C3F584'}]}>
                Connected
              </Text>
            </View>
          ) : (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={[styles.smallText]}>Status:</Text>
              <Text style={[styles.smallText, {color: '#FF3D00'}]}>
                {' '}
                Disconnected
              </Text>
            </View>
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
  samllSymbols: {
    fontSize: 25,
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
