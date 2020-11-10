import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
import Button from "../../components/Button";
import AppInput from "../../components/AppInput";

export default function CompleteSignUpScreen() {
  let [fontsLoaded] = useFonts({
    Pacifico: require("../../assets/Pacifico.ttf"),
  });
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retypePassword, setRetypePassword] = React.useState("");
  const input = {
    email: email,
    password: password,
    retypePassword: retypePassword,
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20 }}>
        {!!fontsLoaded && <Text style={styles.HedaerPink}>Sign Up</Text>}
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
          <AppInput
            label="Retype password"
            onChangeText={(text) => setRetypePassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{ paddingTop: 30 }}>
          <Button title="Finsh" />
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
    fontFamily: "Pacifico",
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
