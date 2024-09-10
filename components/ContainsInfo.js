import { StyleSheet, Text, View, Image } from "react-native"

export default function ContainsInfo({ data }) {
  return (
    <View style={styles.containerA}>
      <Image source={{ uri: data.image }} style={styles.image} />
      <Text style={styles.text}>{data.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  containerA: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "yellow",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: "bold",
    textTransform: "uppercase",
  },
})
