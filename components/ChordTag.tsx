import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";

interface ChordTagProps {
  chord: string;
  position?: { x: number; y: number };
  draggable?: boolean;
  onPositionChange?: (x: number, y: number) => void;
  onRemove?: () => void;
}

export default function ChordTag({
  chord,
  position = { x: 0, y: 0 },
  draggable = false,
  onPositionChange,
  onRemove,
}: ChordTagProps) {
  if (!draggable) {
    return (
      <View
        style={[
          styles.chordTag,
          position && {
            position: "absolute",
            left: position.x,
            top: position.y,
          },
        ]}
      >
        <Text style={styles.chordText}>{chord}</Text>
        {onRemove && (
          <Text style={styles.removeButton} onPress={onRemove}>
            ×
          </Text>
        )}
      </View>
    );
  }
  return (
    <Draggable
      x={position.x}
      y={position.y}
      renderSize={36}
      renderColor="transparent"
      isCircle={false}
      onDragRelease={(e: any, gestureState: any) => {
        if (onPositionChange) {
          onPositionChange(
            position.x + gestureState.dx,
            position.y + gestureState.dy
          );
        }
      }}
      z={800}
    >
      <View style={styles.chordTag}>
        <Text style={styles.chordText}>{chord}</Text>
        {onRemove && (
          <Text style={styles.removeButton} onPress={onRemove}>
            ×
          </Text>
        )}
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
    flexDirection: "row",
    position: "relative",
  },
  chordText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#ff4444",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 4,
  },
});
