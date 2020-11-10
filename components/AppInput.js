import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function AppInput(props) {
  const { label, placeholder } = props;
  return (
    <View style={styles.Inputcontainer}>
      <View
        style={{
          flex: 3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ color: "#7F8083", alignSelf: "center", textAlign: "center" }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          flex: 8,
          justifyContent: "center",
          shadowOpacity: 1,
          shadowRadius: 3,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 10,
        }}
      >
        <View
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          }}
        >
          <TextInput
            style={{
              height: 40,
              borderColor: "#EC4468",
              borderWidth: 1,
              padding: 5,
            }}
            placeholder={placeholder}
            {...props}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Inputcontainer: {
    flexDirection: "row",
    width: "100%",
  },
});
