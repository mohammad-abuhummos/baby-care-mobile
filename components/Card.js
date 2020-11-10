import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Card(props) {
  return (
    <View style={[styles.container,props.style]} >
         {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    width: '100%',
    borderRadius: 15,
    padding:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
