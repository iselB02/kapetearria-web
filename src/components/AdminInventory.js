import React, { useState } from "react";
import "./AdminInventory.css";
import { Link } from "react-router-dom";
import {
    FiSettings,
    FiUser,
    FiShoppingCart,
    FiMessageSquare,
    FiEdit2,
    FiTrash2,
} from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiAccountCircleLine, RiBarChartLine } from "react-icons/ri";

const AdminInventory = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            image: "/image/drink1.png", // Adjusted image path
            name: "Milkshake",
            category: "Snacks",
            price: "₱99.00",
            status: true,
        },
        {
            id: 2,
            image: "/image/drink1.png",
            name: "Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },
        {
            id: 3,
            image: "/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 4,
            image: "/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 5,
            image: "/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 6,
            image: "/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 7,
            image: "/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },
    ]);

    const [editProduct, setEditProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Save edits to a product
    const handleSaveEdit = () => {
        if (
            !editProduct.name.trim() ||
            !editProduct.category.trim() ||
            !editProduct.price.trim()
        ) {
            alert("Please fill out all fields.");
            return;
        }

        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === editProduct.id ? editProduct : product
            )
        );
        setEditProduct(null);
    };

    // Delete a product
    const handleDeleteProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    // Search functionality
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <li className="menu-item active">

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

            {/* Main Content */}
            <main className="inventory-content">
                <div className="inventory-header">
                    <h2>INVENTORY</h2>
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        className="search-bar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="divider"></div>

                <div className="inventory-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    </td>
                                    <td>
                                        {editProduct?.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editProduct.name}
                                                onChange={(e) =>
                                                    setEditProduct({
                                                        ...editProduct,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td>
                                        {editProduct?.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editProduct.category}
                                                onChange={(e) =>
                                                    setEditProduct({
                                                        ...editProduct,
                                                        category: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.category
                                        )}
                                    </td>
                                    <td>
                                        {editProduct?.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editProduct.price}
                                                onChange={(e) =>
                                                    setEditProduct({
                                                        ...editProduct,
                                                        price: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    editProduct?.id === product.id
                                                        ? editProduct.status
                                                        : product.status
                                                }
                                                onChange={() =>
                                                    setEditProduct({
                                                        ...editProduct,
                                                        status: !editProduct?.status,
                                                    })
                                                }
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                    <td>
                                        {editProduct?.id === product.id ? (
                                            <button className="action-btn save-btn" onClick={handleSaveEdit}>
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="action-btn edit-btn"
                                                    onClick={() => setEditProduct(product)}
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    className="action-btn delete-btn"
                                                    onClick={() => handleDeleteProduct(product.id)}
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
                    {filteredProducts.length === 0 && <p>No products found.</p>}
                </div>
            </main>
        </div>
    );
};

export default AdminInventory;
