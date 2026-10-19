import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, 
        animation: "slide_from_right", 
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(home)" />
      
      <Stack.Screen 
        name="lembrete/[id]" 
        options={{ 
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f8fcf9" }
        }} 
      />
    </Stack>
  );
}
