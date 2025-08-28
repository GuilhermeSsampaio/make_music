import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

export type StoredChord = { id: string; chord: string; x: number; y: number };
export type Composition = {
  id: string;
  title: string;
  lyrics: string;
  chords: StoredChord[];
  createdAt: number;
  updatedAt: number;
};

interface CompositionsContextType {
  compositions: Composition[];
  addComposition: (
    data: Omit<Composition, "id" | "createdAt" | "updatedAt">
  ) => Composition;
  updateComposition: (
    id: string,
    patch: Partial<Omit<Composition, "id">>
  ) => void;
  removeComposition: (id: string) => void;
  getComposition: (id: string) => Composition | undefined;
}

const CompositionsContext = createContext<CompositionsContextType | undefined>(
  undefined
);

export const CompositionsProvider = ({ children }: { children: ReactNode }) => {
  const [compositions, setCompositions] = useState<Composition[]>([]);

  const addComposition: CompositionsContextType["addComposition"] = useCallback(
    (data) => {
      const now = Date.now();
      const newComp: Composition = {
        id: now.toString(),
        title: data.title || "Sem título",
        lyrics: data.lyrics || "",
        chords: data.chords || [],
        createdAt: now,
        updatedAt: now,
      };
      setCompositions((prev) => [newComp, ...prev]);
      return newComp;
    },
    []
  );

  const updateComposition: CompositionsContextType["updateComposition"] =
    useCallback((id, patch) => {
      setCompositions((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, ...patch, updatedAt: Date.now() } : c
        )
      );
    }, []);

  const removeComposition: CompositionsContextType["removeComposition"] =
    useCallback((id) => {
      setCompositions((prev) => prev.filter((c) => c.id !== id));
    }, []);

  const getComposition: CompositionsContextType["getComposition"] = useCallback(
    (id) => {
      return compositions.find((c) => c.id === id);
    },
    [compositions]
  );

  return (
    <CompositionsContext.Provider
      value={{
        compositions,
        addComposition,
        updateComposition,
        removeComposition,
        getComposition,
      }}
    >
      {children}
    </CompositionsContext.Provider>
  );
};

export const useCompositions = () => {
  const ctx = useContext(CompositionsContext);
  if (!ctx)
    throw new Error("useCompositions must be used within CompositionsProvider");
  return ctx;
};
