import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="composition"
          options={{
            title: "Letra da Música",
            headerStyle: { backgroundColor: "#3498db" },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
