import { router } from 'expo-router';
import { useAuth } from '../context/auth-context';
import { useState } from 'react';
import { View, Button, Input, Text } from 'tamagui';
import { StyleSheet } from 'react-native';

export default function SignIn() {
  const { onLogin, authState } = useAuth();

  const [state, setState] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const loginResponse = await onLogin(state.username, state.password);

    if (loginResponse === true) {
      router.replace('/');
    } else setError(loginResponse.msg);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Input
          placeholder="Username"
          theme="pink_active"
          onChangeText={(newState) =>
            setState({ username: newState, password: state.password })
          }
          defaultValue={state.username}
          style={styles.input}
        />
        <Input
          placeholder="Password"
          theme="pink_active"
          onChangeText={(newState) =>
            setState({ username: state.username, password: newState })
          }
          defaultValue={state.password}
          style={styles.input}
        />
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <Button theme="pink_active" onPress={handleLogin} style={styles.button}>
          Sign In
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
