import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Tagline from './components/Tagline';
import Faqs from './components/Faqs';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ width: '100%' }}>
        <div className="scrollable">
         
          <Routes>
            <Route
              path="/Home"
              element={
                <>
                  <Navbar />
                  <Banner />
                  <Details />
                  <Tagline />
                  <Faqs />
                  <Footer />
                </>
              }
            />
            <Route path="/Order-History" element={
              <>
              <OrderHistory />
            </>

              } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
