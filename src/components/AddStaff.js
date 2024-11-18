import React from 'react'
import './AddStaff.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';

function AddStaff() {
  return (
    <div className='add-staff'>
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

            
    </div>
  )
}

export default AddStaff
