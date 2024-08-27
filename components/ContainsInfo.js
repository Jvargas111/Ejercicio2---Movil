import { StyleSheet, Text, View } from "react-native"

export default function ContainsInfo({ data }) {
  return (
    <View style={styles.containerA}>
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

  text: {
    fontSize: 25,
    fontFamily: "bold",
    textTransform: "uppercase",
  },
})
