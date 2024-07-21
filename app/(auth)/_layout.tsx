import { Redirect, Tabs } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useAuth } from '../../context/auth-context';
import { Text, useColorScheme } from 'react-native';

export default function Layout() {
  const colorScheme = useColorScheme();
  const { authState, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!authState!.authenticated) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
          }}
        />
      </Tabs>
    </>
  );
}
