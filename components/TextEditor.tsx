import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TextEditorProps = {
  letra?: string;
  chords?: PlacedChord[];
  onChordPlaced?: (chord: PlacedChord) => void;
  onEditorBoxLayout?: (box: {
    x: number;
    y: number;
    width: number;
    height: number;
    paddingLeft: number;
    paddingTop: number;
  }) => void;
  textInputEditable?: boolean;
  onLyricsChange?: (text: string) => void;
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
  onEditorBoxLayout,
  textInputEditable = true,
  onLyricsChange,
}: TextEditorProps) {
  const [lyrics, setLyrics] = useState(letra || "");
  const editorBoxRef = useRef<View | null>(null);

  // Ao montar / layout, mede a posição absoluta do box onde os acordes vivem
  const handleEditorBoxLayout = () => {
    if (editorBoxRef.current) {
      // measureInWindow dá coordenadas absolutas (pageX/pageY)
      editorBoxRef.current.measureInWindow((x, y, width, height) => {
        onEditorBoxLayout?.({
          x,
          y,
          width,
          height,
          // Padding usado no style.textInput
          paddingLeft: 12,
          paddingTop: 12,
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Letra da Música</Text>
      <View
        ref={editorBoxRef}
        style={styles.editorBox}
        onLayout={handleEditorBoxLayout}
      >
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Digite a letra da sua música aqui..."
          value={lyrics}
          onChangeText={(t) => {
            setLyrics(t);
            onLyricsChange?.(t);
          }}
          textAlignVertical="top"
          editable={textInputEditable}
          pointerEvents={textInputEditable ? "auto" : "none"}
        />
        {/* A renderização dos acordes é feita no MusicEditor para controle centralizado */}
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
