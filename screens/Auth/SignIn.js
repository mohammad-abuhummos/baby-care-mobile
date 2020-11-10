import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../../components/Button";
import AppInput from "../../components/AppInput";

export default function SignInScreen() {
  const [Email, setEmail] = React.useState();
  const [Password, setPassword] = React.useState();
  const input = {
    email: Email,
    password: Password,
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.HedaerPink}>Sign In</Text>
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
          <AppInput label="Email" onChangeText={(text) => setEmail(text)} />
        </View>
        <View style={{ paddingTop: 30 }}>
          <AppInput
            label="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <Button title="Sign in" />
        </View>
        <View style={{ paddingTop: 30 }}>
          <Button title="Sign up" />
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
    paddingHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
