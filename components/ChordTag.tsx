import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";

interface ChordTagProps {
  chord: string;
  position: { x: number; y: number };
  onPositionChange?: (x: number, y: number) => void;
}

export default function ChordTag({
  chord,
  position,
  onPositionChange,
}: ChordTagProps) {
  return (
    <Draggable
      x={position.x}
      y={position.y}
      renderSize={36}
      renderColor="transparent"
      isCircle={false}
      onDragRelease={(e, gestureState) => {
        // Atualiza a posição quando o usuário reposiciona a cifra
        if (onPositionChange) {
          onPositionChange(
            position.x + gestureState.dx,
            position.y + gestureState.dy
          );
        }
      }}
      z={800} // Alto, mas não tão alto quanto os acordes originais
    >
      <View style={styles.chordTag}>
        <Text style={styles.chordText}>{chord}</Text>
      </View>
    </Draggable>
  );
}

const styles = StyleSheet.create({
  chordTag: {
    backgroundColor: "#f47a38", // Laranja similar ao CifraClub
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  chordText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
