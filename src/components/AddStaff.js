import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare, FiCamera } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine, RiLogoutBoxRLine, RiStoreLine  } from 'react-icons/ri';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { auth, database } from './firebaseConfig'; // Import Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { signOut } from 'firebase/auth';
import './AddStaff.css';

function AddStaff() {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState("/image/person-circle.svg");
  const [formData, setFormData] = useState({
    firstname: '',
    surname : '',
    email: '',
    phone: '',
    password: '',
    birthdate: '',
    jobtitle: '',
    gender: '',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { email, password, firstname, surname , phone, birthdate, jobtitle, gender } = formData;

    if (!email || !password || !firstname || !surname || !phone || !birthdate || !jobtitle || !gender) {
      alert('Please fill out all fields');
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user info to Firestore using the uid as the document ID
      const userInfo = {
        uid: user.uid,
        firstname,
        surname,
        email,
        phone,
        birthdate,
        gender,
        jobtitle,
        role: jobtitle.toLowerCase(),
        profileImage, // Include the uploaded image
        createdAt: new Date(),
      };

      // Use setDoc with user.uid to set the doc ID
      const userDocRef = doc(database, 'user_info', user.uid);
      await setDoc(userDocRef, userInfo);

      alert('Staff added successfully');
      navigate('/staff'); // Redirect to the staff page
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff: ' + error.message);
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className='admin-container'>
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
          <h6>ADMIN</h6>
        </div>
        <ul className="sidebar-menu">
          <Link to="/admin" className="menu-link">
            <li className="menu-item">
              <AiOutlineDashboard className="icon" /> Dashboard
            </li>
          </Link>
          <Link to="/inventory" className="menu-link">
            <li className="menu-item">
              <FiShoppingCart className="icon" /> Inventory
            </li>
          </Link>
          <Link to="/sales" className="menu-link">
            <li className="menu-item">
              <RiBarChartLine className="icon" /> Sales Reports
            </li>
          </Link>
          <Link to="/staff" className='menu-link'>
            <li className="menu-item active">
              <FiUser className="icon" /> Staff
            </li>
          </Link>
          <Link to="/uam" className='menu-link'>
            <li className="menu-item">
              <RiAccountCircleLine className="icon" /> User Account Management
            </li>
          </Link>
          <Link to="/pos" className='menu-link'>
                        <li className="menu-item">
                            <RiStoreLine className="icon" /> POS
                        </li>
                    </Link>
                    <li onClick={handleLogout} className="menu-item">
                        <RiLogoutBoxRLine className="icon" /> Logout
                    </li>

        </ul>
        <Link to="/settings" className='menu-link'>
          <div className="settings-section">
            <FiSettings className="icon" /> Settings
          </div>
        </Link>
      </aside>

      <div className='add-content'>
        <div className='headest'>
          <div className='header'>Add New Staff</div>
        </div>

        <div className='backStaff'>
          <BsArrowLeftCircleFill size={30} onClick={() => navigate(-1)} />
        </div>

        <div className="profile-section">
          <div className="profile-wrapper">
            <img src={profileImage} alt="Profile" className="add-profile" />
            <input
              type="file"
              id="upload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <label htmlFor="upload" className="upload-btn">
              <FiCamera/>
            </label>
          </div>
        </div>

        <div className='Add-Info'>
          <input
            className='fname'
            name="firstname"
            placeholder='First Name'
            value={formData.firstname}
            onChange={handleInputChange}
          />
          <input
            className='lname'
            name="surname"
            placeholder='Last Name'
            value={formData.surname}
            onChange={handleInputChange}
          />
          <input
            className='em'
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className='pnumber'
            name="phone"
            placeholder='Phone Number'
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            className='pnumber'
            name="password"
            type="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            className='dob'
            type='date'
            name="birthdate"
            placeholder='Date of Birth'
            value={formData.birthdate}
            onChange={handleInputChange}
          />
          <input
            className='pnumber'
            name="jobtitle"
            placeholder='Job Title'
            value={formData.jobtitle}
            onChange={handleInputChange}
          />
          <input
            className='gender'
            name="gender"
            placeholder='Gender'
            value={formData.gender}
            onChange={handleInputChange}
          />
        </div>

        <button className='savebtn' onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default AddStaff;
