import React, { useState } from 'react';
import { auth, database } from './firebaseConfig';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence,
    sendPasswordResetEmail,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Footer from './Footer';

function Signup() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password) => {
        const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRequirements.test(password);
    };

    const validatePhoneNumber = (phone) => {
        const phonePattern = /^09\d{9}$/;
        return phonePattern.test(phone);
    };

    const handleSignup = async () => {
        setAlertMessage('');
        setPasswordError('');
        setPhoneError('');
        setEmailError('');
        let hasError = false;

        if (!email || !validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            hasError = true;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            hasError = true;
        }

        if (!validatePhoneNumber(phone)) {
            setPhoneError('Invalid Phone Number (09xxxxxxxxx)');
            hasError = true;
        }

        if (hasError) return;

        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);

            if (signInMethods.length > 0) {
                setEmailError('An account with this email already exists.');
                return;
            }

            await setPersistence(auth, browserSessionPersistence);

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await addDoc(collection(database, 'users'), {
                uid: user.uid,
                email,
                phone,
            });

            await signInWithEmailAndPassword(auth, email, password);

            setEmail('');
            setPhone('');
            setPassword('');

            navigate('/home');
        } catch (err) {
            console.error('Signup error:', err);
            setAlertMessage(err.message);
            setAlertType('error');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) {
            setPasswordError('');
        }
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        if (phoneError) {
            setPhoneError('');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle the visibility state
    };

    return (
        <div className='main'>
            {alertMessage && (
                <div className={`alert ${alertType}`}>
                    {alertMessage}
                    <span className="close-alert" onClick={() => setAlertMessage('')}>&times;</span>
                </div>
            )}
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
                                onChange={handleEmailChange}
                                placeholder="Enter your email"
                                required
                            />
                            {emailError && <div className="error-banner">{emailError}</div>}
                        </div>
                        <div className='phone'>
                            <label>Phone Number:</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={handlePhoneChange}
                                placeholder="Enter your phone number"
                            />
                            {phoneError && <div className="error-banner">{phoneError}</div>}
                        </div>
                        <div className='password'>
                            <label>Password:</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter a password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? <img src='image/hide.svg'/> : <img src='image/show.svg'/>}
                                </button>
                            </div>
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
                        <button className='forgot-pass' onClick={() => navigate('/forgot-password')}>
                            Forgot your password?
                        </button>
                    </div>
                </div>
            </div>
            <div className='footer'>
            <Footer />
            </div>
        </div>
    );
}

export default Signup;
