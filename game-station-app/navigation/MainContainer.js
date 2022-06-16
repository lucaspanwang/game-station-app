import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import gamesScreen from "./screens/GamesScreen";
import SellScreen from "./screens/SellScreen";

//Screen names
const home = "Home";
const games = "Games";
const sell = "Sell";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={home}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === games) {
              iconName = focused ? "game-controller" : "game-controller-outline";
            } else if (rn === sell) {
              iconName = focused ? "ios-sync-circle" : "ios-sync-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={home} component={HomeScreen} />
        <Tab.Screen name={games} component={gamesScreen} />
        <Tab.Screen name={sell} component={SellScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
