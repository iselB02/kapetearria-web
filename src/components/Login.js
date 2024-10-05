import './Login.css';
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPhoneNumber, RecaptchaVerifier, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Ensure this is importing auth
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState('');
  const [isPhone, setIsPhone] = useState(false);
  const [verificationId, setVerificationId] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate(); // Initialize the navigate function
  const db = getFirestore(); // Initialize Firestore

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
    setError(null); // Reset any previous errors
    setLoading(true); // Start loading

    const userCollectionRef = collection(db, 'users'); // Reference to the users collection

    if (isEmail(input)) {
      try {
        const q = query(userCollectionRef, where("email", "==", input));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Proceed with email/password login
          const userCredential = await signInWithEmailAndPassword(auth, input, password);
          console.log('User logged in with email:', userCredential.user);
          
          // Add a delay before navigating to home
          setTimeout(() => {
            setLoading(false); // Stop loading
            navigate('/home'); // Navigate to home on successful login
          }, 2000); // 2000ms delay (2 seconds)
        } else {
          setError('No account found with this email.');
          setLoading(false); // Stop loading
        }
      } catch (error) {
        console.error('Error during email/password login:', error.code, error.message);
        setError('Failed to sign in. Please check your credentials and try again.');
        setLoading(false); // Stop loading
      }
    } else {
      // If input is a phone number
      setIsPhone(true);
      setupRecaptcha();
      const phoneNumber = '+63' + input; 
      const appVerifier = window.recaptchaVerifier;

      try {
        // Check if the phone number exists in the Firestore collection
        const q = query(userCollectionRef, where("phoneNumber", "==", phoneNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Phone number exists, proceed with phone number login
          const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
          setVerificationId(confirmationResult.verificationId);
          console.log('OTP sent to phone:', input);
          setLoading(false); // Stop loading
        } else {
          setError('No account found with this phone number.');
          setLoading(false); // Stop loading
        }
      } catch (error) {
        console.error('Error during phone login:', error.code, error.message);
        setError('Failed to send OTP. Please check the phone number and try again.');
        setLoading(false); // Stop loading
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google User logged in:', result.user);
      
      // Add a delay before navigating to home
      setTimeout(() => {
        navigate('/home'); // Navigate to home on successful Google login
      }, 2000); // 2000ms delay (2 seconds)
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
        
        // Add a delay before navigating to home
        setTimeout(() => {
          navigate('/home'); // Navigate to home on successful OTP verification
        }, 2000); // 2000ms delay (2 seconds)
      } catch (error) {
        console.error('Error verifying OTP:', error.code, error.message);
        setError('Failed to verify OTP. Please try again.');
      }
    }
  };

  // Function to handle signup redirect
  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <div className='main'>
      {loading && <div className="loading-overlay">Loading...</div>} {/* Loading overlay */}
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
            <button className='signup' onClick={handleSignupRedirect}>Don't have an account? Sign up now</button>
            <button className='forgot-pass'>Forgot your password</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
