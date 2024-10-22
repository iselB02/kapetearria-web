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

                <div className="dashboard-overview">
                    <div className="overview-card alert">
                        <div className="card-header">
                            <p>LOW INVENTORY</p>
                            <button>X</button>
                        </div>
                        <p>Inventory Level is LOW. Contact Manager now.</p>
                        <a href="/">Learn more &gt;</a>
                    </div>
                    <div className="overview-card success">
                        <div className="card-header">
                            <p>BOBA MILKTEA</p>
                            <button>X</button>
                        </div>
                        <p>67 Customers bought this item. Keep up!</p>
                        <a href="/">Learn more &gt;</a>
                    </div>
                    <div className="overview-card info">
                        <div className="card-header">
                            <p>NET WORTH</p>
                            <button>X</button>
                        </div>
                        <p>Daily income of the store</p>
                        <a href="/">Learn more &gt;</a>
                    </div>
                    <div className="overview-card warning">
                        <div className="card-header">
                            <p>DELIVERY PENDING</p>
                            <button>X</button>
                        </div>
                        <p>1 Matcha Latte, 1 Carrot Cake</p>
                        <a href="/">Learn more &gt;</a>
                    </div>
                </div>

                {/* Visitor Chart (Placeholder for chart.js or similar library) */}
                <div className="visitor-chart">
                    <h2>Daily Visitors</h2>
                    {/* Chart would go here, you can use libraries like Chart.js */}
                    <div className="chart-placeholder">
                        <p>Chart Placeholder</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
