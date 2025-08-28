import React, { useRef, useState } from "react";
import {
  LayoutRectangle,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ChordTag from "./ChordTag";

type TextEditorProps = {
  letra?: string;
  chords?: PlacedChord[];
  onChordPlaced?: (chord: PlacedChord) => void;
};

type PlacedChord = {
  id: string;
  chord: string;
  x: number;
  y: number;
};

export default function TextEditor({
  letra,
  chords = [],
  onChordPlaced,
}: TextEditorProps) {
  const [lyrics, setLyrics] = useState(letra || "");
  const editorPosition = useRef<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Letra da Música</Text>
      <View
        style={styles.editorBox}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          // Salvar a posição do editor para cálculos posteriores
          editorPosition.current = { x, y, width, height };
        }}
      >
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Digite a letra da sua música aqui..."
          value={lyrics}
          onChangeText={setLyrics}
          textAlignVertical="top"
        />
        {/* Renderiza os acordes posicionados */}
        {chords.map((chord) => (
          <ChordTag
            key={chord.id}
            chord={chord.chord}
            position={{ x: chord.x, y: chord.y }}
            onRemove={() => console.log("Remove chord:", chord.id)}
          />
        ))}
      </View>
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
    position: "relative", // Importante para posicionamento absoluto dos acordes
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
