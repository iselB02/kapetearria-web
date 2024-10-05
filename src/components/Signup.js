import React, { useState } from 'react';
import Footer from './Footer';
import { auth, database } from './firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signOut,
    setPersistence,
    browserSessionPersistence,
    RecaptchaVerifier,
    signInWithPhoneNumber,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    const setupRecaptcha = () => {
        // Ensure recaptchaVerifier is reset each time
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible', // Use 'normal' if you want the reCAPTCHA to be visible
            callback: (response) => {
                // reCAPTCHA solved - will proceed with sending the verification code
                handleSendCode();
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
            }
        }, auth);
    };

    const handleSendCode = (e) => {
        e.preventDefault();

        // Convert local phone number (e.g., 09XXXXXXXX) to E.164 format (+63XXXXXXXX)
        const fullPhoneNumber = phone.startsWith('09') ? `+63${phone.slice(1)}` : phone;

        // Validate phone number format
        const phoneRegex = /^\+63\d{10}$/; // Check if the number matches E.164 format
        if (!phoneRegex.test(fullPhoneNumber)) {
            setAlertMessage('Please enter a valid phone number starting with 09.');
            setAlertType('error');
            return; // Exit if the phone number is invalid
        }

        setupRecaptcha();
        
        // Send the verification code
        signInWithPhoneNumber(auth, fullPhoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                setIsCodeSent(true);
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.error('SMS not sent:', error);
                setAlertMessage('Failed to send verification code. Please try again.');
                setAlertType('error');
            });
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const confirmationResult = window.confirmationResult;
            await confirmationResult.confirm(verificationCode);
            handleSignup(); // Proceed with signup after verification
        } catch (error) {
            console.error('Error verifying code:', error);
            setAlertMessage('Invalid verification code. Please try again.');
            setAlertType('error');
        }
    };

    const handleSignup = async () => {
        setAlertMessage('');

        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore
            await addDoc(collection(database, 'users'), {
                uid: user.uid,
                email,
                phone,
            });

            await signOut(auth);

            // Clear input fields
            setEmail('');
            setPhone('');
            setPassword('');
            setVerificationCode('');

            navigate('/login');
        } catch (err) {
            console.error('Signup error:', err);
            setAlertMessage('Failed to sign up. Please try again.');
            setAlertType('error');
        }
    };

    return (
        <div className='main'>
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                    <span className="close-alert" onClick={handleCloseAlert}>&times;</span>
                </div>
            )}
            <div id="recaptcha-container"></div>
            <div className='main-body'>
                <div className='icon-side'>
                    <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
                    <button>Continue without signing in</button>
                </div>
                <div className='login-side'>
                    <div className="login-form">
                        <h2>Sign up</h2>
                        {!isCodeSent ? (
                            <form onSubmit={handleSendCode}>
                                <div className='email'>
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className='phone'>
                                    <label>Phone Number:</label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                </div>
                                <button type="submit">Send Verification Code</button>
                            </form>
                        ) : (
                            <form onSubmit={handleVerifyCode}>
                                <div className='verification-code'>
                                    <label>Verification Code:</label>
                                    <input
                                        type="text"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        placeholder="Enter verification code"
                                        required
                                    />
                                </div>
                                <button type="submit">Verify Code</button>
                            </form>
                        )}
                        <div className='div-border'></div>
                        <button className='google-btn'>
                            <img src='image/google-icon.png' alt='google-icon' />Sign in with Google
                        </button>
                        <button className='signup' onClick={() => navigate('/login')}>
                            Already have an account? Sign in now
                        </button>
                        <button className='forgot-pass'>Forgot your password</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;
