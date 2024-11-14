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
            image: "public/image/drink1.png",
            name: "Nachos",
            category: "Snacks",
            price: "₱99.00",
            status: true,
        },
        {
            id: 2,
            image: "public/image/drink1.png",
            name: "Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },
        {
            id: 3,
            image: "public/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 4,
            image: "public/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 5,
            image: "public/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },

        {
            id: 6,
            image: "public/image/drink1.png",
            name: "Spanish Latte",
            category: "Beverages",
            price: "₱150.00",
            status: true,
        },


    ]);

   // State to track the product being edited
   const [editProduct, setEditProduct] = useState(null);

   // Update the product in the list
   const handleSaveEdit = () => {
       setProducts((prevProducts) =>
           prevProducts.map((product) =>
               product.id === editProduct.id ? editProduct : product
           )
       );
       setEditProduct(null); // Exit edit mode
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
               <div className="divider"></div>
               <div className="settings-section">
                   <FiSettings className="icon" /> Settings
               </div>
           </aside>

           {/* Main Content */}
           <main className="inventory-content">
               <div className="inventory-header">
                   <h2>INVENTORY</h2>
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
                           {products.map((product) => (
                               <tr key={product.id}>
                                   <td>
                                       <img src={product.image} alt={product.name} className="product-image" />
                                   </td>
                                   <td>
                                       {editProduct?.id === product.id ? (
                                           <input
                                               type="text"
                                               value={editProduct.name}
                                               onChange={(e) =>
                                                   setEditProduct({ ...editProduct, name: e.target.value })
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
                                                   setEditProduct({ ...editProduct, category: e.target.value })
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
                                                   setEditProduct({ ...editProduct, price: e.target.value })
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
                                                   onClick={() =>
                                                       setProducts((prevProducts) =>
                                                           prevProducts.filter((p) => p.id !== product.id)
                                                       )
                                                   }
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
           </main>
       </div>
   );
};

export default AdminInventory;