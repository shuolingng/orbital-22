import React, {useEffect, useState} from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  Linking
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";




  /*async function getRecipes() { 
    const APP_ID = "463aef33";
    const APP_KEY = "511c93a709034c9d04dd796ad29959f9";
    const [recipes, setRecipes] = useState([]);
    const response = await fetch(
      'https://api.edamam.com/search?q=chicken&app_id=463aef33&app_key=511c93a709034c9d04dd796ad29959f9'
      );
    const data = await response.json();
    return data.hits;
    setRecipes(data.hits);
  }; */
/*
  useEffect(() => {
    // declare the async data fetching function
    setIsLoading(true);
    const getRecipes = async () => {
      // get the data from the api
    const response = await fetch(
      'https://api.edamam.com/search?q=chicken&app_id=463aef33&app_key=511c93a709034c9d04dd796ad29959f9'
    ).then(setIsLoading(false))
      // convert data to json
    const data = await response.json();
    console.log(data);
    setRecipes(data.hits);
    return data.hits;
    }
    // call the function
    const recipes = getRecipes()
      .catch(err => {
        setIsLoading(false);
        setError(err)
        console.error()
      });
    }, [])

  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Please check your network connection!
        </Text>
      </View>
    );
  }
  /* ;

  useEffect(() => { 
    setIsLoading(true);
    fetch('https://api.edamam.com/search?q=chicken&app_id=463aef33&app_key=511c93a709034c9d04dd796ad29959f9')
    .then(data => response.json())
    .then(data => console.log(data))
    .then(recipes => {
      setData(data.hits);
      setIsLoading(false);
    })
    .catch(err => {
      setIsLoading(false);
      setError(err);
      console.error();
    });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Please check your network connection!
        </Text>
      </View>
    );
  }


  const renderItem = ({ item }) => (
    <View item = {item.uri}>
      <Text>{styles.text}{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recipes</Text>
      <FlatList
        data={recipes}
        keyExtractor={item => item.label}
        renderItem={ renderItem } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }  
});

*/

export default function RecipeScreen() {

  const data = [
    { id: '1', title: 'Chicken Alfredo', link : "https://www.delish.com/cooking/recipe-ideas/a53695/one-pot-chicken-alfredo-recipe/"},
    { id: '2', title: 'Chocolate Chip Cookies', link : "https://joyfoodsunshine.com/the-most-amazing-chocolate-chip-cookies/"},
    { id: '3', title: 'Japanese Chicken Curry', link : "https://www.justonecookbook.com/simple-chicken-curry/"},
    { id: '4', title: 'Classic Waffles', link: "https://www.allrecipes.com/recipe/20513/classic-waffles/"},
    { id: '5', title: 'Spaghetti Aglio e Oglio', link : "https://www.foodnetwork.com/recipes/ina-garten/spaghetti-aglio-e-olio-recipe-2043225"},
    { id: '6', title: 'Brownies', link : "https://thestayathomechef.com/brownie-recipe/"},
    { id: '7', title: 'Katsudon', link : "https://www.justonecookbook.com/katsudon/"},
    { id: '8', title: 'Pesto Pasta', link: "https://www.allrecipes.com/recipe/11887/pesto-pasta/"},
  ];



  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity 
              onPress = {() => Linking.openURL(item.link)}>
              <Text style={styles.listItemText}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'darkseagreen',
    width: '100%',
    color: "white"
  },
  listItemText: {
    fontSize: 18
  }
});