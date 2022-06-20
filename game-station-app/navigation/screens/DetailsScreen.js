import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";

export default function DetailsScreen(props) {
  let infor = props.route.params.infor;
  const navigation = props.navigation;
  const [password, setPassword] = useState('');

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
      <View style={{
        marginLeft: 10,
        marginTop: 10
      }}>
        <Text
          style={{
            color: 'black',
            fontSize: 40,
            fontWeight: 'bold',
            textShadowColor: '#C0C0C0',
          }}
        >{infor.title}</Text>
        <Text
          style={styles.price}
        > C$ {infor.price}</Text>
        <Text style={styles.text}> Platform: {infor.platform}</Text>
        <Text style={styles.text}> Seller Name: {infor.seller.user_name}</Text>
        <Text style={styles.text}> Seller Email: {infor.seller.email}</Text>
        <Text style={styles.text}> Postal Code: {infor.postal_code}</Text>
        <Text style={styles.text}> Post Date: {infor.post_date.slice(0, 10)}</Text>
        <Text style={styles.text}> </Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(val) => {
            setPassword(val);
          }}
          value={password}
          placeholder="Password For Edit*"
        />
        <Button
          title="EDIT"
          onPress={() => {
            if (password === infor.seller.password) {
              navigation.navigate("Edit", { infor });
            } else {
              Alert.alert("Notice", "Wrong Password", [
                { text: "OK", onPress: () => console.log("You agreed") },
              ]);
            }

          }}
        />
      </View>
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
    margin: 0,
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

  price: {
    color: 'black',
    fontSize: 20,
  },

  text: {
    color: 'black',
    fontSize: 15,
    textShadowColor: '#C0C0C0',
  },
});

