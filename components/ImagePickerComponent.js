import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Image, View, Text, Alert, FlatList, TouchableOpacity, Linking } from "react-native";
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ImagePickerComponent({ onSubmit }) {
    const user = supabase.auth.user()
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
        });

        if (!result.cancelled) {
            setImage(result.uri);
            const responseData = await onSubmit(result.base64);
            setText(responseData.text.split(/\r?\n/));
            console.log(text)
        }
    }

    const addRecipeItem = async (food) => {
        const date = new Date();
        const newDate = date.setDate(date.getDate() + 5)
        const category = "Other"
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from("pantrylist")
                .insert([
                    { expiry_date: date, name: food, user_id: user.id, category: category }
                ])
                .single();
            if (error) throw error;
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        };
        console.log(food)
    }

    return (
        <View style={styles.container}>
            <Button title="Scan a receipt" onPress={pickImage} color='darkseagreen' />
            <FlatList
                style={styles.list}
                data={text}
                renderItem={({ item }) => (
                    <Text style={styles.item} onPress={() => addRecipeItem(item)}>{item}</Text>)}
            />
        </View>
    ); 

}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop:16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10
    },

    list: {
        marginTop: 20,
    },
})
