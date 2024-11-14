// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUid = Cookies.get('authToken'); // Retrieve UID from cookies
    if (storedUid) {
      setUser({ uid: storedUid });
    }
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        Cookies.set('authToken', currentUser.uid, { expires: 7 }); // Set UID in cookies
      } else {
        setUser(null);
        Cookies.remove('authToken'); // Clear UID from cookies
      }
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    await setPersistence(auth, browserSessionPersistence); // Set session persistence
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, { expires: 7 });
  };

  const signup = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    setUser(userCredential.user);
    Cookies.set('authToken', userCredential.user.uid, { expires: 7 });
    return userCredential.user;
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
