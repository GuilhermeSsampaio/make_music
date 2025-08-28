import React, { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Compositions() {
  const chords = ["C", "G", "Am", "F", "D", "Em", "Bm", "E"]; // acordes disponíveis e ampliados
  const [placedChords, setPlacedChords] = useState<
    { chord: string; x: number; y: number; id: string }[]
  >([]); // acordes arrastados e soltos

  // Lista de acordes sendo arrastados simultaneamente
  const [draggingChords, setDraggingChords] = useState<
    { chord: string; id: string; pan: Animated.ValueXY }[]
  >([]);

  const [lyrics, setLyrics] = useState([
    ["Hoje", "o", "sol", "apareceu"],
    ["Trouxe", "luz", "ao", "coração"],
    ["Vou", "cantar", "a", "vida", "inteira"],
    ["Com", "amor", "na", "canção"],
  ]);

  // Referência ao ScrollView para ajustar o scroll ao editar texto
  const scrollViewRef = useRef<ScrollView>(null);
  // Referência para armazenar a posição de scroll atual
  const scrollOffset = useRef({ x: 0, y: 0 });

  // Função para criar um novo Pan Responder para cada acorde arrastado
  const createPanResponder = (chordId: string) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gesture) => {
        // Encontrar o acorde específico sendo arrastado
        const draggedChord = draggingChords.find((item) => item.id === chordId);
        if (draggedChord) {
          // Quando segurar o acorde
          draggedChord.pan.setOffset({
            x: draggedChord.pan.x._value,
            y: draggedChord.pan.y._value,
          });
          draggedChord.pan.setValue({ x: 0, y: 0 });
        }
      },
      onPanResponderMove: (_, gesture) => {
        // Encontrar o acorde específico sendo arrastado
        const draggedChord = draggingChords.find((item) => item.id === chordId);
        if (draggedChord) {
          Animated.event(
            [null, { dx: draggedChord.pan.x, dy: draggedChord.pan.y }],
            {
              useNativeDriver: false,
            }
          )(_, gesture);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        // Encontrar o acorde específico sendo arrastado
        const draggedChord = draggingChords.find((item) => item.id === chordId);
        if (draggedChord) {
          draggedChord.pan.flattenOffset();

          // Calcular a posição real considerando o scroll
          const realX = gesture.moveX;
          const realY = gesture.moveY - scrollOffset.current.y;

          // Quando soltar o acorde que estava arrastando
          setPlacedChords((prev) => [
            ...prev,
            {
              chord: draggedChord.chord,
              x: realX,
              y: realY,
              id: `placed_${Date.now()}_${Math.random()}`,
            },
          ]);

          // Remover este acorde da lista de arrastos
          setDraggingChords((prev) =>
            prev.filter((item) => item.id !== chordId)
          );
        }
      },
    });
  };

  // Função para iniciar o arrasto de um novo acorde
  const startDraggingChord = (
    chord: string,
    initialX: number,
    initialY: number
  ) => {
    const newPan = new Animated.ValueXY({ x: initialX, y: initialY });
    const newId = `dragging_${Date.now()}_${Math.random()}`;

    setDraggingChords((prev) => [
      ...prev,
      {
        chord,
        id: newId,
        pan: newPan,
      },
    ]);
  };

  const removeChord = (id: string) => {
    setPlacedChords((prev) => prev.filter((p) => p.id !== id));
  };

  // Função para rastrear a posição de scroll
  const handleScroll = (event) => {
    scrollOffset.current = {
      x: event.nativeEvent.contentOffset.x,
      y: event.nativeEvent.contentOffset.y,
    };
  };

  // Função para atualizar uma palavra na letra
  const updateWord = (
    lineIndex: number,
    wordIndex: number,
    newWord: string
  ) => {
    const newLyrics = [...lyrics];
    newLyrics[lineIndex][wordIndex] = newWord;
    setLyrics(newLyrics);
  };

  // Função para adicionar uma nova linha
  const addNewLine = () => {
    setLyrics([...lyrics, ["Nova", "linha"]]);
    // Rolar para a parte inferior após adicionar uma linha
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      {/* Letra */}
      <ScrollView
        style={styles.lyricsBox}
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {lyrics.map((line, li) => (
          <View key={li} style={styles.line}>
            {line.map((word, wi) => (
              <View key={wi} style={styles.wordBox}>
                {/* Acordes colocados acima da palavra */}
                <View style={styles.chordContainer}>
                  {placedChords.map((p) => {
                    // Calcula a distância entre o acorde e esta palavra
                    const wordPos = { x: wi * 80 + 20, y: li * 50 + 10 };
                    const distance = Math.sqrt(
                      Math.pow(p.x - wordPos.x, 2) +
                        Math.pow(p.y - wordPos.y, 2)
                    );

                    // Se o acorde estiver próximo desta palavra, mostre-o acima
                    if (distance < 60) {
                      return (
                        <TouchableOpacity
                          key={p.id}
                          onLongPress={() => removeChord(p.id)}
                        >
                          <Text style={styles.placedChord}>{p.chord}</Text>
                        </TouchableOpacity>
                      );
                    }
                    return null;
                  })}
                </View>

                {/* Palavra editável */}
                <TextInput
                  style={styles.word}
                  value={word}
                  onChangeText={(text) => updateWord(li, wi, text)}
                />
              </View>
            ))}
            {/* Botão para adicionar nova palavra */}
            <TouchableOpacity
              onPress={() => {
                const newLyrics = [...lyrics];
                newLyrics[li].push("");
                setLyrics(newLyrics);
              }}
              style={styles.addWordBtn}
            >
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
        {/* Botão para adicionar nova linha */}
        <TouchableOpacity onPress={addNewLine} style={styles.addLineBtn}>
          <Text style={styles.addLineText}>+ Nova linha</Text>
        </TouchableOpacity>

        {/* Visualização de debug (opcional) */}
        <View style={styles.debugBox}>
          <Text style={styles.debugText}>
            Acordes colocados: {placedChords.length}
          </Text>
        </View>
      </ScrollView>

      {/* Barra de acordes */}
      <View style={styles.chordsRow}>
        {chords.map((chord, idx) => (
          <TouchableOpacity
            key={idx}
            onLongPress={(event) => {
              const { pageX, pageY } = event.nativeEvent;
              startDraggingChord(chord, pageX, pageY - 80);
            }}
            style={styles.chordButton}
          >
            <Text style={styles.chord}>{chord}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Acordes arrastando */}
      {draggingChords.map((dragItem) => {
        // Criar um panResponder para cada acorde sendo arrastado
        const panResponderForChord = createPanResponder(dragItem.id);

        return (
          <Animated.View
            key={dragItem.id}
            style={[
              styles.draggingChord,
              { transform: dragItem.pan.getTranslateTransform() },
            ]}
            {...panResponderForChord.panHandlers}
          >
            <Text style={styles.chord}>{dragItem.chord}</Text>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lyricsBox: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  line: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    alignItems: "center",
  },
  wordBox: {
    marginRight: 12,
    marginBottom: 8,
    alignItems: "center",
    minHeight: 60, // Garantir espaço para os acordes acima
  },
  chordContainer: {
    position: "absolute",
    top: -24,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  word: {
    fontSize: 18,
    color: "#333",
    minWidth: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 4,
    textAlign: "center",
  },
  placedChord: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d35400",
    backgroundColor: "#fff5e6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#f39c12",
    marginBottom: 2,
    marginRight: 4,
  },
  chordsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    flexWrap: "wrap",
  },
  chord: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  draggingChord: {
    position: "absolute",
    zIndex: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  chordButton: {
    padding: 5,
    margin: 3,
  },
  addWordBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  addBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  addLineBtn: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  addLineText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "500",
  },
  debugBox: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
  debugText: {
    color: "#666",
  },
});
