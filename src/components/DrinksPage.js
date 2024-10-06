import React, { useState } from 'react';
import './DrinksPage.css';
import Footer from './Footer'; // Import Footer component

// Full Drinks Data
const drinksData = [
    { category: 'Iced Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
        { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Toffee Caramel', price: 89.00, src: '/image/drink1.png' },
        { name: 'Double Dutch', price: 89.00, src: '/image/drink1.png' }
    ]},
    { category: 'Hot Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
        { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caffe Americano', price: 89.00, src: '/image/drink1.png' },
        { name: 'Double Dutch', price: 89.00, src: '/image/drink1.png' }
    ]},
    { category: 'Chocolate Frappe', drinks: [
        { name: 'Dark Chocolate', price: 109.00, src: '/image/drink1.png' },
        { name: 'Milk Chocolate', price: 109.00, src: '/image/drink1.png' },
        { name: 'Chocolate Hazelnut', price: 109.00, src: '/image/drink1.png' },
        { name: 'Chocolate Truffles', price: 109.00, src: '/image/drink1.png' },
        { name: 'Chocolate Kisses', price: 109.00, src: '/image/drink1.png' },
        { name: 'Mocha', price: 109.00, src: '/image/drink1.png' }
    ]},
    { category: 'Frappuccino', drinks: [
        { name: 'Caramel Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Java Chip Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Mocha Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'White Mocha Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Double Chocolate Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Strawberry Frappuccino', price: 119.00, src: '/image/drink1.png' }
    ]},
    { category: 'Milk Tea', drinks: [
        { name: 'Classic Milk Tea', price: 99.00, src: '/image/drink1.png' },
        { name: 'Wintermelon Milk Tea', price: 99.00, src: '/image/drink1.png' },
        { name: 'Taro Milk Tea', price: 99.00, src: '/image/drink1.png' },
        { name: 'Matcha Milk Tea', price: 99.00, src: '/image/drink1.png' },
        { name: 'Hokkaido Milk Tea', price: 99.00, src: '/image/drink1.png' },
        { name: 'Okinawa Milk Tea', price: 99.00, src: '/image/drink1.png' }
    ]},
    { category: 'Lemonades', drinks: [
        { name: 'Classic Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Strawberry Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Blueberry Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mango Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Peach Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Lime Lemonade', price: 89.00, src: '/image/drink1.png' }
    ]}
];

// Mock Order History Data
const orderHistoryData = [
    { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
    { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
    { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
    { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' }
];

// Search Bar Component
const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Drinks"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className="search-btn"></button>
        </div>
    );
};

// Order History Component
const OrderHistory = ({ orderHistory, searchQuery }) => {
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
                    <p>No matching orders found.</p>
                )}
            </div>
        </div>
    );
};

// Modal Component for Product Customization
const ProductModal = ({ product, isVisible, onClose }) => {
    if (!isVisible) return null; // Don't render the modal if not visible

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>X</button>
                <h2>{product.name}</h2>
                <p>A delicious blend of {product.name}.</p>
                
                {/* Sizes */}
                <div className="sizes-section">
                    <h3>Sizes</h3>
                    <div className="size-options">
                        <button className="size-option">12oz - ₱79.00</button>
                        <button className="size-option">8oz - ₱59.00</button>
                    </div>
                </div>

                {/* Add Ons */}
                <div className="add-ons-section">
                    <h3>Add Ons</h3>
                    <div className="add-ons-options">
                        <button className="addon-option">Espresso Shot - ₱30.00</button>
                        <button className="addon-option">Coffee Jelly - ₱20.00</button>
                        <button className="addon-option">Popping Boba - ₱20.00</button>
                        <button className="addon-option">Pearl - ₱20.00</button>
                    </div>
                </div>

                {/* Sugar Level */}
                <div className="sugar-level-section">
                    <h3>Sugar Level</h3>
                    <div className="sugar-options">
                        <button className="sugar-option">25%</button>
                        <button className="sugar-option">50%</button>
                        <button className="sugar-option">75%</button>
                        <button className="sugar-option">100%</button>
                    </div>
                </div>

                <button className="add-to-cart-btn">Add to Cart</button>
                <button className="cancel-btn" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

const DrinksPage = () => {
    const [activeCategory, setActiveCategory] = useState('Iced Coffee'); // Track active category
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
    const [selectedProduct, setSelectedProduct] = useState(null); // Product selected for customization

    const selectCategory = (category) => {
        setActiveCategory(category);
    };

    const openModal = (product) => {
        setSelectedProduct(product); // Set selected product
        setIsModalVisible(true); // Show modal
    };

    const closeModal = () => {
        setIsModalVisible(false); // Close modal
        setSelectedProduct(null); // Clear selected product
    };

    const activeCategoryData = drinksData.find(category => category.category === activeCategory);

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

            <div className="drinks-page">
                <h1>Our Drinks</h1>

                {/* Scrollable Menu */}
                <div className="category-nav-wrapper">
                    {drinksData.map((category, index) => (
                        <button
                            key={index}
                            className={`category-item ${activeCategory === category.category ? 'active' : ''}`}
                            onClick={() => selectCategory(category.category)}
                        >
                            {category.category}
                        </button>
                    ))}
                </div>

                {/* Drink List Section */}
                <div className="drink-category">
                    <h2>{activeCategoryData.category}</h2>
                    <div className="drink-items">
                        {activeCategoryData.drinks.map((drink, i) => (
                            <div key={i} className="drink-item">
                                <img src={drink.src} alt={drink.name} className="drink-img" />
                                <div className="drink-info">
                                    <div className="drink-name-price">
                                        <p className="drink-name">{drink.name}</p>
                                        <p className="drink-price">₱{drink.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <button className="add-btn" onClick={() => openModal(drink)}>+</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Pop-up for product customization */}
            <ProductModal 
                product={selectedProduct}
                isVisible={isModalVisible}
                onClose={closeModal}
            />

            <Footer /> {/* Add Footer component here */}
        </>
    );
};

export default DrinksPage;
