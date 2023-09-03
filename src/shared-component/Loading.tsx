import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Box from "./base/box";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <Box style={styles.container}>
      <LottieView
        source={require("../assets/common/Loading.json")}
        autoPlay
        loop
        style={{
          zIndex: 99999,
          width: "40%",
        }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 9999,
    elevation: 1,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});

export default Loading;
