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

        {/* Main Content of Staff */}
        <div className='main-content'>
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
                    <button className="btn" type="button">Add Staff</button>
                </form>
                </nav>

            </div>

            <div className="staff">
                <table className="table">
                    <thead>
                        <tr className='tr1'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>DTR</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='tablebody'>
                        <tr className='tr2'>
                            <td >1</td>
                            <td>Mark Otto</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr3'>
                            <td>2</td>
                            <td>Jacob Batungbakal</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr4'>
                            <td >3</td>
                            <td>DingDong Dantes</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr5'>
                            <td >4</td>
                            <td>Anna Curtis</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr6'>
                            <td >5</td>
                            <td>Johny Johny yes</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr7'>
                            <td >6</td>
                            <td>James Reid</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr8'> 
                            <td >7</td>
                            <td>Ariana Grande</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr9'>
                            <td >8</td>
                            <td>Ed Sheeran</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr10'>
                            <td >9</td>
                            <td>Taylor Swift</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                        <tr className='tr11'>
                            <td >10</td>
                            <td>Charlie Chaplin</td>
                            <td>Barista</td>
                            <td>Date</td>
                            <td>Status</td>
                            <td>Action</td>
                        </tr>
                    </tbody>
                </table>
            </div>



        </div>

        </div>

        
    );
    
};

export default AdminStaff;