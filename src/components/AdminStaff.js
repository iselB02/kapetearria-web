import React, { useState } from "react";
import "./AdminStaff.css";
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiShoppingCart } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiAccountCircleLine, RiBarChartLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminStaff = () => {
  const navigate = useNavigate();

  // Dummy staff data
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Mark Otto",
      jobTitle: "Barista",
      status: true,
      image: "image/shrek.png",
    },
    {
      id: 2,
      name: "Jacob Batungbakal",
      jobTitle: "Barista",
      status: false,
      image: "image/shrek.png",
    },
    {
      id: 3,
      name: "DingDong Dantes",
      jobTitle: "Barista",
      status: true,
      image: "image/shrek.png",
    },
  ]);

  const [editStaff, setEditStaff] = useState(null);

  // Handle edit functionality
  const handleEdit = (staffMember) => {
    setEditStaff(staffMember); // Open editing for this staff member
  };

  const handleSaveEdit = () => {
    setStaff((prevStaff) =>
      prevStaff.map((member) =>
        member.id === editStaff.id ? editStaff : member
      )
    );
    setEditStaff(null); // Close editing
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaff((prevStaff) => prevStaff.filter((member) => member.id !== id));
    }
  };

  const handleAddStaff = () => {
    navigate("/add-staff");
  };

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
        <Link to="/settings" className="menu-link">
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
          <input className="search" placeholder="Search" />
          <nav className="addstaff">
            <form className="addbutton">
              <button
                className="btnadd"
                type="button"
                onClick={handleAddStaff}
              >
                Add Staff
              </button>
            </form>
          </nav>
        </div>

        <div className="staff">
          <table className="table">
            <thead>
              <tr className="tr1">
                <th>Image</th>
                <th>Name</th>
                <th>Job Title</th>
                <th>DTR</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {staff.map((member) => (
                <tr key={member.id} className={`tr${member.id}`}>
                  <td>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="staff-image"
                    />
                  </td>
                  <td>
                    {editStaff?.id === member.id ? (
                      <input
                        type="text"
                        value={editStaff.name}
                        onChange={(e) =>
                          setEditStaff({ ...editStaff, name: e.target.value })
                        }
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td>
                    {editStaff?.id === member.id ? (
                      <input
                        type="text"
                        value={editStaff.jobTitle}
                        onChange={(e) =>
                          setEditStaff({
                            ...editStaff,
                            jobTitle: e.target.value,
                          })
                        }
                      />
                    ) : (
                      member.jobTitle
                    )}
                  </td>
                  <td>Date</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={member.status}
                        onChange={() =>
                          setStaff((prevStaff) =>
                            prevStaff.map((m) =>
                              m.id === member.id
                                ? { ...m, status: !m.status }
                                : m
                            )
                          )
                        }
                      />
                    </div>
                  </td>
                  <td>
                    {editStaff?.id === member.id ? (
                      <button
                        className="btnsave"
                        onClick={handleSaveEdit}
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(member)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(member.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStaff;
