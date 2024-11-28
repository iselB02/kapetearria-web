import React, { useEffect, useState } from 'react';
import { doc, deleteDoc, getDocs, updateDoc, where, query, collection } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiShoppingCart } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiAccountCircleLine, RiBarChartLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./AdminStaff.css";

const AdminStaff = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [editStaff, setEditStaff] = useState(null); // State to hold the staff being edited
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all users with the role 'staff' from Firestore
    const fetchStaff = async () => {
      try {
        const userCollectionRef = collection(database, 'user_info');
        const q = query(userCollectionRef, where('role', 'in', ['staff', 'manager', 'Manager', 'Staff']));
        const querySnapshot = await getDocs(q);

        const staff = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStaffList(staff);
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

    fetchStaff();
  }, []);

  // Save edits to the exact user in Firestore
  const handleSaveEdit = async () => {
    if (
      !editStaff.firstname.trim() ||
      !editStaff.surname.trim() ||
      !editStaff.jobtitle.trim()
    ) {
      alert('Please fill out all required fields.');
      return;
    }
  
    try {
      // Construct updated data without the 'status' field
      const updatedData = {
        firstname: editStaff.firstname,
        surname: editStaff.surname,
        jobtitle: editStaff.jobtitle,
      };
  
      const staffRef = doc(database, 'user_info', editStaff.id);
      await updateDoc(staffRef, updatedData);
  
      // Update the local state with the changes
      setStaffList((prevStaff) =>
        prevStaff.map((staff) =>
          staff.id === editStaff.id ? { ...staff, ...updatedData } : staff
        )
      );
      setEditStaff(null); // Exit edit mode
      alert('Staff updated successfully!');
    } catch (error) {
      console.error('Error updating staff:', error);
      alert('Error updating staff: ' + error.message);
    }
  };
  
  // Delete a staff member
  const handleDeleteStaff = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        const staffRef = doc(database, 'user_info', id);
        await deleteDoc(staffRef);

        setStaffList((prevStaff) =>
          prevStaff.filter((staff) => staff.id !== id)
        );
        alert('Staff deleted successfully!');
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  // Toggle the status of a staff member
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const staffRef = doc(database, 'user_info', id);
      const newStatus = !currentStatus;

      await updateDoc(staffRef, { status: newStatus });

      setStaffList((prevStaff) =>
        prevStaff.map((staff) =>
          staff.id === id ? { ...staff, status: newStatus } : staff
        )
      );
    } catch (error) {
      console.error('Error toggling staff status:', error);
    }
  };

  // Filter staff based on search query
  const filteredStaff = staffList.filter((staff) =>
    `${staff.firstname} ${staff.surname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <img
            src="/image/logo.png"
            alt="Kape Tearria Admin"
            className="logo"
          />
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
          <Link to="/staff" className="menu-link">
            <li className="menu-item active">
              <FiUser className="icon" /> Staff
            </li>
          </Link>
          <Link to="/uam" className="menu-link">
            <li className="menu-item">
              <RiAccountCircleLine className="icon" /> User Account Management
            </li>
          </Link>
        </ul>
        <Link to="/my-account" className="menu-link">
          <div className="settings-section">
            <FiSettings className="icon" /> Settings
          </div>
        </Link>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <div className="head">
          <div className="headtext">Staff</div>
        </div>

        <div className="second">
          <input
            className="search"
            placeholder="Search staff by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btnadd" type="button" onClick={() => navigate('/add-staff')}>
            Add Staff
          </button>
        </div>

        <div className="staff">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <img
                      src={staff.profileImage || '/image/person-circle.svg'}
                      alt={`${staff.firstname} ${staff.surname}`}
                      className="staff-image"
                    />
                  </td>
                  <td>
                    {editStaff?.id === staff.id ? (
                      <input
                        type="text"
                        value={editStaff.firstname}
                        onChange={(e) =>
                          setEditStaff({ ...editStaff, firstname: e.target.value })
                        }
                      />
                    ) : (
                      `${staff.firstname} ${staff.surname}`
                    )}
                  </td>
                  <td>
                    {editStaff?.id === staff.id ? (
                      <input
                        type="text"
                        value={editStaff.jobtitle}
                        onChange={(e) =>
                          setEditStaff({ ...editStaff, jobtitle: e.target.value })
                        }
                      />
                    ) : (
                      staff.jobtitle || 'N/A'
                    )}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={staff.status || false}
                      onChange={() => handleToggleStatus(staff.id, staff.status)}
                    />
                  </td>
                  <td>
                    {editStaff?.id === staff.id ? (
                      <button className="save-btn" onClick={handleSaveEdit}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="edit-btn"
                          onClick={() => setEditStaff(staff)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteStaff(staff.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {filteredStaff.length === 0 && (
                <tr>
                  <td colSpan="5">No staff members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
