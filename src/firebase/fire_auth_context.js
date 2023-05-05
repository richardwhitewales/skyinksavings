import { createContext, useContext } from 'react'
import useFireAuth from '@/firebase/fire_auth';

const authUserContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => { },
  signUp: async () => { },
  logOut: async () => { }
});

export function FireAuthProvider({ children }) {
  const auth = useFireAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);