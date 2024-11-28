import React, { useState, useEffect } from 'react';
import {  collection, query, where, getDocs, addDoc, updateDoc, doc, getDoc} from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { database, auth } from './firebaseConfig'; // Import your Firebase configuration
import { useParams  } from 'react-router-dom'; // Import useNavigate for redirection
import './Drinks.css';
import { Link } from 'react-router-dom';  // Import Link for navigation
import Navbar from './Navbar';
import Banner from './Banner';
import Footer from './Footer';

const SearchBar = ({ query, onSearch }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search Drinks"
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
    const [quantity, setQuantity] = useState(1);
    const sizesPerRow = 3;
    const sugarPerRow = 3; 

    const sizes = product?.sizes ? product.sizes.split(',') : [];
    const addOns = product?.add_ons ? product.add_ons.split(',') : [];
    const sugarLevels = product?.sugar_levels ? product.sugar_levels.split(',') : [];

    useEffect(() => {
        if (sizes.length > 0) setSelectedSize(sizes[0]);
        if (sugarLevels.length > 0) setSelectedSugar(sugarLevels[0]);
    }, [product]);

    if (!isVisible) return null;

    const handleClose = () => {
        setSelectedAddOns([]);
        setSelectedSize('');
        setSelectedSugar('');
        setQuantity(1);
        onClose();
    };

    const handleAddToCart = async () => {
        if (auth.currentUser) {
            const userUid = auth.currentUser.uid;
    
            // Create a cart item structure for comparison
            const cartItem = {
                userUid,
                productId: product.id,
                productName: product.product_name,
                image: product.src || '/image/default-drink.png', // Use product.src from menu_info
                selectedAddOns,
                selectedSize,
                selectedSugar,
                price: product.price,
                quantity,
                totalPrice: product.price * quantity,
                createdAt: new Date(),
            };
    
            console.log('Cart item before adding to Firestore:', cartItem);
    
            try {
                // Fetch all cart items for the current user
                const cartCollectionRef = collection(database, 'cart_info');
                const q = query(cartCollectionRef, where('userUid', '==', userUid));
                const querySnapshot = await getDocs(q);
    
                let matchingCartItem = null;
    
                // Loop through the user's cart to find a matching product (same ID, size, sugar, and add-ons)
                querySnapshot.forEach((doc) => {
                    const existingItem = doc.data();
    
                    // Check if the existing item matches the productId, size, sugar, and add-ons
                    if (
                        existingItem.productId === product.id &&
                        existingItem.selectedSize === selectedSize &&
                        existingItem.selectedSugar === selectedSugar &&
                        JSON.stringify(existingItem.selectedAddOns) === JSON.stringify(selectedAddOns)
                    ) {
                        matchingCartItem = { id: doc.id, data: existingItem }; // Store the matching item
                    }
                });
    
                if (matchingCartItem) {
                    // If a matching product is found, update the quantity and total price
                    const updatedQuantity = matchingCartItem.data.quantity + quantity;
                    const updatedTotalPrice = product.price * updatedQuantity;
    
                    // Update the existing item in Firestore
                    const cartItemRef = doc(database, 'cart_info', matchingCartItem.id);
                    await updateDoc(cartItemRef, {
                        quantity: updatedQuantity,
                        totalPrice: updatedTotalPrice,
                    });
    
                    console.log('Existing item updated with increased quantity:', updatedQuantity);
                } else {
                    // If no matching product is found, add it as a new item
                    await addDoc(collection(database, 'cart_info'), cartItem);
                    console.log('New item added to cart successfully!');
                }
    
                // Close the modal after adding to cart
                handleClose();
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        } else {
            alert('You must be signed in to add items to your cart. Redirecting to login...');
            window.location.href = '/login';
        }
    };

    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{product.product_name}</h2>
                <p className='prod-desc'>{product.description}.</p>
                <div className="modal-div"></div>
                <p>Price: ₱{product.price.toFixed(2)}</p>

                
                {/* Sizes */}
                {sizes.length > 0 && (
                    <div className="sizes-section">
                    <h3>Sizes</h3>
                    <div className="size-options">
                        {Array.from({ length: Math.ceil(sizes.length / sizesPerRow) }, (_, rowIndex) => (
                            <div key={rowIndex} className="size-row">
                                {sizes.slice(rowIndex * sizesPerRow, rowIndex * sizesPerRow + sizesPerRow).map((size, index) => (
                                    <button
                                        key={index}
                                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* Add Ons */}
                {addOns.length > 0 && (
                    <div className="add-ons-section">
                    <h3>Add Ons</h3>
                    <div className="add-ons-options">
                        {Array.from({ length: Math.ceil(addOns.length / 3) }, (_, rowIndex) => (
                            <div key={rowIndex} className="add-ons-row">
                                {addOns.slice(rowIndex * 3, rowIndex * 3 + 3).map((addOn, index) => (
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
                        ))}
                    </div>
                </div>
                )}

                {/* Sugar Level */}
                {sugarLevels.length > 0 && (
                    <div className="sugar-level-section">
                    <h3>Sugar Level</h3>
                    <div className="sugar-options">
                        {Array.from({ length: Math.ceil(sugarLevels.length / sugarPerRow) }, (_, rowIndex) => (
                            <div key={rowIndex} className="sugar-row">
                                {sugarLevels.slice(rowIndex * sugarPerRow, rowIndex * sugarPerRow + sugarPerRow).map((level, index) => (
                                    <button
                                        key={index}
                                        className={`sugar-option ${selectedSugar === level ? 'selected' : ''}`}
                                        onClick={() => setSelectedSugar(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                    </div>
                )}

                {/* Quantity Input */}
                <div className="quantity-section">
                    <div className="quantity-controls">
                        <h3>Quantity</h3>
                        <button className="quantity-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
                        <span className="quantity-value">{quantity}</span>
                        <button className="quantity-btn" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                    </div>
                </div>


                <div className='modal-buttons'>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
                    <button className="cancel-btn" onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};



const OrderHistoryModal = ({ orderId, isVisible, onClose, reorder }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // Handle reorder click
    const handleReorderClick = () => {
        if (order) {
            reorder(order); // Pass the order details to the reorder function
        }
    };
    // Fetch order details from Firebase when the modal is visible
    useEffect(() => {
        if (isVisible && orderId) {
            setLoading(true);
            setError(null);
            
            const orderRef = doc(database, 'order_history', orderId); // Reference to the order in Firestore

            getDoc(orderRef)
                .then(docSnap => {
                    if (docSnap.exists()) {
                        setOrder(docSnap.data()); // Assuming the Firestore document contains the order details
                    } else {
                        setError('Order not found');
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err); // Log error for debugging
                    setError('Failed to fetch order details');
                    setLoading(false);
                });
        } else {
            setOrder(null); // Clear the order data when modal is closed
        }
    }, [orderId, isVisible, database]);

    if (!isVisible) return null; // Return null if modal is not visible

    // Handle loading and error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="order-history-modal-overlay">
            <div className="order-history-modal-content">
                <h2>Order Details</h2>
                <div className="order-history-details">
                    {/* Ensure order properties are not null/undefined */}
                    <p><strong>Product Name:</strong> {order.productName || 'N/A'}</p>
                    <p><strong>Price:</strong> ₱{(order.price || 0).toFixed(2)}</p>
                    <p><strong>Quantity:</strong> {order.quantity || 'N/A'}</p>
                    <p><strong>Size:</strong> {order.size || 'N/A'}</p>
                    <p><strong>Sugar Level:</strong> {order.sugarLevel || 'N/A'}</p>
                    <p><strong>Add-ons:</strong> {order.addOns?.join(', ') || 'None'}</p>
                    <p><strong>Total:</strong> ₱{((order.price || 0) * (order.quantity || 1)).toFixed(2)}</p>
                </div>

                <div className="historyModal-buttons">
                    <button onClick={onClose}>Close</button>
                    <button onClick={handleReorderClick}>Order Again</button>
                </div>
            </div>
        </div>
    );
};

const Drinks = () => {
    const { type } = useParams();  // Capture `type` dynamically from URL (e.g., 'drinks', 'snacks', etc.)
    const [drinksData, setDrinksData] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');  // No hardcoded category, dynamic
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    // const [menuData, setMenuData] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    const [order, setOrder] = useState(null); // or default values for the order


   // Function to reorder an item
    const reorder = async (order) => {
        if (!auth.currentUser) {
            alert('Please log in to place the order.');
            return;
        }

        const userUid = auth.currentUser.uid;

        try {
            // Reference to Firestore collection where cart info will be stored
            const cartInfoRef = collection(database, 'cart_info');

            // Create a new order object based on the selected order from the history
            const newOrderData = {
                completedAt: new Date().toISOString(), // Timestamp when the order is placed
                image: order.image || "", // Image URL of the product
                totalPrice: order.price, // Price of the product
                price: order.price / order.quantity,
                productName: order.productName, // Name of the product
                quantity: order.quantity || 1, // Quantity of the product, defaulting to 1
                selectedAddOns: order.selectedAddOns || [], // Add-ons from the original order
                selectedSize: order.selectedSize || 'N/A', // Size selected by the user
                selectedSugar: order.selectedSugar || 'N/A', // Sugar level selected by the user
                userUid: userUid, // The user ID of the logged-in user
            };

            // Add the new order data to the Firestore collection
            await addDoc(cartInfoRef, newOrderData);

            // Successfully added the item to the cart, now show success message
            alert('Order placed successfully and added to cart!');
            closeOrderHistoryModal();
        } catch (error) {
            console.error('Error reordering item:', error);
            alert('Failed to reorder the item.');
        }
    };

    

    // Fetch products from Firestore where type is dynamic based on URL or props
    useEffect(() => {
        const fetchDrinksData = async () => {
            try {
                // Query to get all products based on the dynamic `type` passed via URL
                const q = query(collection(database, 'menu_info'), where('type', '==', type));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setDrinksData(data);
                setLoading(false);

                // Set default category to the first category in the fetched data
                if (data.length > 0) {
                    setActiveCategory(data[0].category);
                }
            } catch (error) {
                console.error("Error fetching drinks data:", error);
                setLoading(false);
            }
        };

        fetchDrinksData();
    }, [type]); // Re-run when `type` changes (e.g., URL param changes)

    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (!auth.currentUser) {
                console.warn('No user signed in.');
                setLoading(false);
                return;
            }
    
            const userUid = auth.currentUser.uid;
            console.log("Fetching orders for user UID:", userUid); // Debugging line
    
            try {
                const ordersRef = collection(database, 'order_history');
                const q = query(ordersRef, where('userId', '==', userUid));
                const querySnapshot = await getDocs(q);
                console.log("Fetched order documents:", querySnapshot.docs); // Debugging line
    
                // Extract orders directly from document data
                const allOrders = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    console.log("Document data:", data); // Debugging line
    
                    // Return the necessary fields as a single order object
                    return {
                        id: doc.id, 
                        productName: data.productName, // Ensure 'productName' exists in the document data
                        image: data.image,  // The image URL for the product
                        price: data.price,  // The price of the product
                        // Add any other fields here that are relevant
                    };
                });
    
                // Update the state with the fetched orders
                setOrderHistory(allOrders);
                setLoading(false); // Stop loading
    
            } catch (error) {
                console.error("Error fetching order history:", error);
                setLoading(false); // Stop loading in case of error
            }
        };
    
        fetchOrderHistory();
    }, []); // Run this effect once when the component mounts
    
    


    // Filter Order History by Search Query
    const filteredOrders = orderHistory.filter((order) =>
        order.productName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectCategory = (category) => {
        setActiveCategory(category);  // Set active category dynamically
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


    const openOrderHistoryModal = (id) => {
        
        setSelectedOrderId(id); // Set the selected order ID
        setIsHistoryVisible(true); // Show the modal
    };

    const closeOrderHistoryModal = (id) => {
        setSelectedOrderId(null); // Set the selected order ID
        setIsHistoryVisible(false); // Show the modal
    };
    
    
    

    
    // Filter drinks data based on active category (within drinks/snacks/etc.)
    const filteredDrinksData = drinksData.filter((drink) =>
        drink.category === activeCategory && drink.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Loading...</p>;
    }

    

    return (
        <div className="menu-maincontainer">
            <div className="others-container">
                <Navbar/>
                <Banner />
            </div>
            <div className='menu-selections'>
                <div className='menu-selections-btn'>
                <Link to="/drinks"><button className={`menuselect-btn ${type === 'drinks' ? 'active-btn' : ''}`}>Drinks</button></Link>
                <Link to="/snacks"><button className={`menuselect-btn ${type === 'snacks' ? 'active-btn' : ''}`}>Snacks</button></Link>
                <Link to="/meals"><button className={`menuselect-btn ${type === 'meals' ? 'active-btn' : ''}`}>Meals</button></Link>
                <Link to="/desserts"><button className={`menuselect-btn ${type === 'desserts' ? 'active-btn' : ''}`}>Desserts</button></Link>
                </div>
                <div className="search-bar">
                    <SearchBar query={searchQuery} onSearch={setSearchQuery} />
                </div>
            </div>

            
            <div className="order-history-content">
                <div className="order-history-header">
                    <h2>Order History</h2>
                </div>
                    <div className="order-history-items">
                        {loading ? (
                            <p>Loading order history...</p>
                        ) : orderHistory.length > 0 ? (
                            orderHistory.map((item, index) => (
                                <div key={index} className="order-item" onClick={() => openOrderHistoryModal(item.id)}>
                                    <img
                                        src={item.image || '/image/default-drink.png'} // Default image if item has no image
                                        alt={item.productName}
                                        className="order-img"
                                    />
                                    <div className="order-info">
                                        <p className="order-history-name">{item.productName}</p>
                                        <p className="order-history-price">₱{item.price?.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No matching orders found.</p>
                        )}
                </div>
            </div>

            {/* Render the OrderHistoryModal and pass necessary props */}
            <OrderHistoryModal
                orderId={selectedOrderId}
                isVisible={isHistoryVisible}
                onClose={ closeOrderHistoryModal} // Close modal when triggered
                reorder={reorder}
            />




            <div className="selections">
                {/* Drink Categories for selection (like Hot Coffee, Iced Coffee, etc.) */}
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
            </div>

            <div className="drink-list">
                {filteredDrinksData.length > 0 ? (
                    <div className="drink-category">
                        <h2>{activeCategory}</h2>
                        <div className="drink-items">
                            {filteredDrinksData.map((drink, i) => (
                                <div key={i} className="drink-item">
                                    <div className='main-item'>
                                        <img src={drink.src || '/image/default-drink.png'} alt={drink.product_name} className="drink-img" />
                                        <div className="drink-info">
                                            <div className="drink-name-price">
                                                <p className="drink-name">{drink.product_name}</p>
                                                <p className="drink-price">₱{drink.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <button
                                            className={`add-btn ${!drink.is_available ? 'unavailable' : ''}`}
                                            onClick={() => openModal(drink)}
                                            disabled={!drink.is_available || drink.stock_number === 0}
                                        >
                                            {!drink.is_available
                                                ? 'Unavailable'
                                                : drink.stock_number === 0
                                                ? 'Out of Stock'
                                                : '+'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No items available in this category.</p>
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