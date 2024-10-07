import React, { useState } from 'react';
import Footer from './Footer';
import { auth, database } from './firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    sendPasswordResetEmail,
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
    const [resetEmail, setResetEmail] = useState('');
    const [resetError, setResetError] = useState('');
    const [isReset, setIsReset] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setAlertMessage('');
    };

    const validatePassword = (password) => {
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRequirements.test(password);
    };

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^09\d{9}$/; // Validate phone number format
        return phonePattern.test(phone);
    };

    const handleSignup = async () => {
        setAlertMessage('');
        setPasswordError(''); // Reset previous password error
        setPhoneError(''); // Reset previous phone error

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(phone)) {
            setPhoneError('Phone number must start with 09 and contain 11 digits total.');
            console.log('Phone validation failed:', phone); // Debugging line
            return;
        }

        try {
            // Set session persistence
            await setPersistence(auth, browserSessionPersistence);

            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user data in Firestore (only email and phone, NOT password)
            await addDoc(collection(database, 'users'), {
                uid: user.uid,
                email,
                phone,
            });

            // Automatically log in the user after signup
            await signInWithEmailAndPassword(auth, email, password);

            // Clear input fields
            setEmail('');
            setPhone('');
            setPassword('');

            // Redirect to the desired page after login (e.g., dashboard or home page)
            navigate('/home'); // Adjust the route as needed
        } catch (err) {
            console.error('Signup error:', err);
            setAlertMessage('Failed to sign up. Please try again.');
            setAlertType('error');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setResetError(''); // Reset any previous errors

        try {
            await sendPasswordResetEmail(auth, resetEmail);
            alert('Password reset email sent! Please check your inbox.');
            setIsReset(false); // Hide the reset form after sending email
        } catch (error) {
            console.error('Error sending password reset email:', error.code, error.message);
            setResetError('Failed to send password reset email. Please try again.');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        // Clear password error when the user types
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        // Clear phone error when the user types
        if (phoneError) {
            setPhoneError('');
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
            {isReset ? (
                <div className='main-body'>
                    <div className='icon-side'>
                        <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
                        <button>Continue without signing in</button>
                    </div>
                    <div className='login-side'>
                        <div className="login-form">
                            <h2>Reset Password</h2>
                            <div className='email'>
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
                            <button type="submit" onClick={handlePasswordReset}>Reset</button>
                            <button type="button" onClick={() => setIsReset(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='main-body'>
                    <div className='icon-side'>
                        <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
                        <button>Continue without signing in</button>
                    </div>
                    <div className='login-side'>
                        <div className="login-form">
                            <h2>Sign up</h2>
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
                                    onChange={handlePhoneChange} // Updated to handlePhoneChange
                                    placeholder="Enter your phone number"
                                />
                                {phoneError && <div className="error-banner">{phoneError}</div>}
                            </div>
                            <div className='password'>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange} // Updated to handlePasswordChange
                                    placeholder="Enter a password"
                                    required
                                />
                                {passwordError && <div className="error-banner">{passwordError}</div>}
                            </div>
                            <button type="submit" onClick={handleSignup}>Sign up</button>
                            <div className='div-border'></div>
                            <button className='google-btn'>
                                <img src='image/google-icon.png' alt='google-icon' />Sign in with Google
                            </button>
                            <button className='signup' onClick={() => navigate('/login')}>
                                Already have an account? Sign in now
                            </button>
                            <button className='forgot-pass' onClick={() => setIsReset(true)}>
                                Forgot your password?
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
