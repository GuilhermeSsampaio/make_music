import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View } from "react-native";

export default function ChoseTone() {
  const [selectedTone, setSelectedTone] = useState("C");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <Picker
        selectedValue={selectedTone}
        onValueChange={(itemValue: string) => setSelectedTone(itemValue)}
        style={{ height: 50, width: 150 }}
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
      ;
    </View>
  );
}
