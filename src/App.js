import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // React Router components
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Details from './components/Details';  // Where the clickable image is
import Tagline from './components/Tagline';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import DrinksPage from './components/DrinksPage';  // Import the DrinksPage
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ width: '100%' }}>
        <Navbar />  {/* Navbar stays on top */}
        <div className="scrollable">
          <Routes>
            {/* Default route - your homepage */}
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <Details />  {/* Where the image is clickable */}
                  <Tagline />
                  <Faqs />
                  <Footer />
                </>
              }
            />
            {/* Route for the drinks page */}
            <Route path="/drinks" element={<DrinksPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
