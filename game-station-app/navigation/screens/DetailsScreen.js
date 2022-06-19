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

        blurRadius={10}
      />
      <View
        style={{
          width: '80%',
          marginLeft: '10%',
          marginTop: '10%',
          height: 300,
          position: 'absolute',
          shadowColor: "black",
          shadowOffset: { height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        <Image
          source={{
            uri: infor.picture_urls[0],
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      </View>

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
