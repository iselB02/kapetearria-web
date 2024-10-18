import React, { useState } from 'react';
import './MenuProducts.css'
import Navbar from './Navbar';
import Banner from './Banner';


// Full Drinks Data
const drinksData = [
    { category: 'Iced Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
        { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Toffee Caramel', price: 89.00, src: '/image/drink1.png' },
        { name: 'Double Dutch', price: 89.00, src: '/image/drink1.png' },
        
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

const orderHistoryData = [
    { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
    { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
    { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
    { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' }
];


// Order History Component
const OrderHistory = ({ orderHistory, searchQuery }) => {
    const filteredOrders = orderHistory.filter(order =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="order-history-content">
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

const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Drinks"
                value={query}
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className="search-btn" type='sumnit'>Search</button>
        </div>
    );
};

const AddOns = () => {
    const [selectedAddOns, setSelectedAddOns] = useState([]);
  
    const addOns = [
      { name: 'Espresso Shot', price: 30 },
      { name: 'Coffee Jelly', price: 20 },
      { name: 'Popping Boba', price: 20 },
      { name: 'Pearl', price: 20 },
    ];
  
    const handleAddOnClick = (addOn) => {
      if (selectedAddOns.includes(addOn)) {
        // Remove add-on if already selected
        setSelectedAddOns(selectedAddOns.filter(item => item !== addOn));
      } else {
        // Add add-on if not selected
        setSelectedAddOns([...selectedAddOns, addOn]);
      }
    };
}// Modal Component for Product Customization
const ProductModal = ({ product, isVisible, onClose }) => {
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [selectedSize, setSelectedSize] = useState('12oz'); // Default to the first size
    const [selectedSugar, setSelectedSugar] = useState('25%'); // Default to the first sugar level

    const addOns = [
        { name: 'Espresso Shot', price: 30 },
        { name: 'Coffee Jelly', price: 20 },
        { name: 'Popping Boba', price: 20 },
        { name: 'Pearl', price: 20 },
    ];

    const sizes = [
        { name: '12oz', price: 79 },
        { name: '8oz', price: 59 },
    ];

    const sugarLevels = ['25%', '50%', '75%', '100%'];

    const handleAddOnClick = (addOn) => {
        if (selectedAddOns.includes(addOn)) {
            setSelectedAddOns(selectedAddOns.filter(item => item !== addOn));
        } else {
            setSelectedAddOns([...selectedAddOns, addOn]);
        }
    };

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
                        {sizes.map((size, index) => (
                            <button
                                key={index}
                                className={`size-option ${selectedSize === size.name ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size.name)}
                            >
                                {`${size.name} - ₱${size.price.toFixed(2)}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Ons */}
                <div className="add-ons-section">
                    <h3>Add Ons</h3>
                    <div className="add-ons-options">
                        {addOns.map((addOn, index) => (
                        <button
                            key={index}
                            className={`addon-option ${selectedAddOns.includes(addOn.name) ? 'selected' : ''}`}
                            onClick={() => handleAddOnClick(addOn.name)}
                        >
                            {`${addOn.name} - ₱${addOn.price.toFixed(2)}`}
                        </button>
                        ))}
                    </div>
                </div>

                {/* Sugar Level */}
                <div className="sugar-level-section">
                    <h3>Sugar Level</h3>
                    <div className="sugar-options">
                        {sugarLevels.map((level, index) => (
                            <button
                                key={index}
                                className={`sugar-option ${selectedSugar === level ? 'selected' : ''}`}
                                onClick={() => setSelectedSugar(level)}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='modal-buttons'> 
                    <button className="add-to-cart-btn">Add to Cart</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};


const MenuProducts = () => {
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
    <div className="menu-maincontainer">
        <div className='selections'>
        <div className='category-list'>
            {drinksData.map((item) => (
                <button
                    key={item.category}
                    className={`category-item ${activeCategory === item.category ? 'active' : ''}`}
                    onClick={() => selectCategory(item.category)}
                    >
                    {item.category}
                </button>
            ))}
        </div>
        <div className='search-bar'>
            <SearchBar query={searchQuery} onSearch={setSearchQuery} />
        </div>
        </div>
        <div className='order-history'>   
            <OrderHistory orderHistory={orderHistoryData} searchQuery={searchQuery} />
        </div>
        <div className='drink-list'>
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
    </div>
  )
}

export default MenuProducts
