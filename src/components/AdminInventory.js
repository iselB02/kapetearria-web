import React, { useState } from "react";
import "./AdminInventory.css";
import { Link } from "react-router-dom";
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare, FiEdit2, FiTrash2 } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiAccountCircleLine, RiBarChartLine } from "react-icons/ri";

const AdminInventory = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            image: "public\image\drink1.png",
            name: "Nachos",
            category: "Snacks",
            price: "₱99.00",
            status: true,
        },
        {
            id: 2,
            image: "public\image\drink1.png",
            name: "Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 3,
            image: "public\image\drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 4,
            image: "public\image\drink1.png",
            name: "Strawberry Drink",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 5,
            image: "public\image\drink1.png",
            name: "Strawberry Milkshake",
            category: "Beverages",
            price: "₱150.00",
            status: false,
        },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        price: "",
        status: true,
    });

    const [newImage, setNewImage] = useState(null);

    // Add a new product
    const handleAddProduct = () => {
        if (!newImage || !newProduct.name || !newProduct.category || !newProduct.price) {
            alert("Please fill out all fields and upload an image.");
            return;
        }

        const newProductData = {
            id: products.length + 1,
            image: URL.createObjectURL(newImage), // Simulate image upload
            ...newProduct,
        };

        setProducts([...products, newProductData]);
        setNewProduct({ name: "", category: "", price: "", status: true });
        setNewImage(null);
    };

    // Toggle product status
    const handleStatusToggle = (id) => {
        const updatedProducts = products.map((product) =>
            product.id === id ? { ...product, status: !product.status } : product
        );
        setProducts(updatedProducts);
    };

    // Delete a product
    const handleDeleteProduct = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
    };

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
                    <li className="menu-item active">
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

            {/* Main Content */}
            <main className="inventory-content">
                <div className="inventory-header">
                    <h2>INVENTORY</h2>
                    <button className="add-product-btn" onClick={handleAddProduct}>
                        + Add Product
                    </button>
                </div>
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
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <img src={product.image} alt={product.name} className="product-image" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={product.status}
                                                onChange={() => handleStatusToggle(product.id)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button className="action-btn edit-btn">
                                            <FiEdit2 />
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminInventory;
