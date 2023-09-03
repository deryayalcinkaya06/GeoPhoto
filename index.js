/**
 * @format
 */

import { AppRegistry, StatusBar } from "react-native";
import App from './App';
import { name as appName } from './app.json';
import { queryClient } from "./src/lib/queryClient";
import { navigationRef } from "./src/navigation/RootNavigation"
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { QueryClientProvider } from "@tanstack/react-query";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS } from "./src/lib/style";
import geoTheme from "./src/lib/theme";
import React, { useRef } from "react";

const _App = ({ isHeadless }) => {
  console.log("isHeadless", isHeadless);
  const routeNameRef = useRef();
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef?.getCurrentRoute()?.name;
          const trackScreenView = (routeName) => {
            console.log("route name", routeName);
          };
          if (previousRouteName !== currentRouteName) {
            routeNameRef.current = currentRouteName;
            trackScreenView(currentRouteName);
          }
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.baseOrange}
          translucent={true}
        />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={geoTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => _App);
