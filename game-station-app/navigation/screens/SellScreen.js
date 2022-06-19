import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput, ScrollView } from "react-native";
import { AppStateContext } from "../../AppStateContext";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default function SellScreen({ navigation }) {
    const [gameObj, setgameObj] = useState({
        picture_urls: null,
        title: null,
        postal_code: null,
        price: null,
        description: null,
        seller: {
            user_name: null,
            email: null,
            password: null,
        },
    });

    useEffect(() => {
        getPermissionAsync = async () => {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry we need the camera permission');
                }
            }
        }
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
                picture_urls: result.uri,
            }));
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={styles.scrollContainer}>
                <Text
                    onPress={() => navigation.navigate('Home')}
                    style={{ fontSize: 26, fontWeight: 'bold' }}>Sell Screen</Text>



                {gameObj.picture_urls && <Image source={{
                    uri: gameObj.picture_urls
                }} style={{
                    width: 200,
                    height: 200
                }} />}
                <Button
                    title={gameObj.picture_urls ? "Change to other image" : "Pick an image from album"}
                    onPress={_pickImage}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                        setgameObj((prev) => ({
                            ...prev,
                            title: val,
                        }));
                    }
                    }
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
                    }
                    }
                    value={gameObj.description}
                    placeholder="Product Description*"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                        setgameObj((prev) => ({
                            ...prev,
                            seller: {
                                user_name: val,
                            },
                        }));
                    }
                    }
                    value={gameObj.seller.user_name}
                    placeholder="Your Nick Name*"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                        setgameObj((prev) => ({
                            ...prev,
                            price: val,
                        }));
                    }
                    }
                    value={gameObj.price}
                    placeholder="Your Contact Email*"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                        setgameObj((prev) => ({
                            ...prev,
                            price: val,
                        }));
                    }
                    }
                    value={gameObj.price}
                    placeholder="Password For Editing(Please Remember It)*"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(val) => {
                        setgameObj((prev) => ({
                            ...prev,
                            price: val,
                        }));
                    }
                    }
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
                    }
                    }
                    value={gameObj.postal_code}
                    placeholder="Postal Code*"
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        borderColor: 'gray',
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
    },
    scrollContainer: {
        width: "100%",
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
    },

});