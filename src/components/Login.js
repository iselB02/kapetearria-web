import './Login.css';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, database } from './firebaseConfig'; // Ensure this is importing database
import { ref, get } from 'firebase/database'; // Import necessary functions
import Footer from './Footer';


function Login() {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState('');
  const [isPhone, setIsPhone] = useState(false);  
  const [verificationId, setVerificationId] = useState('');

  const setupRecaptcha = () => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired, please try again');
        }
      }, auth); 
    }
  };

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset errors

    const userRef = ref(database, `users/${input}`); // Define user reference

    if (isEmail(input)) {
      // Check if the email exists in the database
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          // Email exists, proceed with email/password login
          const userCredential = await signInWithEmailAndPassword(auth, input, password);
          console.log('User logged in with email:', userCredential.user);
        } else {
          // Email does not exist, set error
          setError('No account found with this email.');
        }
      } catch (error) {
        console.error('Error checking email in database:', error.message);
        setError(error.message);
      }
    } else {
      // If input is a phone number
      setIsPhone(true);
      setupRecaptcha();
      const phoneNumber = '+63' + input; 
      const appVerifier = window.recaptchaVerifier;

      try {
        // Check if the phone number exists in the database
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          // Phone number exists, proceed with phone number login
          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setVerificationId(confirmationResult.verificationId);
          console.log('OTP sent to phone:', input);
        } else {
          // Phone number does not exist, set error
          setError('No account found with this phone number.');
        }
      } catch (error) {
        console.error('Error checking phone number in database:', error.message);
        setError(error.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User logged in:', result.user);
    } catch (error) {
      console.error('Error with Google login:', error.message);
      setError(error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (verificationId) {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      try {
        const result = await auth.signInWithCredential(credential);
        console.log('Phone number logged in:', result.user);
      } catch (error) {
        console.error('Error verifying OTP:', error.message);
        setError(error.message);
      }
    }
  };

  return (
    <div className='main'>
      {error && <div className="error-banner">{error}</div>}
      <div className='main-body'>
        <div className='icon-side'>
          <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
          <button>Continue without signing in</button>
        </div>
        <div className='login-side'>
          <div className="login-form">
            <h2>Log in</h2>
            {!isPhone && (
              <form onSubmit={handleLogin}>
                <div className='email'>
                  <label>Email or phone number:</label>
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Enter your email or phone number"
                    required
                  />
                </div>
                <div className='password'>
                  <label>Password:</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password"
                    required={!isPhone}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            )}
            {isPhone && (
              <form onSubmit={handleVerifyOtp}>
                <div className='otp'>
                  <label>Enter OTP:</label>
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)} 
                    placeholder="Enter the OTP sent to your phone"
                    required
                  />
                </div>
                <button type="submit">Verify OTP</button>
              </form>
            )}
            <div id="recaptcha-container"></div>
            <div className='div-border'></div>
            <button className='google-btn' onClick={handleGoogleLogin}>
              <img src='image/google-icon.png' alt='google-icon' />Sign in with Google
            </button>
            <button className='signup'>Don't have an account? Sign up now</button>
            <button className='forgot-pass'>Forgot your password</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
