import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../../components/Button";
import AppInput from "../../components/AppInput";

export default function SignUpScreen() {
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const input = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
         <Text style={styles.HedaerPink}>Sign Up</Text>
      </View>
      <View style={styles.InnerContainer}>
        <View style={{ paddingTop: 10 }}>
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 180,
              height: 180,
              resizeMode: "center",
              aspectRatio: 1 / 2,
            }}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <AppInput
            label="First name"
            onChangeText={(text) => setFirstname(text)}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <AppInput
            label="Last name"
            onChangeText={(text) => setLastname(text)}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <AppInput
            label="Phone number"
            onChangeText={(text) => setPhone(text)}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <Button title="Next" />
        </View>
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
  HedaerPink: {
    color: "#EE979F",
    fontSize: 36,
    fontWeight: "normal",
    padding: 10,
  },
  InnerContainer: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
