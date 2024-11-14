import React from 'react';
import './AdminStaff.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';

const AdminStaff = () => {
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

        {/* Main Content of Staff */}
        <div className='main'>
            <div className='head'>
                <div className='headtext'>
                    Staff   
                </div>
            </div>

            <div className='second'>
                {/* Change to Input maya n natamad nako */}
                <div className='search'> 
                    <div className='search-icon'>
                        search
                    </div>
                </div> 
                <nav className='addstaff'>
                <form className='addbutton'>
                    <button class="btn" type="button">Add Staff</button>
                </form>
                </nav>

            </div>

            <div className='staff'>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th className='header-staff' scope="col">#</th>
                    <th className='header-staff' scope="col">First</th>
                    <th className='header-staff' scope="col">Last</th>
                    <th className='header-staff' scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
            </div>


        </div>

        </div>

        
    );
    
};

export default AdminStaff;