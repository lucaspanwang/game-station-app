import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GameCard from "../../components/GameCard";
import { AppStateContext } from "../../AppStateContext";
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

export default function HomeScreen({ navigation }) {
  const { games } = useContext(AppStateContext);
  const [picks, setPicks] = useState([]);
  const [psGames, setPsGames] = useState([]);
  const [xboxGames, setXboxGames] = useState([]);
  const [nsGames, setNsGames] = useState([]);

  useEffect(() => {
    setPicks(games.slice(0, 3));
    setPsGames(
      games.filter((game) => game.platform.includes("PlayStation")).slice(0, 3)
    );
    setXboxGames(
      games.filter((game) => game.platform.includes("Xbox")).slice(0, 3)
    );
    setNsGames(
      games.filter((game) => game.platform.includes("Switch")).slice(0, 3)
    );
  }, [games]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.groupTitle}>
          <FontAwesome5 name="fire-alt" size={22} color="red" />
          &nbsp;&nbsp;Today's Picks
        </Text>
        {picks.map((infor) => (
          <GameCard key={infor._id} infor={infor} navigation={navigation} />
        ))}
        <Text style={styles.groupTitle}>
          <FontAwesome5 name="playstation" size={22} color="blue" />
          &nbsp;&nbsp;PlayStation
        </Text>
        {psGames.map((infor) => (
          <GameCard key={infor._id} infor={infor} navigation={navigation} />
        ))}
        <Text style={styles.groupTitle}>
          <FontAwesome5 name="xbox" size={22} color="green" />
          &nbsp;&nbsp;Xbox
        </Text>
        {xboxGames.map((infor) => (
          <GameCard key={infor._id} infor={infor} navigation={navigation} />
        ))}
        <Text style={styles.groupTitle}>
          <MaterialCommunityIcons
            name="nintendo-switch"
            size={25}
            color="red"
          />
          &nbsp;&nbsp;Nintendo Switch
        </Text>
        {nsGames.map((infor) => (
          <GameCard key={infor._id} infor={infor} navigation={navigation} />
        ))}
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
  groupTitle: {
    marginLeft: "10%",
    width: "80%",
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "bold",
  },
});
