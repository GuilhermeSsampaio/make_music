import { useCompositions } from "@/context/CompositionsContext";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ChordTag from "./ChordTag";
import ChoseTone from "./ChoseTone";
import DragDrop from "./DragDrop";
import TextEditor from "./TextEditor";

type MusicEditorProps = {
  letra?: string;
  initialChords?: PlacedChord[]; // acordes carregados de composição existente
};

type PlacedChord = {
  id: string;
  chord: string;
  x: number;
  y: number;
};

// Inner editor que consome o contexto
function MusicEditorInner({ letra, initialChords }: MusicEditorProps) {
  const [chords, setChords] = useState<PlacedChord[]>(
    () => initialChords || []
  );
  const [dragging, setDragging] = useState(false);
  const [lyrics, setLyrics] = useState<string>(letra || "");
  const [title, setTitle] = useState<string>("Sem título");
  const editorSectionRef = useRef<View>(null);
  const editorBoxMetrics = useRef<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const { addComposition, compositions } = useCompositions();

  const handleChordDrop = (chord: string, pageX: number, pageY: number) => {
    const metrics = editorBoxMetrics.current;
    if (!metrics) return;
    const TAG_WIDTH = 36;
    const TAG_HEIGHT = 28;
    let relX = pageX - metrics.x - TAG_WIDTH / 2;
    let relY = pageY - metrics.y - TAG_HEIGHT / 2;
    const maxX = metrics.width - TAG_WIDTH;
    const maxY = metrics.height - TAG_HEIGHT;
    relX = Math.min(Math.max(relX, 0), maxX);
    relY = Math.min(Math.max(relY, 0), maxY);
    setChords((prev) => [
      ...prev,
      { id: Date.now().toString(), chord, x: relX, y: relY },
    ]);
  };

  const handleRemoveChord = (id: string) =>
    setChords((prev) => prev.filter((c) => c.id !== id));
  const updateChordPosition = (id: string, x: number, y: number) =>
    setChords((prev) => prev.map((c) => (c.id === id ? { ...c, x, y } : c)));

  const handleSave = () => {
    const saved = addComposition({
      title: title.trim() || "Sem título",
      lyrics,
      chords: chords.map((c) => ({ id: c.id, chord: c.chord, x: c.x, y: c.y })),
    });
    Alert.alert("Salvo", `Composição salva: ${saved.title}`);
  };

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      nestedScrollEnabled={true}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
    >
      <LinearGradient
        colors={["#599ecbff", "#3498db", "#1228cbff"]}
        style={styles.header}
      />
      <View style={styles.editorContainer}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleLabel}>Título:</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Digite o título"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#888"
          />
        </View>
        <View style={styles.toneSelectorContainer}>
          <Text style={styles.toneLabel}>Tom:</Text>
          <View style={styles.toneSelectWrapper}>
            <ChoseTone />
          </View>
        </View>
        <View style={[styles.section, styles.chordPalette]}>
          <Text style={styles.sectionTitle}>Paleta de Acordes</Text>
          <DragDrop onChordDrop={handleChordDrop} />
        </View>
        <View
          ref={editorSectionRef}
          style={[styles.section, styles.textEditorSection]}
        >
          <TextEditor
            letra={lyrics}
            chords={chords}
            onLyricsChange={setLyrics}
            onEditorBoxLayout={(m) => {
              editorBoxMetrics.current = m;
            }}
            textInputEditable={!dragging}
          />
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </Pressable>
          {compositions.length > 0 && (
            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>Últimas composições:</Text>
              {compositions.slice(0, 3).map((c) => (
                <Text key={c.id} style={styles.previewItem}>
                  • {c.title} ({c.chords.length} acordes)
                </Text>
              ))}
            </View>
          )}
          {chords.map((c) => (
            <ChordTag
              key={c.id}
              chord={c.chord}
              position={{ x: c.x, y: c.y }}
              draggable
              onDragStart={() => setDragging(true)}
              onDragEnd={() => setDragging(false)}
              onPositionChange={(nx, ny) => updateChordPosition(c.id, nx, ny)}
              onRemove={() => handleRemoveChord(c.id)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Exporta apenas o editor; providers estão aplicados no _layout global
export default function MusicEditor(props: MusicEditorProps) {
  return <MusicEditorInner {...props} />;
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#3498db",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  editorContainer: {
    width: "100%",
    padding: 16,
    gap: 16,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 5,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  chordPalette: {
    zIndex: 5,
    elevation: 4,
    height: 200,
  },
  textEditorSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    minHeight: 300,
    zIndex: 1,
    position: "relative",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#2c3e50",
  },
  selec_tone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    width: 200,
  },
  toneSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 6,
    paddingLeft: 12,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "auto",
  },
  toneLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginRight: 10, // antes 15
  },
  toneSelectWrapper: {
    maxWidth: 120,
    width: 120,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    position: "relative",
    justifyContent: "center",
    overflow: "hidden",
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    gap: 8,
  },
  titleLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f7f9fa",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#333",
  },
  previewBox: {
    marginTop: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 4,
  },
  previewTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginBottom: 4,
  },
  previewItem: {
    fontSize: 13,
    color: "#555",
  },
  saveButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    backgroundColor: "#f47a38",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
