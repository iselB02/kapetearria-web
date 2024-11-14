import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebaseConfig';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Setting authToken for user:', currentUser.uid);
        Cookies.set('authToken', currentUser.uid, {
          expires: 7, // Cookie expiration in days
          secure: true, // Ensure cookie is sent over HTTPS
          sameSite: 'None', // Enable cross-site access if needed
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
    await setPersistence(auth, browserSessionPersistence); // Set session persistence
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, {
      expires: 7, // Cookie expiration in days
      secure: true, // Ensures cookies are sent over HTTPS
      sameSite: 'None', // Allows cross-site cookie usage
      path: '/',
    });
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, {
      expires: 7, // Cookie expiration in days
      secure: true, // Ensures cookies are sent over HTTPS
      sameSite: 'None', // Allows cross-site cookie usage
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
