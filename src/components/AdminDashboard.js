import React from 'react';
import './AdminDashboard.css'; // Import the corresponding CSS
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';

const AdminDashboard = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
                    <h6>ADMIN</h6>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item active">
                        <AiOutlineDashboard className="icon" /> Dashboard
                    </li>
                    <li className="menu-item">
                        <FiShoppingCart className="icon" /> Inventory
                    </li>
                    <li className="menu-item">
                        <RiBarChartLine className="icon" /> Sales Reports
                    </li>
                    <li className="menu-item">
                        <FiUser className="icon" /> Staff
                    </li>
                    <li className="menu-item">
                        <RiAccountCircleLine className="icon" /> User Account Management
                    </li>
                    <li className="menu-item">
                        <FiMessageSquare className="icon" /> Chat Support
                    </li>
                </ul>
                <div className="settings-section">
                    <FiSettings className="icon" /> Settings
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <div className="top-bar">
                    <input type="text" placeholder="Search" className="search-bar" />
                    <button className="profile-btn">Profile</button>
                </div>

                {/* Visitor Chart (Placeholder for chart.js or similar library) */}
                <div className="visitor-chart">
                    <h2>Daily Visitors</h2>
                   
                    <div className="chart-placeholder">
                        <p>Chart Placeholder</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
