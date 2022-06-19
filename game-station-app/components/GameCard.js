import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function GameCard({ infor, navigation }) {
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: infor.picture_urls[0] }} style={styles.image} />
      <View style={styles.inforContainer}>
        <Text style={styles.title}>{infor.title}</Text>
        <Text>{infor.post_date.slice(0, 10)}</Text>
        <Text>Postal Code: {infor.postal_code}</Text>
        <Text>Price: C${infor.price}</Text>
        <TouchableOpacity
          style={styles.bubble}
          onPress={() => {
            navigation.navigate("Details", {
              infor,
            });
          }}
        >
          <Text style={styles.buttonText}>DETAILS</Text>
        </TouchableOpacity>
      </View>
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
  },

  inforContainer: {
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
    marginBottom: 12,
  },

  title: {
    lineHeight: 24,
    fontWeight: "bold",
    fontSize: 16,
  },

  bubble: {
    backgroundColor: "rgba(30,30,240,0.7)",
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: 10,
    borderRadius: 6,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
