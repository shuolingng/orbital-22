import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FoodItem({ item, pressHandler }) {

    return (
        <TouchableOpacity onPress = {() => pressHandler(item)}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop:16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    }
})