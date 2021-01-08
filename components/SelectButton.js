import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';

export default function SelectButton(props) {
  const {title, onPress, active} = props;
  //   const [, setActive] = React.useState(null);
  return (
    <TouchableOpacity
      style={active ? styles.SelectButtonStyleActive : styles.SelectButtonStyle}
      onPress={onPress}>
      <Text style={active ? styles.TitleActive : styles.TitleNone}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  SelectButtonStyle: {
    borderWidth: 2,
    borderColor: '#EE979F',
    paddingHorizontal: 10,
    width:80,
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: 5,
    borderRadius: 50,
  },
  TitleNone: {
    fontWeight: 'bold',
    color:"#000"
  },
  SelectButtonStyleActive: {
    borderWidth: 2,
    borderColor: '#EE979F',
    backgroundColor: '#EE979F',
    paddingHorizontal: 10,
    width:80,
    justifyContent:"center",
    alignItems:"center",
    paddingVertical: 5,
    borderRadius: 50,
  },
  TitleActive: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
