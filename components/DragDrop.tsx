import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";
import Chords from "./Chords";

export default function DragDrop() {
  // Obtém as dimensões da tela para definir limites
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // Estado para rastrear a posição atual do acorde
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // Limites ajustados para permitir arrastar para o editor de texto
  // Agora configuramos para permitir que os acordes sejam arrastados para fora da área
  // de DragDrop e alcançar a área do editor de texto
  const bounds = {
    top: 0,
    left: 0,
    bottom: windowHeight - 100,
    right: windowWidth - 60,
  };

  return (
    <View style={styles.container}>
      <View style={styles.dragArea}>
        <Text style={styles.instruction}>
          Arraste os acordes para o texto da sua música
        </Text>

        <View style={styles.chordsRow}>
          {["C", "D", "E", "F", "G", "A", "B"].map((tone, index) => (
            <Draggable
              key={tone}
              x={50 + ((index * 80) % (windowWidth - 150))}
              y={60 + Math.floor((index * 80) / (windowWidth - 150)) * 60}
              renderSize={60}
              renderColor="transparent"
              isCircle={false}
              onDragRelease={(e, gestureState, bounds) => {
                console.log("Acorde arrastado:", tone);
              }}
              onDrag={() => console.log("start drag")}
              onRelease={() => console.log("release drag")}
              onPressIn={() => console.log("press in")}
              onPressOut={() => console.log("press out")}
              // Configurar para ficar sempre na frente
              z={9999}
            >
              <View style={styles.chordContainer}>
                <Chords toneProp={tone} harmonicFieldProp={"MAJOR"} />
              </View>
            </Draggable>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  dragArea: {
    width: "100%",
    minHeight: 180,
    backgroundColor: "#e8f4ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c0d6e9",
    borderStyle: "dashed",
    padding: 8,
    position: "relative",
  },
  chordsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginTop: 10,
    height: 120,
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  chordContainer: {
    minWidth: 55,
    minHeight: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 20, // Aumentado para garantir que fique no topo
    zIndex: 9999, // Valor alto para garantir que fique em primeiro plano
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    position: "relative", // Importante para o z-index funcionar corretamente
  },
});
