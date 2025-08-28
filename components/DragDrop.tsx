import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Draggable from "react-native-draggable";
import Chords from "./Chords";

export default function DragDrop() {
  // Obtém as dimensões da tela para definir limites
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  // Estado para armazenar as dimensões da área de arrastar
  const [dragAreaLayout, setDragAreaLayout] = useState({
    width: 0,
    height: 0,
  });

  // Definindo acordes disponíveis
  const availableChords = ["C", "D", "E", "F", "G", "A", "B"];

  // Valores constantes para tamanho dos acordes
  const CHORD_WIDTH = 40; // Reduzido para tornar os acordes menores
  const CHORD_HEIGHT = 30; // Reduzido para tornar os acordes menores
  const CHORD_MARGIN = 10; // Espaçamento entre acordes

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
          {dragAreaLayout.width > 0 && // Só renderiza após conhecer as dimensões
            availableChords.map((tone, index) => {
              // Configurações para melhor centralização
              const totalChords = availableChords.length;

              // Determina quantos acordes por linha baseado no espaço disponível
              const availableWidth = dragAreaLayout.width - 20; // Descontando padding
              const itemsPerRow = Math.min(
                Math.floor(availableWidth / (CHORD_WIDTH + CHORD_MARGIN * 2)),
                totalChords
              );

              // Calcula o número de linhas necessárias
              const rowCount = Math.ceil(totalChords / itemsPerRow);

              // Calcula a largura total que os acordes ocuparão em uma linha
              const totalRowWidth =
                itemsPerRow * (CHORD_WIDTH + CHORD_MARGIN * 2);

              // Centraliza na linha
              const leftPadding = (availableWidth - totalRowWidth) / 2 + 10;

              // Calcula a linha e coluna do acorde atual
              const row = Math.floor(index / itemsPerRow);
              const col = index % itemsPerRow;

              // Calcula posição centralizada para cada acorde
              const x =
                leftPadding +
                col * (CHORD_WIDTH + CHORD_MARGIN * 2) +
                CHORD_MARGIN;

              // Centraliza verticalmente no espaço disponível
              const availableHeight = 120; // altura da chordsRow
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
                  key={tone}
                  x={x}
                  y={y}
                  renderSize={40} // Tamanho reduzido do renderSize
                  renderColor="transparent"
                  isCircle={false}
                  onDragRelease={(e, gestureState) => {
                    console.log("Acorde arrastado:", tone);
                  }}
                  onDrag={() => console.log("start drag")}
                  onRelease={() => console.log("release drag")}
                  onPressIn={() => console.log("press in")}
                  onPressOut={() => console.log("press out")}
                  z={9999}
                  shouldReverse={false}
                >
                  <View style={styles.chordContainer}>
                    <Chords toneProp={tone} harmonicFieldProp={"MAJOR"} />
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
    minHeight: 160, // Reduzido de 180 para 160
    backgroundColor: "#e8f4ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#c0d6e9",
    borderStyle: "dashed",
    padding: 8,
    position: "relative",
  },
  chordsRow: {
    width: "100%",
    height: 120,
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },
  instruction: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5, // Reduzido de 10 para 5
    textAlign: "center",
  },
  chordContainer: {
    minWidth: 40, // Reduzido de 45 para 40
    minHeight: 30, // Reduzido de 35 para 30
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
    padding: 4, // Reduzido de 6 para 4
    borderWidth: 1,
    borderColor: "#e0e0e0",
    position: "relative",
  },
});
