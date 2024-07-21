import { Redirect, Tabs } from 'expo-router';
import { colors } from '@/constants/colors';
import { useAuth } from '../../context/auth-context';
import { Text, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

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
          tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="binoculars" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
