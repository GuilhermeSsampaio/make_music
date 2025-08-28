import { useCompositions } from "@/context/CompositionsContext";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import MusicEditor from "../components/MusicEditor";

export default function Composition() {
  const params = useLocalSearchParams();
  const { getComposition } = useCompositions();
  const idParam = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string | undefined);
  const comp = useMemo(
    () => (idParam ? getComposition(idParam) : undefined),
    [idParam, getComposition]
  );
  return <MusicEditor letra={comp?.lyrics} initialChords={comp?.chords} />;
}
