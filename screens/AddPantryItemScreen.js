import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import DropDownPicker from "react-native-dropdown-picker";

export default function AddPantryItemScreen() {
    const user = supabase.auth.user();
    const [date, setDate] = useState(new Date());
    const [food, setFood] = useState("");
    const [category, setCategory] = useState(null);
    const [items, setItems] = useState([
        {label: "Fruits and Vegetables", value: "Fruits and Vegetables"},
        {label: "Meats", value: "Meats"},
        {label: "Dairy", value: "Dairy"},
        {label: "Grains", value: "Grains"},
        {label: "Other", value: "Other"},
    ]);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateText, setDateText] = useState('Click on the button to set an expiry date');

    const navigation = useNavigation();

    const addPantryItem = async (food, date, category) => {
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
    };

    const submitHandler = (food, date, category) => {
        addPantryItem(food, date, category);
        navigation.navigate("PantryList");
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDateText("This food expires on " + fDate);
        
        console.log(fDate);
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Enter the name of the food item, its expiry date, and food category </Text>
                <TextInput
                style = {styles.input}
                placeholder = 'new food item...'
                onChangeText = {(text) => setFood(text)}
                />
                <Text> {dateText} </Text>
                <View style={styles.expirybutton}>
                    <Button title="Change expiry date" onPress={() => setShow(true)} color="darkseagreen" />
                </View>

                <View>
                    <DropDownPicker
                        open={open}
                        value={category}
                        items={items}
                        setOpen={setOpen}
                        setValue={setCategory}
                        setItems={setItems}
                    />
                </View>
                
                <View style={styles.expirybutton}>
                    <Button title="Add food item" onPress={() => submitHandler(food, date, category)} color="darkseagreen" />
                </View>
            </View>
            
            {show && (
            <DateTimePicker
            testID='dateTimePicker'
            value={date}
            onChange={onChange}
            />)}

            
        </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },

    list: {
        marginTop: 20,
    },

    content: {
        padding: 40,
    },

    expirybutton: {
        marginTop: 15,
        marginBottom: 15,
    }
})