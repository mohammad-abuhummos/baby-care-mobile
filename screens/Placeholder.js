import React from "react";
import { Text, View } from "react-native";
import Card from "../components/Card";
import {VitalSignsCard ,BabyInfoCard} from "../components/VitalSignsCard";

export default function Placeholder() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <BabyInfoCard  color="#fff" />
        <VitalSignsCard  color="#fff" />

    </View>
  );
}
