import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import CameraScreen from "../screens/CameraScreen";
export type RootStackParamList = {
  CameraScreen: undefined;
}
export enum RootStackScreens {
  CAMERA_SCREEN = "CameraScreen",
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

// FIXME: we need to create a new stack for main app
const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = () => {
  return (
    <Stack.Navigator id="HomeStack">
    <Stack.Screen
      name={RootStackScreens.CAMERA_SCREEN}
      component={CameraScreen}
      options={{
        headerShown: false,
      }}
    />

    </Stack.Navigator>
    );
}
export default HomeStack;
