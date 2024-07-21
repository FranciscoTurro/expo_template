import { Button, Text, View } from 'react-native';
import { useAuth } from '../../context/auth-context';

export default function HomeScreen() {
  const { authState, onLogout } = useAuth();

  return (
    <View>
      <Text>Home screen</Text>
      <Button
        onPress={onLogout}
        title="outo"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
