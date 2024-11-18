import React from 'react';
import './AdminStaff.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


const handleEdit = (name) => {
  // Open the modal or populate a form with the data of the staff member
  console.log(`Editing ${name}`);
};

const handleDelete = (name) => {
  // Perform the delete action (e.g., show confirmation or call an API to delete the staff member)
  if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      console.log(`Deleting ${name}`);
  }
};

const AdminStaff = () => {
  const navigate = useNavigate();

    const handleAddStaff = () => {
        navigate('/add-staff');  // Adjust the path as needed
    };

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
                    <input className='search' placeholder='Search' />
                    <nav className='addstaff'>
                        <form className='addbutton'>
                            <button className="btnadd" type="button" onClick={handleAddStaff}>Add Staff</button>
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
                                <td>
                                    <img src="image/shrek.png" alt="Mark Otto" className="staff-image" />
                                </td>
                                <td>Mark Otto</td>
                                <td>Barista</td>
                                <td>Date</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                    </div>
                                </td>
                                <td>
                                    {/* Action Buttons with Icons */}
                                    <button className="btn btn-edit" onClick={() => handleEdit('Mark Otto')}>
                                        <FiEdit /> {/* Edit Icon */}
                                    </button>
                                    <button className="btn btn-delete" onClick={() => handleDelete('Mark Otto')}>
                                        <FiTrash2 /> {/* Delete Icon */}
                                    </button>
                                </td>
                            </tr>
                            <tr className='tr3'>
                                <td>
                                    <img src="image/shrek.png" alt="Jacob Batungbakal" className="staff-image" />
                                </td>
                                <td>Jacob Batungbakal</td>
                                <td>Barista</td>
                                <td>Date</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault2" />
                                    </div>
                                </td>
                                <td>
                                    {/* Action Buttons with Icons */}
                                    <button className="btn btn-edit" onClick={() => handleEdit('Mark Otto')}>
                                        <FiEdit /> {/* Edit Icon */}
                                    </button>
                                    <button className="btn btn-delete" onClick={() => handleDelete('Mark Otto')}>
                                        <FiTrash2 /> {/* Delete Icon */}
                                    </button>
                                </td>
                            </tr>
                            <tr className='tr4'>
                                <td>
                                    <img src="image/shrek.png" alt="DingDong Dantes" className="staff-image" />
                                </td>
                                <td>DingDong Dantes</td>
                                <td>Barista</td>
                                <td>Date</td>
                                <td>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault3" />
                                    </div>
                                </td>
                                <td>
                                    {/* Action Buttons with Icons */}
                                    <button className="btn btn-edit" onClick={() => handleEdit('Mark Otto')}>
                                        <FiEdit /> {/* Edit Icon */}
                                    </button>
                                    <button className="btn btn-delete" onClick={() => handleDelete('Mark Otto')}>
                                        <FiTrash2 /> {/* Delete Icon */}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminStaff;
