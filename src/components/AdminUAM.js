import React from 'react'
import './AdminUAM.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';

const AdminUAM = () => {
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
                        User Accout Management   
                    </div>
                </div>
                <div className='search'> 
                    <div className='search-icon'>
                        search
                    </div>
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
                        <tr className='tr02'>
                            <td >1</td>
                            <td>Mark Otto</td>
                            <td>123 Switzerlan Tondo</td>
                            <td>0912391293</td>
                            <td>See More</td>
                        </tr>
                        <tr className='tr03'>
                            <td>2</td>                         
                            <td>Mirabel De Guzman</td>
                            <td>432 Tokyo, Mandaluyon</td>
                            <td>0912391293</td>
                            <td>See More</td>
                        </tr>
                    </tbody>
                </table>
            </div>



           </div>

    </div>
  )
}

export default AdminUAM
