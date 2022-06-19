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
      <Image
        source={{
          uri: infor.picture_urls[0],
        }}
        style={{
          width: '100%',
          height: 400,
        }}
      />
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
