import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { database, auth } from './firebaseConfig'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Drinks.css';
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';

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
                placeholder=" Search Drinks "
                value={query}
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className="search-btn" type='submit'>Search</button>
        </div>
    );
};

const ProductModal = ({ product, isVisible, onClose, selectedAddOns, setSelectedAddOns }) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedSugar, setSelectedSugar] = useState('');
    const [quantity, setQuantity] = useState(1); // State for quantity

    const sizes = product?.sizes ? product.sizes.split(',') : [];
    const addOns = product?.add_ons ? product.add_ons.split(',') : [];
    const sugarLevels = product?.sugar_levels ? product.sugar_levels.split(',') : [];

    useEffect(() => {
        if (sizes.length > 0) {
            setSelectedSize(sizes[0]);
        }
        if (sugarLevels.length > 0) {
            setSelectedSugar(sugarLevels[0]);
        }
    }, [product]);

    if (!isVisible) return null;

    const handleClose = () => {
        setSelectedAddOns([]);
        setSelectedSize('');
        setSelectedSugar('');
        setQuantity(1); // Reset quantity to 1
        onClose();
    };

    const handleAddToCart = async () => {
        if (auth.currentUser) {
            const userUid = auth.currentUser.uid; // Get user UID
    
            // Create a cart item structure
            const cartItem = {
                productId: product.id,
                productName: product.product_name,
                selectedAddOns,
                selectedSize,
                selectedSugar,
                price: product.price,
                quantity: 1, // Default quantity to 1 when adding to cart
                totalPrice: product.price, // Total price based on quantity
                userId: userUid, // Store user ID
                createdAt: new Date(),
            };
    
            // Reference to the user's cart document
            const userCartRef = doc(database, 'cart_info', userUid); // Referring to the user's document in cart_info
    
            try {
                // Check if the user cart exists
                const userCartSnapshot = await getDocs(userCartRef);
    
                if (userCartSnapshot.exists()) {
                    // If the cart already exists, update it
                    await setDoc(userCartRef, {
                        [product.id]: {
                            ...cartItem,
                            quantity: (userCartSnapshot.data()[product.id]?.quantity || 0) + 1, // Increment quantity
                            totalPrice: product.price * ((userCartSnapshot.data()[product.id]?.quantity || 0) + 1), // Update total price
                        },
                    }, { merge: true }); // Use merge option to merge with existing data
                } else {
                    // If no cart exists, create a new one with an auto-generated ID
                    await setDoc(userCartRef, {
                        [product.id]: cartItem,
                    });
                }
    
                console.log('Item added to cart successfully!');
                handleClose();
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        } else {
            // User is not signed in, redirect to login page
            alert('You must be signed in to add items to your cart. Redirecting to login...');
            window.location.href = '/login'; // Redirect to login page
        }
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{product.product_name}</h2>
                <p>{product.description}.</p>
                <p>Price: ₱{product.price.toFixed(2)}</p>

                {/* Sizes */}
                {sizes.length > 0 && (
                    <div className="sizes-section">
                        <h3>Sizes</h3>
                        <div className="size-options">
                            {sizes.map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add Ons */}
                {addOns.length > 0 && (
                    <div className="add-ons-section">
                        <h3>Add Ons</h3>
                        <div className="add-ons-options">
                            {addOns.map((addOn, index) => (
                                <button
                                    key={index}
                                    className={`addon-option ${selectedAddOns.includes(addOn) ? 'selected' : ''}`}
                                    onClick={() => {
                                        if (selectedAddOns.includes(addOn)) {
                                            setSelectedAddOns(selectedAddOns.filter(item => item !== addOn));
                                        } else {
                                            setSelectedAddOns([...selectedAddOns, addOn]);
                                        }
                                    }}
                                >
                                    {addOn}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sugar Level */}
                {sugarLevels.length > 0 && (
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
                )}

                {/* Quantity Input */}
                <div className="quantity-section">
                    <h3>Quantity</h3>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>

                <div className='modal-buttons'> 
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const Drinks = () => {
    const [drinksData, setDrinksData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Iced Coffee');
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    useEffect(() => {
        const fetchDrinksData = async () => {
            try {
                const querySnapshot = await getDocs(collection(database, 'menu_info'));
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setDrinksData(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching drinks data:", error);
                setLoading(false);
            }
        };

        fetchDrinksData();
    }, []);

    const selectCategory = (category) => {
        setActiveCategory(category);
    };

    const openModal = (product) => {
        if (product.stock_number > 0) {
            setSelectedProduct(product);
            setIsModalVisible(true);
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedProduct(null);
        setSelectedAddOns([]);
    };

    const filteredDrinksData = drinksData.filter((drink) =>
        drink.category === activeCategory && drink.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="menu-maincontainer">
            <div className="others-container">
                <Navbar />
                <Banner />
            </div>
            <div className="selections">
                <div className="category-list">
                    {[...new Set(drinksData.map((drink) => drink.category))].map((category) => (
                        <button
                            key={category}
                            className={`category-item ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => selectCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="search-bar">
                    <SearchBar query={searchQuery} onSearch={setSearchQuery} />
                </div>
            </div>

            <div className="drink-list">
                {filteredDrinksData.length > 0 ? (
                    <div className="drink-category">
                        <h2>{activeCategory}</h2>
                        <div className="drink-items">
                            {filteredDrinksData.map((drink, i) => (
                                <div key={i} className="drink-item">
                                    <img src={drink.src || '/image/default-drink.png'} alt={drink.product_name} className="drink-img" />
                                    <div className="drink-info">
                                        <div className="drink-name-price">
                                            <p className="drink-name">{drink.product_name}</p>
                                            <p className="drink-price">₱{drink.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="add-btn"
                                        onClick={() => openModal(drink)}
                                        disabled={drink.stock_number === 0}
                                    >
                                        {drink.stock_number === 0 ? 'Out of Stock' : '+'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No drinks available in this category.</p>
                )}
            </div>

            {/* Modal Pop-up for product customization */}
            <ProductModal 
                product={selectedProduct} 
                isVisible={isModalVisible} 
                onClose={closeModal} 
                selectedAddOns={selectedAddOns} 
                setSelectedAddOns={setSelectedAddOns} 
            />
            <div className='footer'>
                <Footer />
            </div>
        </div>
    );
};

export default Drinks;
