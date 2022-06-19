import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GameCard from "../../components/GameCard";
import { AppStateContext } from "../../AppStateContext";

export default function GameScreen({ navigation }) {
  const { games } = useContext(AppStateContext);

  useEffect(() => {}, [games]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {games.map((infor) => (
          <GameCard key={infor._id} infor={infor} navigation={navigation} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
  },
  groupTitle: {
    marginLeft: "10%",
    width: "80%",
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "bold",
  },
});
