import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Alert, Button } from 'react-native';
import FoodItem from '../components/foodItem';
import { supabase } from '../lib/supabase';
import 'react-native-url-polyfill';

export default function GroceryScreen() {
    const user = supabase.auth.user();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        getGrocerylist();
        return () => {
            setData([]);
        };
    }, []);

    async function getGrocerylist() {
        try {
            let { data: grocerylist, error } = await supabase
                .from("grocerylist")
                .select("name, food_id")
                .eq("user_id", user.id);
            
            if (error) throw error;

            setData([]);

            grocerylist.map((grocery) => {
                setData((prevGrocerylist) => {
                    return [
                        {
                            food_id: grocery.food_id,
                            name: grocery.name,
                        },
                        ...prevGrocerylist,
                    ];
                });
            });
        } catch (error) {
            Alert.alert(error.message);
        };
    };

    const addGrocery = async (foodname) => {
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from("grocerylist")
                .insert([
                    { name: foodname, user_id: user.id }
                ])
                .single();
            if (error) throw error;
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        };
    };

    const deleteGrocery = async (item) => {
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from("grocerylist")
                .delete()
                .match({ food_id: item.food_id });
            
            if (error) throw error;
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const pressHandler = (item) => {
        deleteGrocery(item);
        getGrocerylist();
    }

    const submitHandler = (text) => {
        addGrocery(text);
        getGrocerylist();  
    }

    return (
        <View style={styles.container}>
            <View style = {styles.content}>
                <TextInput
                style = {styles.input}
                placeholder = 'new food item...'
                onChangeText = {(text) => setText(text)}
                />
                <Button onPress = {() => submitHandler(text)} title='add food item' color="darkseagreen" />
                <View style = {styles.list}>
                    <FlatList 
                        data={data}
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
    },

    input: {
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    }
})