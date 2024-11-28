import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import { database } from '../components/firebaseConfig'; // Assuming db is initialized in firebaseConfig
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // Add role state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('Setting authToken for user:', currentUser.uid);
        Cookies.set('authToken', currentUser.uid, {
          expires: 7, // Cookie expiration in days
          secure: true,
          sameSite: 'None',
          path: '/', // Make cookie accessible across the app
        });
        setUser(currentUser); // Update the user state

        // Fetch user role from Firestore (user_info collection)
        try {
          const userRef = doc(database, 'user_info', currentUser.uid); // Assuming user_info collection
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userRole = userDoc.data().role;
            setRole(userRole); // Set role from Firestore
            console.log('User role fetched:', userRole);
          } else {
            console.log('No user data found');
            setRole(null); // Set role to null if no user data exists
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user found, removing authToken');
        Cookies.remove('authToken'); // Remove the cookie if no user is authenticated
        setUser(null);
        setRole(null); // Clear role when user logs out
      }
      setLoading(false); // Indicate authentication state is resolved
    });

    return () => unsubscribe();
  }, []);

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

    // Fetch role after login from Firestore
    try {
      const userRef = doc(database, 'user_info', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        setRole(userRole); // Set role from Firestore
        console.log('User role fetched after login:', userRole);
      }
    } catch (error) {
      console.error('Error fetching role after login:', error);
    }
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

    // Fetch role after signup
    try {
      const userRef = doc(database, 'user_info', userCredential.user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;
        setRole(userRole); // Set role from Firestore
        console.log('User role fetched after signup:', userRole);
      }
    } catch (error) {
      console.error('Error fetching role after signup:', error);
    }

    return userCredential.user;
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setRole(null); // Clear role on logout
    Cookies.remove('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
