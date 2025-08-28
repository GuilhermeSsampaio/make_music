import { harmonicFields } from "@/constants/harmonicField";
import { useTone } from "@/context/ToneContext";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";

export default function DragDrop({
  onChordDrop,
}: {
  onChordDrop?: (chord: string, x: number, y: number) => void;
}) {
  // Obtém as dimensões da tela para definir limites
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { tone } = useTone();

  // Estado para armazenar as dimensões da área de arrastar
  const [dragAreaLayout, setDragAreaLayout] = useState({
    width: 0,
    height: 0,
  });

  // Estado para forçar re-render dos acordes
  const [key, setKey] = useState(0);

  // Definindo acordes disponíveis
  const availableChords = harmonicFields[tone] || [];

  // Valores constantes para tamanho dos acordes
  const CHORD_WIDTH = 40;
  const CHORD_HEIGHT = 30;
  const CHORD_MARGIN = 10;

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View
        style={styles.dragArea}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setDragAreaLayout({ width, height });
        }}
      >
        <Text style={styles.instruction}>
          Arraste os acordes para o texto da sua música
        </Text>

        <View style={styles.chordsRow}>
          {dragAreaLayout.width > 0 &&
            availableChords.map(({ chord, degree }, index) => {
              // Usar key para forçar re-render
              const totalChords = availableChords.length;
              const availableWidth = dragAreaLayout.width - 20;
              const itemsPerRow = Math.min(
                Math.floor(availableWidth / (CHORD_WIDTH + CHORD_MARGIN * 2)),
                totalChords
              );
              const rowCount = Math.ceil(totalChords / itemsPerRow);
              const totalRowWidth =
                itemsPerRow * (CHORD_WIDTH + CHORD_MARGIN * 2);
              const leftPadding = (availableWidth - totalRowWidth) / 2 + 10;
              const row = Math.floor(index / itemsPerRow);
              const col = index % itemsPerRow;
              const x =
                leftPadding +
                col * (CHORD_WIDTH + CHORD_MARGIN * 2) +
                CHORD_MARGIN;
              const availableHeight = 120;
              const totalContentHeight =
                rowCount * (CHORD_HEIGHT + CHORD_MARGIN * 2);
              const topPadding = (availableHeight - totalContentHeight) / 2;
              const y =
                topPadding +
                row * (CHORD_HEIGHT + CHORD_MARGIN * 2) +
                CHORD_MARGIN +
                10;

              return (
                <Draggable
                  key={`${chord}-${index}-${key}`}
                  x={x}
                  y={y}
                  renderSize={40}
                  renderColor="transparent"
                  isCircle={false}
                  onDragRelease={(e, gestureState) => {
                    if (onChordDrop) {
                      // Calcula a posição real considerando o scroll e o layout
                      const realX = e.nativeEvent.pageX;
                      const realY = e.nativeEvent.pageY;
                      onChordDrop(chord, realX, realY);
                      // Força re-render para resetar posição
                      setKey((prev) => prev + 1);
                    }
                  }}
                  z={9999}
                  shouldReverse={false}
                  onDrag={() => console.log("start drag")}
                  onRelease={() => console.log("release drag")}
                  onPressIn={() => console.log("press in")}
                  onPressOut={() => console.log("press out")}
                >
                  <View style={styles.chord}>
                    <Text style={styles.degreeText}>{degree}</Text>
                    <View style={styles.chordContainer}>
                      <Text style={styles.chordText}>{chord}</Text>
                    </View>
                  </View>
                </Draggable>
              );
            })}
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
    minHeight: 160,
    backgroundColor: "#e8f4ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c0d6e9",
    borderStyle: "dashed",
    padding: 4,
    position: "relative",
  },
  chordsRow: {
    width: "100%",
    height: 80,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: -8,
    textAlign: "center",
  },
  chord: {
    alignItems: "center",
    justifyContent: "center",
  },
  chordContainer: {
    minWidth: 40,
    minHeight: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
    zIndex: 9999,
    padding: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  degreeText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  chordText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
