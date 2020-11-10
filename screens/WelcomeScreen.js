import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <Image source={require("../assets/logo.png")} />
      </View>
 
      <View style={{ paddingHorizontal: 50 }}>
        <Text style={styles.FontDark}>Choose language</Text>
      </View>

      <View style={{ paddingHorizontal: 50, paddingTop: 30 }}>
        <Button title="Arabic" />
      </View>
      <View style={{ paddingHorizontal: 50, paddingTop: 30 }}>
        <Button title="English" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  FontDark: {
    color: "#7C7C80",
    fontSize: 36,
    fontWeight: "400",
  },
});
