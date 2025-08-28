import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ChoseTone from "./ChoseTone";
import DragDrop from "./DragDrop";
import TextEditor from "./TextEditor";

export default function MusicEditor() {
  return (
    <ScrollView
      style={styles.scrollContainer}
      contentContainerStyle={styles.contentContainer}
      nestedScrollEnabled={true}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={true}
    >
      <LinearGradient
        colors={["#255b80ff", "#3498db", "#48a6e8"]}
        style={styles.header}
      >
        <Text style={styles.title}>Editor de Música</Text>
      </LinearGradient>

      <View style={styles.editorContainer}>
        {/* Escolha de Tom */}
        <View style={styles.toneSelectorContainer}>
          <Text style={styles.toneLabel}>Tom:</Text>
          <View style={styles.toneSelectWrapper}>
            <ChoseTone />
          </View>
        </View>

        {/* Paleta de Acordes */}
        <View style={[styles.section, styles.chordPalette]}>
          <Text style={styles.sectionTitle}>Paleta de Acordes</Text>
          <DragDrop />
        </View>

        {/* Editor de Texto */}
        <View style={[styles.section, styles.textEditorSection]}>
          {/* <Text style={styles.sectionTitle}>Editor de Texto</Text> */}
          <TextEditor />
        </View>
      </View>
    </ScrollView>
  );
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
});
