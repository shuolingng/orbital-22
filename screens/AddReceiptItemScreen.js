import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Alert, Button } from 'react-native';
import PantryItem from '../components/pantryItem';
import { supabase } from '../lib/supabase';
import 'react-native-url-polyfill';
import callGoogleVisionAsync from '../components/googleVision';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useNavigation } from '@react-navigation/native';

export default function AddReceiptItemScreen(){
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <ImagePickerComponent onSubmit={callGoogleVisionAsync} title='scan receipt' color="darkseagreen" />
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
})