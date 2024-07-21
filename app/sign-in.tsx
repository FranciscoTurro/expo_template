import { router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/auth-context';
import { useState } from 'react';

export default function SignIn() {
  const { onLogin } = useAuth();
  const [state, setState] = useState({ username: '', password: '' });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        onChangeText={(newState) =>
          setState({ username: newState, password: state.password })
        }
        defaultValue={state.username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(newState) =>
          setState({ username: state.username, password: newState })
        }
        defaultValue={state.password}
      />
      <Text
        onPress={() => {
          onLogin!(state.username, state.password);
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}
      >
        Sign In
      </Text>
    </View>
  );
}
