import React, { useEffect, useState } from 'react';
import './AdminUAM.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import CustomerInfo from './CustomerInfo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from './firebaseConfig'; // Adjust path to Firebase config

const AdminUAM = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]); // State to hold customer data
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customers with role 'customer' from Firestore
    const fetchCustomers = async () => {
      try {
        const userCollectionRef = collection(database, 'user_info');
        const q = query(userCollectionRef, where('role', '==', 'customer'));
        const querySnapshot = await getDocs(q);

        const customers = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUsers(customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleSeeMore = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  // Filter users based on the search query
const filteredUsers = users.filter(
  (user) =>
    user.firstname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.surname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address?.toLowerCase().includes(searchQuery.toLowerCase())
);


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
                </ul>
                <Link to="/settings" className='menu-link'>
                    <div className="settings-section">
                        <FiSettings className="icon" /> Settings
                    </div>
                </Link>
            </aside>

      <div className="main-content">
        <div className="head">
          <div className="headtext">User Account Management</div>
        </div>
        <div className="search-head">
          <input
            className="search"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="user">
          <table className="tablee">
            <thead>
              <tr className="tr01">
                <th>ID</th>
                <th>Name</th>
                <th>Order Address</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="tr02">
                  <td>{user.id}</td>
                  <td>{`${user.firstname} ${user.surname}`}</td>
                  <td>{user.address || 'N/A'}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btnUAM" onClick={() => handleSeeMore(user)}>
                      See More
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      <CustomerInfo isOpen={isModalOpen} onClose={handleCloseModal} user={selectedUser} />
    </div>
  );
};

export default AdminUAM;
