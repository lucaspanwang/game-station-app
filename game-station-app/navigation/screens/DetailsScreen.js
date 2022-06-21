import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { AppStateContext } from "../../AppStateContext";

export default function DetailsScreen(props) {
  const { games, setGames } = useContext(AppStateContext);
  const [infor, setInfor] = useState(props.route.params.infor);
  const [openVerify, setOpenVerify] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigation = props.navigation;
  const [password, setPassword] = useState("");

  useEffect(() => {
    let game = games.filter((game) => game._id === infor._id)[0];
    if (game) {
      setInfor(game);
    }
  }, [games]);

  const deleteGame = () => {
    const len = games.length;
    for (let i = 0; i < len; i++) {
      if (games[i]._id === infor._id) {
        setGames(games.slice(0, i).concat(games.slice(i + 1, len)));
        break;
      }
    }
    navigation.navigate("Home");
  };

  const sellGame = () => {
    let copy = JSON.parse(JSON.stringify(infor));
    if (copy.status === "Sold") {
      copy.status = "Selling";
    } else {
      copy.status = "Sold";
    }
    setInfor(copy);
    setGames([copy, ...games.filter((game) => game._id !== infor._id)]);
  };

  return (
    <View>
      <Image
        source={{
          uri: infor.picture_urls[0],
        }}
        style={{
          width: "100%",
          height: 400,
        }}
        blurRadius={10}
      />
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
          marginTop: "10%",
          height: 300,
          position: "absolute",
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
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          width: "80%",
          marginLeft: "10%",
          marginTop: "10%",
          height: 300,
          position: "absolute",
          shadowColor: "black",
          shadowOffset: { height: 2 },
          shadowOpacity: 0.3,
        }}
      >
        {infor.status === "Sold" && (
          <Image
            source={require("../../assets/sold-out.png")}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 10,
            }}
          />
        )}
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              color: "black",
              fontSize: 25,
              fontWeight: "bold",
              textShadowColor: "#C0C0C0",
            }}
          >
            {infor.title}
          </Text>
          <Text style={styles.price}> C$ {infor.price}</Text>
          <Text style={styles.text}> Platform: {infor.platform}</Text>
          <Text style={styles.text}>
            {" "}
            Seller Name: {infor.seller.user_name}
          </Text>
          <Text style={styles.text}> Seller Email: {infor.seller.email}</Text>
          <Text style={styles.text}> Postal Code: {infor.postal_code}</Text>
          <Text style={styles.text}>
            {" "}
            Post Date: {infor.post_date.slice(0, 10)}
          </Text>
          <Text style={styles.text}> </Text>
          <View style={styles.buttonArea}></View>
          {!isSeller && !openVerify && (
            <TouchableOpacity
              style={styles.bubble}
              onPress={() => {
                setOpenVerify(true);
              }}
            >
              <Text style={styles.buttonText}>I'M THE SELLER</Text>
            </TouchableOpacity>
          )}
          {!isSeller && openVerify && (
            <>
              <TouchableOpacity
                style={styles.bubbleCancel}
                onPress={() => {
                  setOpenVerify(false);
                }}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(val) => {
                  setPassword(val);
                }}
                value={password}
                placeholder="Password For Edit*"
              />
              <TouchableOpacity
                style={[styles.bubble, { marginTop: 10 }]}
                onPress={() => {
                  if (password === infor.seller.password) {
                    Alert.alert("Success", "You can Edit your post now", [
                      { text: "OK", onPress: () => setIsSeller(true) },
                    ]);
                  } else {
                    Alert.alert("Notice", "Wrong Password", [
                      { text: "OK", onPress: () => console.log("You agreed") },
                    ]);
                  }
                }}
              >
                <Text style={styles.buttonText}>VERIFY</Text>
              </TouchableOpacity>
            </>
          )}
          {isSeller && (
            <>
              <TouchableOpacity
                style={[
                  styles.bubble,
                  { backgroundColor: "rgba(0,150,0,0.7)" },
                ]}
                onPress={sellGame}
              >
                <Text style={styles.buttonText}>
                  {infor.status === "Selling" ? "ALREADY SOLD" : "NOT SOLD"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bubble, { marginTop: 10 }]}
                onPress={() => {
                  navigation.navigate("Edit", { infor });
                }}
              >
                <Text style={styles.buttonText}>EDIT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.bubbleCancel, { marginTop: 10 }]}
                onPress={() =>
                  Alert.alert("Alert", "Are you sure you want to delete?", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("You agreed"),
                    },
                    {
                      text: "Yes",
                      onPress: deleteGame,
                    },
                  ])
                }
              >
                <Text style={styles.buttonText}>DELETE</Text>
              </TouchableOpacity>
            </>
          )}
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
    paddingBottom: 20,
    marginBottom: 20,
  },
  textContainer: {
    width: "80%",
    left: "10%",
  },
  input: {
    height: 40,
    marginTop: 10,
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
    width: "100%",
  },
  scrollContainer: {
    width: "100%",
    paddingTop: 15,
    textAlign: "center",
  },

  price: {
    color: "black",
    fontSize: 20,
  },

  text: {
    color: "black",
    fontSize: 15,
    textShadowColor: "#C0C0C0",
    marginTop: 4,
  },

  bubble: {
    backgroundColor: "rgba(30,30,240,0.7)",
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  bubbleCancel: {
    backgroundColor: "rgba(240,30,30,0.7)",
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
