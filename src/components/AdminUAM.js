import React, { useState } from 'react';
import './AdminUAM.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import CustomerInfo from './CustomerInfo';

const AdminUAM = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSeeMore = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const users = [
    { id: 1, name: 'Mark Otto', address: '123 Switzerlan Tondo', contact: '0912391293', email: 'markotto@gmail.com' },
    { id: 2, name: 'Mirabel De Guzman', address: '432 Tokyo, Mandaluyon', contact: '0912391293', email: 'mirabel@gmail.com' },
  ];

  return (
    <div className='admin-container'>
           {/* Sidebar */}
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
            <li className="menu-item">
            <FiUser className="icon" /> Staff
            </li>
          </Link>
          <Link to="/uam" className='menu-link'>
            <li className="menu-item active">
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

      <div className='main-content'>
        <div className='head'>
          <div className='headtext'>
            User Account Management
          </div>
        </div>
        <div className='search-head'>
          <input className='search' placeholder='Search' />
        </div>
        <div className="user">
          <table className="tablee">
            <thead>
              <tr className='tr01'>
                <th>ID</th>
                <th>Name</th>
                <th>Order Address</th>
                <th>Contact Number</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className='tr02'>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.contact}</td>
                  <td>
                    <button className='btnUAM' onClick={() => handleSeeMore(user)}>See More</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerInfo isOpen={isModalOpen} onClose={handleCloseModal} user={selectedUser} />
    </div>
  );
};

export default AdminUAM;