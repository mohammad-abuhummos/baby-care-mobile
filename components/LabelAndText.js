import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default function LabelAndText(props) {
  const {label, text} = props;
  return (
    <View style={styles.Inputcontainer}>
      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#7F8083',
            fontSize: 18,
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          {label}
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: 'center',
        }}>
        <Text style={{color: '#000', fontSize: 18}}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Inputcontainer: {
    flexDirection: 'row',
    width: '100%',
  },
});
