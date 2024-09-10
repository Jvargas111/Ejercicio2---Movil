import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import ContainsInfo from "./components/ContainsInfo.js"

export default function App() {
  const [data, setData] = useState([])
  const [next, setNext] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const pokeUrl = "https://pokeapi.co/api/v2"
  const endPoint = "/pokemon"

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(`${pokeUrl}${endPoint}`)
      .then((response) => response.json())
      .then((data) => {
        const pokemonDetails = data.results.map((pokemon) => {
          return fetch(pokemon.url)
            .then((response) => response.json())
            .then((details) => {
              return {
                name: pokemon.name,
                image: details.sprites.front_default, 
              }
            })
        })

        Promise.all(pokemonDetails).then((results) => {
          setData(results)
          setNext(data.next)
        })
      })
  }

  const loadMore = () => {
    if (next && !isLoadingMore) {
      setIsLoadingMore(true)
      fetch(next)
        .then((response) => response.json())
        .then((data) => {
          const pokemonDetails = data.results.map((pokemon) => {
            return fetch(pokemon.url)
              .then((response) => response.json())
              .then((details) => {
                return {
                  name: pokemon.name,
                  image: details.sprites.front_default, // Obtén la imagen del Pokémon
                }
              })
          })

          Promise.all(pokemonDetails)
            .then((results) => {
              setData((prevPokemon) => [...prevPokemon, ...results])
              setNext(data.next)
              setIsLoadingMore(false)
            })
            .catch(() => {
              setIsLoadingMore(false)
            })
        })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <ContainsInfo data={item} />
          </View>
        )}
        keyExtractor={(item, index) => item.name + index}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={isLoadingMore ? <Text>Cargando...</Text> : null}
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    backgroundColor: "red",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 15,
    color: "white",
    fontFamily: "bold",
  },
})
