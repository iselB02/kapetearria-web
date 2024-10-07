import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Import your Firebase configuration
import { useAuthState } from 'react-firebase-hooks/auth'; // Hook for Firebase auth state
import { signOut } from 'firebase/auth'; // Import signOut method
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown from react-bootstrap

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
            {user ? ( // Render the Account dropdown if user is logged in
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center">
                    <img src='image/sign-in.svg' className="account" alt="account-icon" />
                    <span className="text ms-2">Account</span> {/* Add margin for spacing */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="start" className="custom-dropdown-menu"> {/* Align menu to the left */}
                    <Dropdown.Item href="#" className="custom-dropdown-item">Account Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="custom-dropdown-item">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : ( // Render Sign In button if user is not logged in
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/login')}>
                  <img src='image/sign-in.svg' className="account" alt="account-icon" />
                  <span className="text">Sign In</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
