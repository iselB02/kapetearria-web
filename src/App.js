// App.js
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import { auth } from './components/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Details from './components/Details';
import Tagline from './components/Tagline';
import Faqs from './components/Faqs';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for auth

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after checking auth state
    });

    return () => unsubscribe();
  }, []);

  // Show loading indicator while auth state is being determined
  if (loading) {
    return <p>Loading...</p>; // Or a better loading component
  }

  return (
    <Router>
      <div style={{ width: '100%' }}>
        <div className="scrollable">
          {/* Only render Navbar if user is authenticated */}
          {user && <Navbar />}

          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
            {/* Protect the /home route */}
            <Route path="/home" element={user ? (
              <>
                <Banner />
                <Details />
                <Tagline />
                <Faqs />
                <Footer />
              </>
            ) : (
              <Navigate to="/login" />
            )} />
            {/* Optionally, add a redirect for other routes */}
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;