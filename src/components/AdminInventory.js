import React from 'react';
import './AdminInventory.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';

const AdminInventory = () => {
    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="sidebar2">
                <div className="sidebar-header">
                    <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
                    <h6>ADMIN</h6>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item">
                        <Link to="/admin" className="menu-link">
                            <AiOutlineDashboard className="icon" /> Dashboard
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/inventory" className="menu-link">
                            <FiShoppingCart className="icon" /> Inventory
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/sales" className="menu-link">
                            <RiBarChartLine className="icon" /> Sales Reports
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/staff" className="menu-link">
                            <FiUser className="icon" /> Staff
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/user-account-management" className="menu-link">
                            <RiAccountCircleLine className="icon" /> User Account Management
                        </Link>
                    </li>
                    <li className="menu-item">
                        <Link to="/chat-support" className="menu-link">
                            <FiMessageSquare className="icon" /> Chat Support
                        </Link>
                    </li>
                </ul>
                <div className="settings-section">
                    <FiSettings className="icon" /> Settings
                </div>
            </aside>
        </div>
    );
};

export default AdminInventory;
