import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type PlacedChordProps = {
  chord: string;
  position: { x: number; y: number };
  onRemove?: () => void;
};

export default function PlacedChord({
  chord,
  position,
  onRemove,
}: PlacedChordProps) {
  return (
    <View
      style={[
        styles.container,
        { left: position.x - 20, top: position.y - 15 },
      ]}
    >
      <TouchableOpacity onLongPress={onRemove}>
        <Text style={styles.chordText}>{chord}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1000,
    backgroundColor: "#fff5e6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f39c12",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  chordText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d35400",
  },
});
