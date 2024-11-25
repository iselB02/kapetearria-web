import React, { useState, useEffect, useRef } from 'react';
import './AccountSettings.css';
import Footer from './Footer';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../backend/AuthContext';

function AccountSettings() {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    surname: '',
    firstname: '',
    mi: '',
    birthdate: '',
    address: '',
    phone: '',
    email: '',
    verified: false,
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneVerifiedDuringEdit, setPhoneVerifiedDuringEdit] = useState(false);
  const auth = getAuth();
  const recaptchaVerifierRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(database, 'user_info', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setPhoneNumber(data.phone || '');
          setAddress(data.address || '');
          setBirthdate(data.birthdate || '');
          setIsVerified(data.verified || false);
        }
      }
    };
    fetchUserData();
  }, [auth, user]);

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
    setPhoneVerifiedDuringEdit(false);
  };

  const handlePhoneVerification = async () => {
    // Initialize RecaptchaVerifier only when Verify button is clicked
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        'verify',
        {
          size: 'invisible',
          callback: () => console.log('Recaptcha verified'),
        },
        auth
      );
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
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
      setPhoneVerifiedDuringEdit(true);
      alert('Phone verified successfully');
      setShowOtpModal(false);
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Invalid OTP');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setPhoneNumber(userData.phone);
      setAddress(userData.address);
      setBirthdate(userData.birthdate);
      setPhoneVerifiedDuringEdit(isVerified);
    }
  };

  const handleSubmit = async () => {
    if (!address || (!phoneVerifiedDuringEdit && phoneNumber !== userData.phone)) {
      alert('Please verify your phone number before saving changes.');
      return;
    }

    try {
      if (user?.uid) {
        await updateDoc(doc(database, 'user_info', user.uid), {
          address,
          phone: phoneNumber,
          birthdate,
          verified: phoneVerifiedDuringEdit,
        });
        alert('Account details updated successfully!');
        navigate('/home');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data');
    }
  };

  return (
    <div className='main-setup-container'>
      <div className='setup-container'>
        <h1 id='title-account'>Account</h1>
        <div className='columns-setup'>
          <div className='col-1'>
            <div className='surname-div'>
              <label>Surname</label>
              <input className='input-col1' value={userData.surname} readOnly />
            </div>
            <div className='firstname-div'>
              <label>Firstname</label>
              <input className='input-col1' value={userData.firstname} readOnly />
            </div>
            <div className='mi-bod'>
              <div className='mi-bod-div'>
                <label>M.I.</label>
                <input className='mi-bod-col1' value={userData.middleInitial} readOnly />
              </div>
              <div className='mi-bod-div'>
                <label>Birthdate</label>
                <input
                  className='mi-bod-col1'
                  type='date'
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className='col-2'>
            <div className='address-div'>
              <label>Order Address</label>
              <input
                className='input-col2'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className='phone-div'>
              <div>
                <label>Phone number</label>
                <div className='verification-status' style={{ color: isVerified ? 'green' : 'red' }}>
                  {phoneVerifiedDuringEdit ? 'Verified' : 'Not Verified'}
                </div>
              </div>
              <div style={{ display: 'flex', width: isEditing && !phoneVerifiedDuringEdit ? '70%' : '100%' }}>
                <input
                  className='input-col2'
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  disabled={!isEditing}
                  style={{ width: '100%' }}
                />
                {isEditing && !phoneVerifiedDuringEdit && (
                  <button id='verify' onClick={handlePhoneVerification} style={{ marginLeft: '5px' }}>Verify</button>
                )}
              </div>
            </div>
            <div className='email-div'>
              <label>Email</label>
              <input className='input-col2' value={userData.email} readOnly />
            </div>
          </div>
        </div>
        <div className='button-sub'>
          <button onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          {isEditing && <button onClick={handleSubmit}>Save</button>}
        </div>
      </div>
            

      {/* OTP Modal */}
      {showOtpModal && (
        <div className='otp-modal'>
          <div className='otp-modal-content'>
            <span className='close' onClick={() => setShowOtpModal(false)}>&times;</span>
            <h2>Enter OTP</h2>
            <input
              className='input-otp'
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Submit OTP</button>
          </div>
        </div>
      )}
      <div className='footer'>
        <Footer />
      </div>
    </div>
    
  );
}

export default AccountSettings;
