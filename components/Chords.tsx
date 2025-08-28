import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";

export default function Chords({
  toneProp,
  harmonicFieldProp,
}: {
  toneProp: any;
  harmonicFieldProp: any;
}) {
  console.log(toneProp);
  const [chords, setChords] = useState([]);
  const [tone, setTone] = useState("C");
  const [harmonicField, setHarmonicField] = useState("Major");

  return <Text style={styles.chord}>{toneProp}</Text>;
}

const styles = StyleSheet.create({
  chord: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    margin: 10,
  },
});
