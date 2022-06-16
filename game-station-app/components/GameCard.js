import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function GameCard({ infor, navigation }) {
  return (
    <View style={styles.cardContainer}>
      <Text>haha</Text>
      <Text>haha</Text>
      <Text>haha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: "10",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
