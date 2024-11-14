import React, { useState } from 'react';
import { useAuth } from '../backend/AuthContext'; // Import the Auth context
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import Footer from './Footer';

function Signup() {
    const { signup } = useAuth(); // Destructure signup from the context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

    const sendOtpToEmail = async (otpCode) => {
        try {
            const response = await fetch('http://localhost:5000/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    otp: otpCode
                })
            });

            const result = await response.json();
            if (response.ok) {
                alert('OTP has been sent to your email.');
            } else {
                console.error('Error sending OTP:', result.message);
                setAlertMessage('Failed to send OTP email');
                setAlertType('error');
                setIsAlertModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage('Error sending OTP email');
            setAlertType('error');
            setIsAlertModalVisible(true);
        }
    };

    const handleSignup = async () => {
        setEmailError('');
        setPasswordError('');
        setAlertMessage('');
        let hasError = false;

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            hasError = true;
        }
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character.');
            hasError = true;
        }
        if (hasError) return;

        try {
            const otpCode = generateOtp();
            setGeneratedOtp(otpCode);
            setIsOtpModalVisible(true);

            await sendOtpToEmail(otpCode);
        } catch (error) {
            setAlertMessage(error.message);
            setAlertType('error');
            setIsAlertModalVisible(true);
            console.error('Signup error:', error);
        }
    };

    const verifyOtpAndCreateAccount = async () => {
        if (otp === generatedOtp) {
            alert('Email verified successfully!');
            setIsOtpModalVisible(false);
            try {
                await signup(email, password); // Call signup from the Auth context
                setEmail('');
                setPassword('');
                navigate('/setup-account'); // Direct to the setup account page
            } catch (error) {
                setAlertMessage(error.message);
                setAlertType('error');
                setIsAlertModalVisible(true);
                console.error('Account creation error:', error);
            }
        } else {
            alert('Invalid OTP, please try again.');
        }
    };

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <div className='main'>
            {isAlertModalVisible && (
                <div className='alert-modal'>
                    <div className='alert-content'>
                        <span className="close-alert" onClick={() => setIsAlertModalVisible(false)}>&times;</span>
                        <p className={`alert-message ${alertType}`}>{alertMessage}</p>
                    </div>
                </div>
            )}
            <div className='main-body'>
                <div className='icon-side'>
                    <img src='image/singin-signup-logo.png' alt='signin-signup-logo' />
                    <button onClick={() => navigate('/home')}>Continue without signing in</button>
                </div>
                <div className='login-side'>
                    <div className="login-form">
                        <h2>Sign up</h2>
                        <div className='email'>
                            <label className='label'>Email:</label>
                            <input type="email" value={email} onChange={handleEmailChange} placeholder="Enter your email" required />
                            {emailError && <div className="error-banner">{emailError}</div>}
                        </div>
                        <div className='password'>
                            <label className='label'>Password:</label>
                            <div className="password-input-container">
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} placeholder="Enter a password" required />
                                <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                                    {showPassword ? <img src='image/hide.svg' alt="hide" /> : <img src='image/show.svg' alt="show" />}
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
            <Footer />

            {/* OTP Modal */}
            {isOtpModalVisible && (
                <div className='otp-modal'>
                    <div className='otp-modal-content'>
                        <span className='close' onClick={() => setIsOtpModalVisible(false)}>&times;</span>
                        <h2>Enter OTP</h2>
                        <input className='input-otp' maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} />
                        <button onClick={verifyOtpAndCreateAccount}>Submit OTP</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
