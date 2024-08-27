import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import ContainsInfo from "./components/ContainsInfo.js"

export default function App() {
  const [data, setData] = useState([])
  const pokeUrl = "https://pokeapi.co/api/v2"
  const endPoint = "/pokemon"

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetch(`${pokeUrl}${endPoint}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
      })
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Pokedex</Text>
        {data.map((data) => (
          <View >
            <ContainsInfo data={data} />
          </View>
        ))}
        <StatusBar style='auto' />
      </View>
    </ScrollView>
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
