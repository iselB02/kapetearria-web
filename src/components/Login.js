import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'; // Import Firestore
import { auth, database } from './firebaseConfig'; // Firebase config
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from '../backend/AuthContext'; // Auth context for login
import './Login.css'

function Login() {
  const { login } = useAuth(); // Destructure login from AuthContext
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const logVisitor = async (userId, email, method) => {
    try {
      const visitorRef = collection(database, 'visitor_logs'); // Firestore collection
      await addDoc(visitorRef, {
        userId: userId || 'Anonymous',
        email: email || 'Anonymous',
        method, // Login method (e.g., Google or Email/Password)
        timestamp: new Date().toISOString(), // Log timestamp
      });
      console.log('Visitor logged successfully');
    } catch (error) {
      console.error('Error logging visitor:', error);
    }
  };

   // Check if the user exists in the user_info collection
   const checkUserInfo = async (uid) => {
    const userInfoRef = doc(database, 'user_info', uid); // Reference to user info in Firestore
    const userInfoSnap = await getDoc(userInfoRef);
    return userInfoSnap.exists(); // Return true if user info exists, false otherwise
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, input, password);
      const user = userCredential.user;

      // Log the login event to Firestore
      await logVisitor(user.uid, user.email, 'Email/Password');

      navigate('/');
    } catch (error) {
      setError('Failed to sign in. Please check your credentials and try again.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Log the login event to Firestore
      await logVisitor(user.uid, user.email, 'Google');

      // Check if user exists in 'user_info' collection
      const userExists = await checkUserInfo(user.uid);

      if (userExists) {
        // If the user exists in the 'user_info' collection, redirect to home
        navigate('/');
      } else {
        // If the user does not exist, redirect to setup account page
        navigate('/setup-account');
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      setError('Google login failed. Please try again.');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError(null);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent! Please check your inbox.');
      setIsReset(false);
    } catch (error) {
      setResetError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="main">
      {error && <div className="error-banner">{error}</div>}
      <div className="main-body">
        <div className="icon-side">
          <img src="image/singin-signup-logo.png" alt="signin-signup-logo" />
          <button type="button" onClick={() => navigate('/home')}>Continue without signing in</button>
        </div>
        <div className="login-side">
          <div className="login-form">
            <h2>Log in</h2>
            {isReset ? (
              <form onSubmit={handlePasswordReset}>
                <div className="reset-email">
                  <label>Enter your email:</label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {resetError && <div className="error-banner">{resetError}</div>}
                <div className="reset-div">
                  <button id="reset-cancel-btn" type="submit">Reset</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="email">
                  <label className="label">Email:</label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="password">
                  <label className="label">Password:</label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <img src="image/hide.svg" alt="hide" /> : <img src="image/show.svg" alt="show" />}
                    </button>
                  </div>
                </div>
                <button type="submit">Login</button>
              </form>
            )}
            <div className="div-border"></div>
            <button className="google-btn" onClick={handleGoogleLogin}>
              <img src="image/google-icon.png" alt="google-icon" />Sign in with Google
            </button>
            <button className="signup" onClick={() => navigate('/signup')}>Don't have an account? Sign up now</button>
            <button className="forgot-pass" onClick={() => setIsReset(true)}>Forgot your password?</button>
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Login;
