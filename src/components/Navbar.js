import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';

function Navbar() {
  return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <img src='image/logo.png' className="logo" alt="store-logo" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"><img src='image/home.svg' className="home" alt="home-icon" /><span className="text">Home</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><img src='image/my-order.svg' className="my-order" alt="myorder-icon" /><span className="text">My order</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><img src='image/my-cart.svg' className="my-cart" alt="mycart-icon" /><span className="text">My cart</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><img src='image/sign-in.svg' className="sign-in" alt="signin-icon" /><span className="text">Sign in</span></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
