import { View, Button, Text } from 'tamagui';
import { useAuth } from '../../context/auth-context';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { authState, onLogout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text>Home screen</Text>
        <Text>{authState.authenticated}</Text>
        <Button theme="blue_active" onPress={onLogout}>
          deslogear
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginVertical: 10,
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
});
