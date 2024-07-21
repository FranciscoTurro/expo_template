import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthProps {
  authState: { token: string | null; authenticated: boolean | null };
  onLogin: (
    username: string,
    password: string
  ) => Promise<
    | true
    | {
        error: boolean;
        msg: any;
      }
  >;
  onLogout: () => Promise<void>;
  isLoading: boolean;
}

const TOKEN_KEY = 'jwt';
export const API_URL = 'http://10.0.2.2:5050/api';

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null },
  onLogin: async () => true,
  onLogout: async () => {},
  isLoading: false,
});

export const useAuth = () => {
  const { authState, onLogin, onLogout, isLoading } = useContext(AuthContext);
  return {
    authState,
    onLogin,
    onLogout,
    isLoading,
  };
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync(TOKEN_KEY);

      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
      }
      setIsLoading(false);
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);

      const result = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });

      if (!result.data) return { error: true, msg: result.data.error };

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      setIsLoading(false);

      return true;
    } catch (e) {
      setIsLoading(false);
      return { error: true, msg: (e as any).response.data.error };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common['Authorization'] = '';
    setAuthState({
      token: null,
      authenticated: false,
    });
    setIsLoading(false);
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    authState,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
