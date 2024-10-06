import React, { useState } from 'react';
import './Snacks.css';
import Footer from './Footer'; // Import Footer component

// Full Snacks Data
const snacksData = [
    { 
        category: 'Finger Lickn Snacks', 
        snacks: [
            { name: 'Fries', price: 99.00, src: '/image/fries.png' }, 
            { name: 'Caramel Pudding', price: 89.00, src: '/image/snack_caramel_pudding.png' },
            { name: 'Nachos', price: 89.00, src: '/image/snack_nachos.png' },
            { name: 'Potato Wedges', price: 89.00, src: '/image/snack_potato_wedges.png' },
            { name: 'Onion Rings', price: 89.00, src: '/image/snack_onion_rings.png' },
            { name: 'Cheese Sticks', price: 89.00, src: '/image/snack_cheese_sticks.png' }
        ]
    },
    { 
        category: 'Sweet Treats', 
        snacks: [
            { name: 'Chocolate Cake', price: 89.00, src: '/image/snack_chocolate_cake.png' },
            { name: 'Cupcake', price: 89.00, src: '/image/snack_cupcake.png' },
            { name: 'Ice Cream', price: 89.00, src: '/image/snack_ice_cream.png' },
            { name: 'Donut', price: 89.00, src: '/image/snack_donut.png' },
            { name: 'Cookies', price: 89.00, src: '/image/snack_cookies.png' },
            { name: 'Brownies', price: 89.00, src: '/image/snack_brownies.png' }
        ]
    }
];

// Mock Order History Data (For snacks)
const orderHistoryData = [
    { name: 'Fries', price: 99.00, src: '/image/fries.png' },
    { name: 'Caramel Pudding', price: 89.00, src: '/image/snack_caramel_pudding.png' },
    { name: 'Nachos', price: 89.00, src: '/image/snack_nachos.png' },
    { name: 'Potato Wedges', price: 89.00, src: '/image/snack_potato_wedges.png' }
];

// Search Bar Component
const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Snacks"
                value={query}
                onChange={(e) => onSearch(e.target.value)} // Capture user input for search
            />
            <button className="search-btn"></button>
        </div>
    );
};

// Order History Component (For snacks)
const OrderHistory = ({ orderHistory, searchQuery }) => {
    // Filter the order history based on the search query for snacks
    const filteredOrders = orderHistory.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="order-history">
            <div className="order-history-header">
                <h2>Order History <span className="order-history-menu">...</span></h2>
            </div>
            <div className="order-history-items">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order, index) => (
                        <div key={index} className="order-item">
                            <img src={order.src} alt={order.name} className="order-img" />
                            <div className="order-info">
                                <p className="order-name">{order.name}</p>
                                <p className="order-price">₱{order.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No matching orders found.</p> // Message if no orders match the search
                )}
            </div>
        </div>
    );
};

const SnacksPage = () => {
    const [activeCategory, setActiveCategory] = useState('Finger Lickn Snacks'); // Track active category
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    const selectCategory = (category) => {
        setActiveCategory(category); // Set the clicked category as active
    };

    const activeCategoryData = snacksData.find(category => category.category === activeCategory);

    return (
        <>
            <header className="store-header">
                <img src="/image/storeimage.jpg" alt="Kape Tearria Store" className="store-image" />
            </header>

            {/* Search Bar Component */}
            <div className="search-container">
                <SearchBar query={searchQuery} onSearch={setSearchQuery} />
            </div>

            {/* Order History Section */}
            <OrderHistory orderHistory={orderHistoryData} searchQuery={searchQuery} />

            <div className="snacks-page">
                <h1>Our Snacks</h1>

                {/* Scrollable Category Navigation */}
                <div className="category-nav-wrapper">
                    {snacksData.map((category, index) => (
                        <button
                            key={index}
                            className={`category-item ${activeCategory === category.category ? 'active' : ''}`}
                            onClick={() => selectCategory(category.category)}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Snack List Section */}
                <div className="snack-category">
                    <h2>{activeCategoryData.category}</h2>
                    <div className="snack-items">
                        {activeCategoryData.snacks.map((snack, i) => (
                            <div key={i} className="snack-item">
                                <img src={snack.src} alt={snack.name} className="snack-img" />
                                <div className="snack-info">
                                    <div className="snack-name-price">
                                        <p className="snack-name">{snack.name}</p>
                                        <p className="snack-price">₱{snack.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button className="add-btn">+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer /> {/* Add Footer component here */}
        </>
    );
};

export default SnacksPage;
