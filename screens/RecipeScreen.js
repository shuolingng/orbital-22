import React, {useEffect, useState} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Linking,
  TextInput,
  Keyboard
} from "react-native";
import { TouchableOpacity } from "react-native";

const RecipeScreen = () => {

  const API_ID = `463aef33`;
  const API_KEY = `511c93a709034c9d04dd796ad29959f9`;
  const API_URL =  `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}`
  const [recipes, setRecipes] = useState();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  async function getResponse() {
    setLoading(true);
    let response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}`);
    let data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
    Keyboard.dismiss();
    setSearchQuery('')
  }
  useEffect(()=> {
    setLoading(true)
    getResponse()
  }, [])

  return (
    <View style={styles.container}>
      <View style = {{display: 'flex', flexDirection: 'row'}}>
        <TextInput placeholder="Search by ingredient"
          style={styles.inputField}
          onChangeText={onChangeSearch}
          value={searchQuery}
        />  
      </View>
      <TouchableOpacity style = {styles.button}
      onPress = {getResponse}
      title='Submit'>
        <Text style={styles.buttonText}>SEARCH</Text>
      </TouchableOpacity>
      <SafeAreaView style={{flex: 1}}>
        {loading ? <ActivityIndicator size = 'large' color="#008080"/> :
        <FlatList
          data={recipes}
          renderItem={({item}) => (
            <View style = {styles.recipe}>
              <TouchableOpacity onPress={() => Linking.openURL(`${item.recipe.url}`)}>
                <Image style = {styles.image}
                  source = {{ uri : `${item.recipe.image}`}}
                />
                <Text style = {styles.text}>{item.recipe.label}</Text>
              </TouchableOpacity>
            </View>   
          )}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          />}
      </SafeAreaView>
    </View>
  );

}  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 15,
    color: '#101010',
    marginTop: 5,
    padding: 5,
    width: '100%',
    textAlign: 'center'
  },
  button:{
    backgroundColor: "darkseagreen",
    width: '90%',
    alignItems: 'center',
    margin: 15,
    height: 35,
  },
  inputField: {
    height: '100%',
    width: '90%',
    backgroundColor: '#eaeaea',
    marginTop: 10,
    paddingLeft: 15,
    alignContent: 'space-around',
  },

  image: {
    width: '100%',
    height: 100,
  },
  
  buttonText:{
    fontSize: 15,
    color: 'white',
    padding: 7
  },
  recipe: {
    padding: 10,
    width: '33%',
    alignContent: 'space-between',
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  listItem: {
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 20,
    width: '100%',
    height: 200,
  }
});

export default RecipeScreen;