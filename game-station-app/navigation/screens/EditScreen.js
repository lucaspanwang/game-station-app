import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppStateContext } from "../../AppStateContext";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Constants from "expo-constants";

export default function EditScreen(props) {
  let infor = props.route.params.infor;

  const { games, setGames } = useContext(AppStateContext);

  const [gameObj, setgameObj] = useState({
    _id: infor._id,
    picture_urls: infor.picture_urls,
    title: infor.title,
    platform: infor.platform,
    status: infor.status,
    postal_code: infor.postal_code,
    price: infor.price.toString(),
    description: infor.description,
    post_date: "2022-06-21T18:18:51.818Z",
    seller: {
      user_name: infor.seller.user_name,
      email: infor.seller.email,
      password: infor.seller.password,
    },
  });

  return (
    <View style={styles.container}>
      <Text></Text>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Title*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                title: val,
              }));
            }}
            value={gameObj.title}
            placeholder="Product Title*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Description*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                description: val,
              }));
            }}
            value={gameObj.description}
            placeholder="Product Description*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Nick Name*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                seller: {
                  ...prev.seller,
                  user_name: val,
                },
              }));
            }}
            value={gameObj.seller.user_name}
            placeholder="Your Nick Name*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Email*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                seller: {
                  ...prev.seller,
                  email: val,
                },
              }));
            }}
            value={gameObj.seller.email}
            placeholder="Your Contact Email*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Password*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                seller: {
                  ...prev.seller,
                  password: val,
                },
              }));
            }}
            value={gameObj.seller.password}
            placeholder="Password For Editing*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Price*
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                price: val,
              }));
            }}
            value={gameObj.price}
            placeholder="Price*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Postal Code
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(val) => {
              setgameObj((prev) => ({
                ...prev,
                postal_code: val,
              }));
            }}
            value={gameObj.postal_code}
            placeholder="Postal Code*"
          />
          <Text
            style={{
              marginTop: 10,
              textAlign: "center",
              color: "gray",
            }}
          >
            Choose The Game Platform*
          </Text>
          <Picker
            selectedValue={gameObj.platform}
            style={{
              width: "70%",
            }}
            onValueChange={(itemValue, itemIndex) => {
              setgameObj((prev) => ({
                ...prev,
                platform: itemValue,
              }));
            }}
          >
            <Picker.Item label="PlayStation 4" value="PlayStation 4" />
            <Picker.Item label="PlayStation 5" value="PlayStation 5" />
            <Picker.Item label="Xbox Series X|S" value="Xbox Series X|S" />
            <Picker.Item label="Nintendo Switch" value="Nintendo Switch" />
          </Picker>
          <Button title="SUBMIT"
            onPress={() => {
              if (
                gameObj.price == null ||
                gameObj.seller.user_name == null ||
                gameObj.seller.password == null ||
                gameObj.seller.email == null ||
                gameObj.title == null ||
                gameObj.postal_code == null ||
                gameObj.description == null ||
                gameObj.picture_urls[0] == null
              ) {
                Alert.alert("Notice", "Please confirm all infos are written", [
                  { text: "OK", onPress: () => console.log("You agreed") },
                ]);
              } else {

                setGames([gameObj, ...games.filter(game => game._id !== infor._id)]);

                Alert.alert("Notice", "Submitted Successfully", [
                  { text: "OK", onPress: () => console.log("You agreed") },
                ]);
              }
            }}
          />
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "80%",
  },
  scrollContainer: {
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: "center",
  },
  bubble: {
    backgroundColor: "rgba(30,30,240,0.7)",
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 6,
    marginBottom: 30,
    width: "70%",
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

