import './Login.css';
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState(null);
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  const setupRecaptcha = () => {
    if (typeof window !== 'undefined' && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired, please try again');
        },
      }, auth);
    }
  };

  const isEmail = (input) => /\S+@\S+\.\S+/.test(input);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    const userCollectionRef = collection(db, 'users');

    if (isEmail(input)) {
      try {
        const q = query(userCollectionRef, where("email", "==", input));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userCredential = await signInWithEmailAndPassword(auth, input, password);
          console.log('User logged in with email:', userCredential.user);

          navigate('/home'); // Navigate to home on successful login
        } else {
          setError('No account found with this email.');
        }
      } catch (error) {
        console.error('Error during email/password login:', error.code, error.message);
        setError('Failed to sign in. Please check your credentials and try again.');
      }
    } else {
      setIsPhone(true);
      setupRecaptcha();
      const phoneNumber = '+63' + input;
      const appVerifier = window.recaptchaVerifier;

      try {
        const q = query(userCollectionRef, where("phoneNumber", "==", phoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setVerificationId(confirmationResult.verificationId);
          console.log('OTP sent to phone:', input);
        } else {
          setError('No account found with this phone number.');
        }
      } catch (error) {
        console.error('Error during phone login:', error.code, error.message);
        setError('Failed to send OTP. Please check the phone number and try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User logged in:', result.user);
      navigate('/home'); // Navigate to home on successful Google login
    } catch (error) {
      console.error('Error with Google login:', error.code, error.message);
      setError('Google login failed. Please try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (verificationId) {
      const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      try {
        const result = await auth.signInWithCredential(credential);
        console.log('Phone number logged in:', result.user);
        navigate('/home'); // Navigate to home on successful OTP verification
      } catch (error) {
        console.error('Error verifying OTP:', error.code, error.message);
        setError('Failed to verify OTP. Please try again.');
      }
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to signup page
  };

  const handleContinue = () => {
    navigate('/home'); // Navigate to home page without signing in
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError(null); // Reset any previous errors

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert('Password reset email sent! Please check your inbox.');
      setIsReset(false); // Hide the reset form after sending email
    } catch (error) {
      console.error('Error sending password reset email:', error.code, error.message);
      setResetError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className='main'>
      {error && <div className="error-banner">{error}</div>}
      <div className='main-body'>
        <div className='icon-side'>
          <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
          <button type="button" onClick={handleContinue}>Continue without signing in</button>
        </div>
        <div className='login-side'>
          <div className="login-form">
            <h2>Log in</h2>
            {isReset ? (
              <form onSubmit={handlePasswordReset}>
                <div className='reset-email'>
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
                <button type="submit">Reset</button>
                <button type="button" onClick={() => setIsReset(false)}>Cancel</button>
              </form>
            ) : (
              <>
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
                <button className='signup' onClick={handleSignupRedirect}>Don't have an account? Sign up now</button>
                <button className='forgot-pass' onClick={() => setIsReset(true)}>Forgot your password?</button>
              </>
            )}
          </div>
        </div>
      </div>
          </div>
  );
}

export default Login;
