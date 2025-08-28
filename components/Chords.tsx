import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Chords({
  toneProp,
  degreeProp,
}: {
  toneProp: any;
  degreeProp: any;
}) {
  return (
    <Text style={styles.chord}>
      {degreeProp}
      {toneProp}
    </Text>
  );
}

const styles = StyleSheet.create({
  chord: {
    fontSize: 20, // Reduzido de 24 para 20
    fontWeight: "bold",
    color: "#333",
    margin: 2,
  },
});
