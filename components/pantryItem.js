import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function PantryItem({ item, pressHandler }) {

    return (
        <TouchableOpacity onPress = {() => pressHandler(item)} style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Expiry date: {item.expiry_date}</Text>
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