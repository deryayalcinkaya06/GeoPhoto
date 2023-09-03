import { NavigationProp } from "@/navigation/MainNavigator";
import Box from "@/shared-component/base/box";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const CongratulationsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
    </Box>
  );
};

export default CongratulationsScreen;
