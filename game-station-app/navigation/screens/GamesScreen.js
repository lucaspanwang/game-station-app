import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GameCard from "../../components/GameCard";
import { AppStateContext } from "../../AppStateContext";
import SearchBar from "react-native-dynamic-search-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  FontAwesome5,
  MaterialCommunityIcons,
} from "react-native-vector-icons";

export default function GameScreen({ navigation }) {
  const { games } = useContext(AppStateContext);
  const [filteredGames, setFilteredGames] = useState(games);
  const [keywords, setKeyWords] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "Apple",
      value: "apple",
      icon: () => <FontAwesome5 name="fire-alt" size={22} color="red" />,
    },
    {
      label: "Banana",
      value: "banana",
      icon: () => <FontAwesome5 name="fire-alt" size={22} color="red" />,
    },
  ]);

  const filter = (keywordsNow = keywords) => {
    let sellingGames = games.filter((game) => game.status === "Selling");
    if (keywordsNow) {
      let upperCasedKeywords = keywordsNow.toUpperCase();
      sellingGames = sellingGames.filter((game) =>
        game.title.toUpperCase().includes(upperCasedKeywords)
      );
    }
    setFilteredGames(sellingGames);
  };

  const clearSearch = () => {
    setKeyWords("");
    filter("");
  };

  useEffect(() => {
    filter();
  }, [games]);

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Games"
        onChangeText={(keywords) => setKeyWords(keywords)}
        onClearPress={clearSearch}
        onSearchPress={() => filter()}
        onSubmitEditing={() => filter()}
        style={styles.searchBar}
        searchIconImageStyle={{ height: 20 }}
        clearIconImageStyle={{ width: 30, height: 20 }}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Platform"
        style={{
          marginLeft: "9%",
          width: "82%",
          marginTop: 10,
          borderWidth: 0,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.15,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      />
      <ScrollView style={styles.scrollContainer}>
        {filteredGames.map((infor) => (
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
    paddingTop: 10,
    paddingBottom: 15,
  },
  groupTitle: {
    marginLeft: "10%",
    width: "80%",
    fontSize: 20,
    lineHeight: 40,
    fontWeight: "bold",
  },
  searchBar: {
    width: "82%",
    height: 40,
    marginTop: 20,
  },
});
