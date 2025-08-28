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
      // Importante: Adicionar este prop para que eventos de toque passem para os elementos filhos
      pointerEvents="box-none"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Editor de Música</Text>
      </View>

      <View style={styles.editorContainer}>
        {/* Escolha de Tom */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha de Tom</Text>
          <ChoseTone />
        </View>

        {/* Paleta de Acordes - Agora posicionada ANTES do editor de texto */}
        <View style={[styles.section, styles.chordPalette]}>
          <Text style={styles.sectionTitle}>Paleta de Acordes</Text>
          <DragDrop />
        </View>

        {/* Editor de Texto - Agora vem DEPOIS da paleta de acordes */}
        <View style={[styles.section, styles.textEditorSection]}>
          <Text style={styles.sectionTitle}>Editor de Texto</Text>
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
    width: "100%",
    padding: 16,
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
    zIndex: 1,
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  chordPalette: {
    zIndex: 10, // Maior z-index para os acordes ficarem acima
    elevation: 5,
  },
  //   textEditorSection: {
  //     minHeight: 300,
  //     zIndex: 1, // Menor z-index
  //     elevation: 2,
  //   },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2c3e50",
  },

  textEditorSection: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Menor que o chordPalette
    width: "100%",
    minHeight: 300,
    zIndex: 1, // Menor z-index para ficar abaixo
    position: "relative", // Importante para o z-index funcionar
  },
});
