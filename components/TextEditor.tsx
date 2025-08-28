import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TextEditor() {
  const [lyrics, setLyrics] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Letra da Música</Text>
      <View style={styles.editorBox}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Digite a letra da sua música aqui..."
          value={lyrics}
          onChangeText={setLyrics}
          textAlignVertical="top"
        />
      </View>
      <Text style={styles.hint}>
        Arraste acordes para cima do texto para posicioná-los na sua música
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  editorBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#fff",
    minHeight: 200,
  },
  textInput: {
    padding: 12,
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    minHeight: 200,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
});
