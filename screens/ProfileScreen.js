import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import Header from '../components/header';


export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <Header />
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