import { useLocalSearchParams } from "expo-router";
import React from "react";
import MusicEditor from "../components/MusicEditor";

export default function Composition() {
  const { letra } = useLocalSearchParams();
  // letra pode ser string ou array dependendo da navegação
  const letraStr = Array.isArray(letra) ? letra[0] : letra;
  return <MusicEditor letra={letraStr} />;
}
