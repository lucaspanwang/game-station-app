import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

export default function DetailsScreen(props) {
  let infor = props.route.params.infor;
  const navigation = props.navigation;

  return (
    <View>
      <Text></Text>
      <Text>{infor.title}</Text>
      <Button
        title="EDIT"
        onPress={() => {
          navigation.navigate("Edit");
        }}
      />
    </View>
  );
}
