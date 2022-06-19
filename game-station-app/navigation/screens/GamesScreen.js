import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import GameCard from "../../components/GameCard";
import { AppStateContext } from "../../AppStateContext";
import SearchBar from "react-native-dynamic-search-bar";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Ionicons,
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
      label: "All",
      value: "all",
      icon: () => <Ionicons name="game-controller" size={25} color="#333333" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "PlayStation 5",
      value: "PlayStation 5",
      icon: () => <FontAwesome5 name="playstation" size={22} color="blue" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "PlayStation 4",
      value: "PlayStation 4",
      icon: () => <FontAwesome5 name="playstation" size={22} color="blue" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "Xbox Series X|S",
      value: "Xbox Series X|S",
      icon: () => <FontAwesome5 name="xbox" size={22} color="green" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "Xbox One",
      value: "Xbox One",
      icon: () => <FontAwesome5 name="xbox" size={22} color="green" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "Nintendo Switch",
      value: "Nintendo Switch",
      icon: () => (
        <MaterialCommunityIcons name="nintendo-switch" size={25} color="red" />
      ),
      containerStyle: styles.dropDownItem,
    },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {
      label: "All",
      value: "all",
      icon: () => <FontAwesome5 name="dollar-sign" size={25} color="#333333" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "0 - 30",
      value: "0-30",
      icon: () => <FontAwesome5 name="dollar-sign" size={25} color="orange" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "30 - 60",
      value: "30-60",
      icon: () => <FontAwesome5 name="dollar-sign" size={25} color="red" />,
      containerStyle: styles.dropDownItem,
    },
    {
      label: "60 +",
      value: "60+",
      icon: () => <FontAwesome5 name="dollar-sign" size={25} color="purple" />,
      containerStyle: styles.dropDownItem,
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
    if (value) {
      if (value !== "all") {
        sellingGames = sellingGames.filter((game) => game.platform === value);
      }
    }
    if (value2) {
      switch (value2) {
        case "all":
          break;
        case "0-30":
          sellingGames = sellingGames.filter((game) => game.price < 30);
          break;
        case "30-60":
          sellingGames = sellingGames.filter(
            (game) => game.price >= 30 && game.price < 60
          );
          break;
        case "60+":
          sellingGames = sellingGames.filter((game) => game.price >= 60);
        default:
          break;
      }
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
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownBox}
        onChangeValue={() => {
          filter();
        }}
        zIndex={10000}
        zIndexInverse={10000}
      />
      <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        placeholder="Price"
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownBox}
        onChangeValue={() => {
          filter();
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
    height: 50,
    marginTop: 20,
    borderRadius: 10,
  },
  dropDown: {
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
  },
  dropDownBox: {
    marginLeft: "9%",
    width: "80%",
    borderWidth: 0,
  },
  dropDownItem: {
    borderBottomWidth: 2,
    borderColor: "#dddddd",
  },
});
