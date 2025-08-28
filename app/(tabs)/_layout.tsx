import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#1e51e9ff", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Criar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="microphone" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="compositions"
        options={{
          title: "Composições",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-music-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
      name="search"
      options={{
        title: "Search",
        tabBarIcon: ({ color }) => (
        <FontAwesome name="search" size={24} color={color} />
        ),
      }}
      /> */}
    </Tabs>
  );
}
