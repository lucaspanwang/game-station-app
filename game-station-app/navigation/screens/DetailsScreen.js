import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function DetailsScreen(props) {
  let infor = props.route.params.infor;

  return (
    <View>
      <Text></Text>
      <Text>{infor.title}</Text>
    </View>
  );
}
