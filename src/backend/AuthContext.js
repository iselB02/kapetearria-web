import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebaseConfig';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence, // Use browserLocalPersistence
} from 'firebase/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Setting authToken for user:', currentUser.uid);
        Cookies.set('authToken', currentUser.uid, {
          expires: 7, // Cookie expiration in days
          secure: true,
          sameSite: 'None',
          path: '/', // Make cookie accessible across the app
        });
        setUser(currentUser); // Update the user state
      } else {
        console.log('No user found, removing authToken');
        Cookies.remove('authToken'); // Remove the cookie if no user is authenticated
        setUser(null);
      }
      setLoading(false); // Indicate authentication state is resolved
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence); // Use browserLocalPersistence
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, {
      expires: 7, // Cookie expiration in days
      secure: true,
      sameSite: 'None',
      path: '/',
    });
  };

  const signup = async (email, password) => {
    await setPersistence(auth, browserLocalPersistence); // Use browserLocalPersistence
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, {
      expires: 7,
      secure: true,
      sameSite: 'None',
      path: '/',
    });
    return userCredential.user;
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
