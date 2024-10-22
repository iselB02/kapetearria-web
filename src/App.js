import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import { auth } from './components/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Details from './components/Details';
import Tagline from './components/Tagline';
import Faqs from './components/Faqs';
import Drinks from './components/Drinks';
import { useParams } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard'; // Import Admin Dashboard

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Content user={user} />
    </Router>
  );
};

const Content = ({ user }) => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = (event) => {
      if (location.pathname === '/drinks') {
        return; // Normal scrolling for drinks page
      }

      event.preventDefault(); // Prevent default scroll behavior
      const sections = document.querySelectorAll('.full-page .section');
      const totalSections = sections.length;
      let currentSection = Math.round(window.scrollY / window.innerHeight);

      if (event.deltaY > 0) {
        currentSection = Math.min(currentSection + 1, totalSections - 1);
      } else {
        currentSection = Math.max(currentSection - 1, 0);
      }

      window.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: 'smooth',
      });
    };

    if (location.pathname !== '/drinks') {
      window.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [location.pathname]);

  const { type } = useParams();

  return (
    <div className="full-page">
      {user && <Navbar />}

      <div className={`scrollable ${type ? 'normal-scroll' : ''}`}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
          {/* Pass the 'type' (e.g., drinks, snacks, desserts) as a route parameter */}
          <Route path="/:type" element={<Drinks />} />
          <Route
            path="/home"
            element={
              <>
                <div>
                  <Navbar />
                </div>
                <div className="section">
                  <Banner />
                </div>
                <div className="section">
                  <Details />
                </div>
                <div className="section">
                  <Tagline />
                </div>
                <div className="section">
                  <Faqs />
                </div>
              </>
            }
          />
          {/* Add the Admin Dashboard route */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to home by default */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
