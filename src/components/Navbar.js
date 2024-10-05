import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Import your Firebase configuration
import { useAuthState } from 'react-firebase-hooks/auth'; // Hook for Firebase auth state
import { signOut } from 'firebase/auth'; // Import signOut method
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Navbar() {
  const [user] = useAuthState(auth); // Get the current user's auth state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/login'); // Redirect to login page using useNavigate
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <>
      {user && ( // Render Navbar only if user is signed in
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
          <div className="container-fluid">
            <img src='image/logo.png' className="logo" alt="store-logo" />
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    <img src='image/home.svg' className="home" alt="home-icon" />
                    <span className="text">Home</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src='image/my-order.svg' className="my-order" alt="myorder-icon" />
                    <span className="text">My order</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <img src='image/my-cart.svg' className="my-cart" alt="mycart-icon" />
                    <span className="text">My cart</span>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a 
                    className="nav-link dropdown-toggle" 
                    href="#" 
                    id="navbarDropdown" 
                    role="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <img src='image/account.svg' className="account" alt="account-icon" />
                    <span className="text">Account</span>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#">Account Settings</a></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
