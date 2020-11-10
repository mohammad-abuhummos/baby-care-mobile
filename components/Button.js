import React from "react";
import { ThemeProvider, Button as ElementsButton } from "react-native-elements";
const theme = {
  Button: {
    rounded: false,
    containerStyle: {
      borderRadius: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      elevation: 3,
    },
    buttonStyle: {
      borderRadius: 0,
      backgroundColor: "#EE979F",
    },
    titleStyle: {
      color: "#fff",
      width: "100%",
    },
  },
};

export default function Button(props) {
  const { title, onPress } = props;
  return (
    <ThemeProvider theme={theme}>
      <ElementsButton title={title} onPress={onPress} {...props} />
    </ThemeProvider>
  );
}
