import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import Header from '../components/header';
import FoodItem from '../components/foodItem';
import AddFoodItem from '../components/addFoodItem';

export default function GroceryScreen() {
    const [foodlist, setFoodlist] = useState([
        { text: 'apples', key :'1'},
        { text: 'eggs', key :'2'},
        { text: 'bananas', key :'3'},
        { text: 'rice', key :'4'},
    ]);

    const pressHandler = (key) => {
        setFoodlist((prevFoodlist) => {
            return prevFoodlist.filter(foodlist => foodlist.key != key);
        });
    }

    const submitHandler = (text) => {

        if (text.length > 0) { 
            setFoodlist((prevFoodlist) => {
                return [
                    { text: text, key: Math.random().toString() },
                    ...prevFoodlist
                ];
            });
        } else {
            Alert.alert('oops!', 'please key in a food item!', [
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
        }     
    }

    return (
        <View style={styles.container}>
            <View style = {styles.content}>
                <AddFoodItem submitHandler = {submitHandler}/>
                <View style = {styles.list}>
                    <FlatList 
                        data={foodlist}
                        renderItem = {({ item }) => (
                            <FoodItem item={item} pressHandler = {pressHandler} />
                        )}
                    />

                </View>
            </View>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    content: {
        padding: 40,
    },

    list: {
        marginTop: 20,
    }
})