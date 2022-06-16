import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import GameCard from "../../components/GameCard";
import { AppStateContext } from "../../AppStateContext";

export default function HomeScreen({ navigation }) {
  const { games } = useContext(AppStateContext);

  useEffect(() => {
    console.log(games);
  }, []);

  return (
    <View style={styles.container}>
      <GameCard navigation={navigation} />
      {/* <Text>{games[0].city}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
