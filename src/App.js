import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './backend/AuthContext'; // Import AuthProvider and useAuth
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Banner from './components/Banner';
import Details from './components/Details';
import Tagline from './components/Tagline';
import Faqs from './components/Faqs';
import Drinks from './components/Drinks';
import Checkout from './components/Checkout';
import AccountSetup from './components/AccountSetup';
import AccountSettings from './components/AccountSettings';
import AdminDashboard from './components/AdminDashboard'; // Import Admin Dashboard
import OrderProcess from './components/OrderProcess';// Import Admin Inventory
import AdminSales from './components/AdminSales'; // Import Admin Sales
import AdminInventory from './components/AdminInventory'; //Import Admin Inventory
import AdminStaff from './components/AdminStaff';
import AddStaff from './components/AddStaff';
import AdminUAM from './components/AdminUAM';
import AdminChat from './components/AdminChat';
import './App.css';
import ChatBot from "react-chatbotify";
import "../node_modules/react-chatbotify/dist/style.css";
import AddProduct from "./components/AdminAdd"; // Import the component



const config = {
  botName: "KapetidBot",
  initialMessages: [{ type: "text", text: "Hi there! How can I assist you?" }],
};

const actionProvider = {
  handleMessage: (message) => {
    console.log("User said:", message);
    // Add custom response logic here
    if (message.toLowerCase().includes("order")) {
      return { type: "text", text: "Sure! What would you like to order?" };
    }
    return { type: "text", text: "I'm here to help with anything you need!" };
  },
};

const messageParser = (message) => {
  console.log("Parsed message:", message);
  // Add parsing logic if needed
};


const App = () => {
  const { user} = useAuth();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Simulate a delay of 5 seconds (5000 milliseconds) before loading completes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    //7700
    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img
          src="image/loading2.gif"
          alt="Loading..."
          key={new Date().getTime()} // Ensures the GIF restarts on each render
          style={{ width: '500px', height: '500px' }} // Adjust size as needed
        />
      </div>
    );
  }
  
  return (
    <AuthProvider>
      <Router>
        <Content />
      </Router>
    </AuthProvider>
  );
};

const Content = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { type } = useParams();

  useEffect(() => {
    const handleScroll = (event) => {
      const normalScrollRoutes = ['/meals', '/drinks', '/snacks', '/desserts'];

      if (normalScrollRoutes.includes(location.pathname)) return;

      if (event.target.closest('.cart-container')) return;

      event.preventDefault();
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

    if (!['/meals', '/drinks', '/snacks', '/desserts'].includes(location.pathname)) {
      window.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="loading-screen">
        <img src="/path-to-spinner.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="full-page">
      {user && <Navbar />}

      <div className={`scrollable ${type ? 'normal-scroll' : ''}`}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
          <Route path="/setup-account" element={user ? <AccountSetup /> : <Navigate to="/login" />} />
          <Route path="/:type" element={<Drinks />} />
          <Route path="/myorder" element={user ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/my-account" element={user ? <AccountSettings /> : <Navigate to="/login" />} />
          <Route path="/order-process" element={user ? <OrderProcess /> : <Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
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
          {/* <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} /> */}
          <Route path="/" element={<Navigate to="/home" />} />
            
           {/* Admin Dashboard Route */}
           <Route path="/admin" element={<AdminDashboard />} />
           
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to home by default */}
           {/*  Admin Inventory Route*/}
           <Route path="/inventory" element={<AdminInventory />} />
           <Route path="/sales" element={<AdminSales />} />
        
      {/*  <Route path="/admin" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/login" />} /> 
        */}
          <Route path="/" element={<Navigate to="/home" />} />
           {/* Admin Dashboard Route */}<Route path="/admin" element={<AdminDashboard />} />
           {/*  Admin Inventory Route*/}<Route path="/inventory" element={<AdminInventory />} /> 
           {/*  Admin Add Product Route*/} <Route path="/add" element={<AddProduct />} />
           {/*  Admin Sales Report Route*/}<Route path="/sales" element={<AdminSales />} />
           <Route path="/staff" element={<AdminStaff/>} />
           <Route path="/add-staff" element={<AddStaff />} />
           <Route path='/uam' element={<AdminUAM/>}/>
           <Route path='/chat-support' element={<AdminChat/>}/>
        </Routes>
      </div>

      <ChatBot
        config={config}
        messageParser={messageParser}
        actionProvider={actionProvider}
      />
    </div>
  );
};

export default App;
