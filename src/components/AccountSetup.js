import React, { useState, useEffect } from 'react';
import './AccountSetup.css';
import Footer from './Footer';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

function AccountSetup() {
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [mi, setMi] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [uid, setUid] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'verify',
        {
          size: 'invisible',
          callback: () => console.log('Recaptcha verified'),
        },
        auth
      );
    }

    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
      setUid(user.uid);
    }
  }, [auth]);

  const formatPhoneNumber = (input) => {
    const numericInput = input.replace(/\D/g, '');
    if (numericInput.startsWith('63')) {
      return `+${numericInput.slice(0, 12)}`;
    } else if (numericInput.startsWith('9')) {
      return `+63${numericInput.slice(0, 10)}`;
    } else {
      return `+63`;
    }
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(formatPhoneNumber(e.target.value));
  };

  const handlePhoneVerification = async () => {
    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setShowOtpModal(true);
    } catch (error) {
      console.error('SMS not sent:', error);
      alert('Error sending SMS');
    }
  };

  const verifyOtp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      await signInWithCredential(auth, credential);
      setIsVerified(true);
      alert('Phone verified successfully');
      setShowOtpModal(false);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Invalid OTP');
    }
  };

  const handleSubmit = async () => {
    if (!surname || !firstname || !birthdate || !address || !isVerified) {
      alert('Please fill in all required fields and verify your phone number.');
      return;
    }
    setShowWarning(true);
  };

  const handleConfirmSubmit = async () => {
    setShowWarning(false);

    if (uid) {
      try {
        await setDoc(doc(database, 'user_info', uid), {
          surname,
          firstname,
          middleInitial: mi,
          birthdate,
          address,
          phone: phoneNumber,
          email: userEmail,
          verified: isVerified
        });
        alert('Account setup successfully saved!');
        navigate('/home'); // Redirect to the home page after submission
      } catch (error) {
        console.error('Error saving data:', error);
        alert('Error saving data');
      }
    }
  };

  return (
    <div className='main-setup'>
      <div className='setup-container'>
        <h1 id='title-account'>Account</h1>
        <div className='columns-setup'>
          <div className='col-1'>
            <div className='surname-div'>
              <label htmlFor="Surname">Surname</label>
              <input className='input-col1' id='Surname' maxLength={50} value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div className='firstname-div'>
              <label htmlFor="Firstname">Firstname</label>
              <input className='input-col1' id='Firstname' maxLength={50} value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            </div>
            <div className='mi-bod'>
              <div className='mi-bod-div'>
                <label htmlFor="MI">M.I.</label>
                <input className='mi-bod-col1' id='MI' maxLength={2} value={mi} onChange={(e) => setMi(e.target.value)} />
              </div>
              <div className='mi-bod-div'>
                <label htmlFor="BOD">Birthdate</label>
                <input className='mi-bod-col1' id='BOD' type='date' value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
              </div>
            </div>
          </div>
          <div className='col-2'>
            <div className='address-div'>
              <label htmlFor="Address">Order Address</label>
              <input className='input-col2' id='Address' maxLength={50} value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className='phone-div'>
              <div>
                <label htmlFor="Phone">Phone number</label>
                <div className='verification-status' style={{ color: isVerified ? 'green' : 'red' }}>
                  {isVerified ? 'Verified' : 'Not Verified'}
                </div>
              </div>
              <div>
                <input
                  className='input-col2'
                  id='Phone'
                  maxLength={13}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  required
                />
                <button id='verify' onClick={handlePhoneVerification}>Verify</button>
              </div>
            </div>
            <div className='email-div'>
              <label htmlFor="Email">Email</label>
              <input className='input-col2' id='Email' maxLength={50} value={userEmail} readOnly />
            </div>
          </div>
        </div>
        <div className='button-sub'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className='otp-modal'>
          <div className='otp-modal-content'>
            <span className='close' onClick={() => setShowOtpModal(false)}>&times;</span>
            <h2>Enter OTP</h2>
            <input
              className='input-otp'
              id='OTP'
              maxLength={6}
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Submit OTP</button>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {showWarning && (
        <div className='warning-modal'>
          <div className='warning-modal-content'>
            <h2>Confirm Submission</h2>
            <p>Are you sure you want to proceed with the provided credentials?</p>
            <button onClick={handleConfirmSubmit}>Yes, Proceed</button>
            <button onClick={() => setShowWarning(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountSetup;
