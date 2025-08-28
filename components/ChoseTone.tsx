// ...existing code...
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

export default function ChoseTone() {
  const [selectedTone, setSelectedTone] = useState("C");

  return (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={selectedTone}
        onValueChange={(itemValue: string) => setSelectedTone(itemValue)}
        style={styles.picker}
        dropdownIconColor="#2c3e50" // Android
        mode="dropdown"
      >
        <Picker.Item label="C" value="C" />
        <Picker.Item label="D" value="D" />
        <Picker.Item label="E" value="E" />
        <Picker.Item label="F" value="F" />
        <Picker.Item label="G" value="G" />
        <Picker.Item label="A" value="A" />
        <Picker.Item label="B" value="B" />
        <Picker.Item label="Am" value="Am" />
        <Picker.Item label="Bm" value="Bm" />
      </Picker>
      {Platform.OS !== "android" && (
        <Text style={styles.customArrow} pointerEvents="none">
          ▼
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 40,
    position: "relative",
    justifyContent: "center",
  },
  picker: {
    width: "100%",
    height: 80,
    paddingRight: 28,
  },
  customArrow: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    textAlignVertical: "center",
    color: "#2c3e50",
    fontSize: 14,
    includeFontPadding: false,
  },
});
