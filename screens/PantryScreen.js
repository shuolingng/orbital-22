import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Alert, Button } from 'react-native';
import PantryItem from '../components/pantryItem';
import { supabase } from '../lib/supabase';
import 'react-native-url-polyfill';
import callGoogleVisionAsync from '../components/googleVision';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useNavigation } from '@react-navigation/native';


export default function PantryScreen() {
    const user = supabase.auth.user();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [foodname, setFoodname] = useState('');
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [category, setCategory] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        getPantrylist();
        return () => {
            setData([]);
        };
    }, []);

    async function getPantrylist() {
        try {
            let { data: pantrylist, error } = await supabase
                .from("pantrylist")
                .select("name, id, expiry_date, category")
                .eq("user_id", user.id);
            
            if (error) throw error;

            setData([]);

            pantrylist.map((pantry) => {
                setData((prevPantrylist) => {
                    return [
                        {
                            id: pantry.id,
                            expiry_date: pantry.expiry_date,
                            name: pantry.name,
                            category: pantry.category
                        },
                        ...prevPantrylist,
                    ];
                });
            });
        } catch (error) {
            Alert.alert(error.message);
        };
    };

    const deletePantry = async (item) => {
        setLoading(true);
        try {
            let { data, error } = await supabase
                .from("pantrylist")
                .delete()
                .match({ id: item.id });
            
            if (error) throw error;
        } catch (error) {
            Alert.alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const pressHandler = (item) => {
        deletePantry(item);
        getPantrylist();
    }

    return (
        <View style={styles.container}>
            <View style = {styles.content}>
                <Button onPress = {() => navigation.navigate("Add Pantry Item")} title='add food item' color="darkseagreen" />    
                <View style ={styles.space} />
                <Button onPress = {() => navigation.navigate("Add Receipt Item")} title='scan your receipt' color="darkseagreen" />
                <View style ={styles.space} />            
                <View style = {styles.list}>
                    <FlatList
                        data={data}
                        renderItem = {({ item }) => (
                            <PantryItem item={item} pressHandler={pressHandler} />
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
    },

    space: {
      width: 30, // or whatever size you need
      height: 30,
    },
})