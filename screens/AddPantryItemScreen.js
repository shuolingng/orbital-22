import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function AddPantryItemScreen() {
    const [date, setDate] = useState(new Date());
    const [food, setFood] = useState("");
    const [show, setShow] = useState(false);
    const [dateText, setDateText] = useState('Click on the button to set an expiry date');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDateText("This food expires on " + fDate);
        
        console.log(fDate);
    }

    const navigation = useNavigation();

    const goToPantryList = () => {
        navigation.navigate('PantryList', {
            food, date
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text> Enter the name of the food item and its expiry date </Text>
                <TextInput
                style = {styles.input}
                placeholder = 'new food item...'
                onChange = {(foodName) => setFood(foodName)}
                />
                <Text> {dateText} </Text>
                <View style={styles.expirybutton}>
                    <Button title="Change expiry date" onPress={() => setShow(true)} color="darkseagreen" />
                </View>

                <View style={styles.expirybutton}>
                    <Button title="Add food item" onPress={goToPantryList} color="darkseagreen" />
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

/*  
    const submitHandler = (food, date) => {
        if (food.length > 0) { 
            setFoodlist((prevFoodlist) => {
                return [
                    { text: food, key: Math.random().toString(), date: date },
                    ...prevFoodlist
                ];
            });
        } else {
            Alert.alert('oops!', 'please key in a food item!', [
                {text: 'Understood', onPress: () => console.log('alert closed')}
            ]);
        }     
    }
*/
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