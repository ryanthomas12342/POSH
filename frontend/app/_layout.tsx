import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FadeIn } from 'react-native-reanimated';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'simple_push', // 👈 Change this to control transition
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="what-is-posh" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="sections" />
        <Stack.Screen name="case-files" />
        <Stack.Screen name="about-user" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="test" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="AI-chat"/>
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
