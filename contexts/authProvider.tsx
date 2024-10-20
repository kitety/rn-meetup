import { Session } from '@supabase/supabase-js';
import { useReactive } from 'ahooks';
import { createContext, useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { supabase } from '~/utils/supabase';

interface IAuthContextType {
  session: Session | null;
  user: Session['user'] | null;
  isAuthenticated: boolean;
}
const AuthContext = createContext<IAuthContextType>({
  session: null,
  user: null,
  isAuthenticated: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const state = useReactive<{
    session: Session | null;
    isLoaded: boolean;
  }>({
    session: null,
    isLoaded: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      state.session = session;
      state.isLoaded = true;
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      state.session = session;
    });
  }, [state]);

  const value = {
    session: state.session,
    user: state.session?.user ?? null,
    isAuthenticated: !!state.session?.user,
  };
  console.log('auth context value', value);
  if (!state.isLoaded) return <ActivityIndicator />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
