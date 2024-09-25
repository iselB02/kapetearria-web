import React from 'react';
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Details from './components/Details';
import Tagline from './components/Tagline';
import './App.css';

function App() {
  return (
    <div style={{ width: '100%' }}>
      <div className="scrollable">
        <Navbar />  
        <Banner />
        <Details />
        <Tagline />
      </div>
    </div>
  );
}

export default App;
