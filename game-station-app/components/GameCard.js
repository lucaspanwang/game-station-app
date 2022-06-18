import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function GameCard({ infor, navigation }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: infor.picture_urls[0] }} style={styles.image} />
      <Text style={styles.title}>{infor.title}</Text>
      <Text>haha</Text>
      <Text>haha</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    marginLeft: "10%",
    marginTop: 15,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: "100%",
    height: 250,
    marginBottom: 8,
  },

  title: {
    lineHeight: 30,
    fontWeight: "bold",
    fontSize: 16,
  },
});
