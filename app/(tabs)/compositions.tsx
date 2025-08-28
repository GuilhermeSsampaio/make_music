import { Ionicons } from "@expo/vector-icons"; // Ícones para botões
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Compositions({ navigation }: any) {
  const [compositions, setCompositions] = useState([
    { id: "1", title: "Composição 1", version: "v1.0", duration: "3:45" },
    { id: "2", title: "Composição 2", version: "v1.1", duration: "4:20" },
    { id: "3", title: "Composição 3", version: "v2.0", duration: "2:58" },
  ]);

  const handlePlay = (id: string) => {
    console.log(`Playing composition ${id}`);
  };

  const handleShare = (id: string) => {
    console.log(`Sharing composition ${id}`);
  };

  const handleNavigate = (id: string) => {
    navigation.navigate("ComposicaoDetalhes", { id });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Composições</Text>
      </View>
      <FlatList
        data={compositions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => handleNavigate(item.id)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardVersion}>
                {item.version} • {item.duration}
              </Text>
            </TouchableOpacity>
            <View style={styles.cardActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handlePlay(item.id)}
              >
                <Ionicons name="play-circle" size={24} color="#3498db" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleShare(item.id)}
              >
                <Ionicons name="share-social" size={24} color="#2ecc71" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
  },
  cardVersion: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
  },
  actionButton: {
    marginLeft: 8,
  },
});
