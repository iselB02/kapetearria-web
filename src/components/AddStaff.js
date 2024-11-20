import React, { useState } from 'react';
import './AddStaff.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';

function AddStaff() {
  const [profileImage, setProfileImage] = useState("/image/shrek.png");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
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
          <Link to="/chat-support" className='menu-link'>
            <li className="menu-item">
              <FiMessageSquare className="icon" /> Chat Support
            </li>
          </Link>
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
            <label htmlFor="upload" className="upload-btn">Upload</label>
          </div>
        </div>

        <div className='Add-Info'>
          <input className='fname' placeholder='First Name' />
          <input className='lname' placeholder='Last Name' />
          <input className='em' placeholder='Email' />
          <input className='pnumber' placeholder='Phone Number' />
          <input className='dob' placeholder='Date of Birth' />
          <input className='gender' placeholder='Gender' />
        </div>

        <button className='savebtn'>Save</button>
      </div>
    </div>
  );
}

export default AddStaff;
