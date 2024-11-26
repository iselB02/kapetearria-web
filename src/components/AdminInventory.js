import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig"; // Import Firestore instance
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import "./AdminInventory.css";
import { Link, useNavigate } from "react-router-dom";
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
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(database, "menu_info");
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().product_name, // Map Firestore's product_name to name
                    type: doc.data().type,
                    price: `₱${doc.data().price}`, // Format price with PHP currency symbol
                    status: doc.data().is_available,
                    image: doc.data().src, // Use src for the image field
                }));
                setProducts(productsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, []);
    

    // Save edits to a product in Firestore
    const handleSaveEdit = async () => {
        if (
            !editProduct.name.trim() ||
            !editProduct.category.trim() ||
            !editProduct.price.trim()
        ) {
            alert("Please fill out all fields.");
            return;
        }

        try {
            const productRef = doc(database, "menu_info", editProduct.id);
            await updateDoc(productRef, {
                name: editProduct.name,
                type: editProduct.category,
                price: editProduct.price,
                status: editProduct.status,
            });

            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === editProduct.id ? editProduct : product
                )
            );
            setEditProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // Toggle the status of a product
        const toggleProductStatus = async (id) => {
        const product = products.find((p) => p.id === id);
        if (!product) return;
    
        try {
            const productRef = doc(database, "menu_info", id);
            const newStatus = !product.status;
    
            // Update Firestore
            await updateDoc(productRef, { is_available: newStatus });
    
            // Update local state
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === id ? { ...product, status: newStatus } : product
                )
            );
        } catch (error) {
            console.error("Error toggling product status:", error);
        }
    };
    

    // Delete a product from Firestore
    const handleDeleteProduct = async (id) => {
        try {
            const productRef = doc(database, "menu_info", id);
            await deleteDoc(productRef);

            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== id)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Search functionality
    const filteredProducts = products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
                    <Link to="/staff" className="menu-link">
                        <li className="menu-item">
                            <FiUser className="icon" /> Staff
                        </li>
                    </Link>
                    <Link to="/uam" className="menu-link">
                        <li className="menu-item">
                            <RiAccountCircleLine className="icon" /> User Account Management
                        </li>
                    </Link>
                    <Link to="/chat-support" className="menu-link">
                        <li className="menu-item">
                            <FiMessageSquare className="icon" /> Chat Support
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
            <main className="main-content">
                <div className="header-rectangle">
                    <div className="headtext">Inventory</div>
                </div>
                <div className="inventory-header">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        className="search2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="add-product-rectangle"
                        onClick={() => navigate("/add")}
                    >
                        Add Product
                    </button>
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
                                            product.type
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
                                                checked={product.status}
                                                onChange={() => toggleProductStatus(product.id)}
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
