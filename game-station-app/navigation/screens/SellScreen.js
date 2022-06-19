import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppStateContext } from "../../AppStateContext";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Constants from "expo-constants";

export default function SellScreen({ navigation }) {
  const { games, setGames } = useContext(AppStateContext);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [gameObj, setgameObj] = useState({
    _id: null,
    picture_urls: [null],
    title: null,
    platform: "PlayStation 4",
    status: "Selling",
    postal_code: null,
    price: null,
    description: null,
    post_date: "2022-06-21T18:18:51.818Z",
    seller: {
      user_name: null,
      email: null,
      password: null,
    },
  });

  useEffect(() => {
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry we need the camera permission");
        }
      }
    };
    getPermissionAsync();
  }, []);

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setgameObj((prev) => ({
        ...prev,
        picture_urls: [result.uri],
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={{ alignItems: "center" }}>
          {/* <Text
                        onPress={() => navigation.navigate('Home')}
                        style={{ fontSize: 26, fontWeight: 'bold' }}>Sell Screen</Text> */}

          {gameObj.picture_urls[0] && (
            <Image
              source={{
                uri: gameObj.picture_urls[0],
              }}
              style={{
                width: 200,
                height: 200,
              }}
            />
          )}
          <Button
            title={
              gameObj.picture_urls[0]
                ? "Change to another image"
                : "Pick an image from album"
            }
            onPress={_pickImage}
          />
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

          <TouchableOpacity
            style={styles.bubble}
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
                setgameObj((prev) => ({
                  ...prev,
                  _id: Math.floor(Math.random() * 10000000).toString(),
                }));

                setGames([gameObj, ...games]);

                Alert.alert("Notice", "Submitted Successfully", [
                  { text: "OK", onPress: () => console.log("You agreed") },
                ]);
              }
            }}
          >
            <Text style={styles.buttonText}>SUMBIT</Text>
          </TouchableOpacity>
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
    borderColor: "gray",
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
