import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth, database } from './firebaseConfig'; // Firebase configuration
import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase Auth hook
import { signOut } from 'firebase/auth'; // Firebase Auth sign-out
import { useNavigate } from 'react-router-dom'; // Router for navigation
import Dropdown from 'react-bootstrap/Dropdown'; // Dropdown UI component
import { collection, query, where, onSnapshot, updateDoc, doc, deleteDoc, addDoc } from 'firebase/firestore'; // Firestore functions

function Navbar() {
  const [user] = useAuthState(auth); // Get the current user state
  const [cartItems, setCartItems] = useState([]); // State for storing cart items
  const [totalPrice, setTotalPrice] = useState(0); // State for storing total price
  const navigate = useNavigate(); // For navigation

  // Fetch cart items in real-time from Firestore
  const fetchCartItems = async () => {
    if (user) {
      const userUid = user.uid; // Get user ID
      const cartCollectionRef = collection(database, 'cart_info'); // Reference to the 'cart_info' collection
      const q = query(cartCollectionRef, where('userUid', '==', userUid)); // Query to get only the current user's cart items

      // Real-time listener for cart items
      onSnapshot(q, (querySnapshot) => {
        const cartData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map documents to an array
        setCartItems(cartData); // Update state with cart items

        // Calculate the total price of all cart items
        const total = cartData.reduce((acc, item) => acc + item.totalPrice, 0);
        setTotalPrice(total); // Set total price without adding delivery fee
      });
    }
  };

  useEffect(() => {
    fetchCartItems(); // Fetch cart items when the component mounts
  }, [user]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // Handle adding quantity
  const handleAddQuantity = async (cartItem, event) => {
    event.stopPropagation(); // Prevent dropdown from closing
    const userCartRef = doc(database, 'cart_info', cartItem.id); // Reference to the specific cart item document
    const updatedQuantity = cartItem.quantity + 1;
    const updatedTotalPrice = cartItem.price * updatedQuantity;

    try {
      await updateDoc(userCartRef, {
        quantity: updatedQuantity,
        totalPrice: updatedTotalPrice,
      });
      console.log(`Updated quantity to ${updatedQuantity}`);
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  // Handle decreasing quantity
  const handleRemoveQuantity = async (cartItem, event) => {
    event.stopPropagation(); // Prevent dropdown from closing
    const userCartRef = doc(database, 'cart_info', cartItem.id); // Reference to the specific cart item document
    const updatedQuantity = cartItem.quantity - 1;

    if (updatedQuantity > 0) {
      const updatedTotalPrice = cartItem.price * updatedQuantity;

      try {
        await updateDoc(userCartRef, {
          quantity: updatedQuantity,
          totalPrice: updatedTotalPrice,
        });
        console.log(`Updated quantity to ${updatedQuantity}`);
      } catch (error) {
        console.error('Error updating cart quantity:', error);
      }
    } else {
      // If quantity is 0, delete the item from Firestore
      try {
        await deleteDoc(userCartRef);
        console.log(`Deleted item with id: ${cartItem.id}`);
      } catch (error) {
        console.error('Error deleting item from cart:', error);
      }
    }
  };

  // Handle proceeding to checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const userUid = user.uid;
      const checkoutCollectionRef = collection(database, 'checkout_info'); // Reference to 'checkout_info'

      // Store each cart item in the 'checkout_info' collection
      for (const item of cartItems) {
        await addDoc(checkoutCollectionRef, {
          ...item,
          userUid,
          checkoutDate: new Date(), // Add the current date and time
        });
      }

      // Clear the cart after checkout
      for (const item of cartItems) {
        const cartItemRef = doc(database, 'cart_info', item.id);
        await deleteDoc(cartItemRef); // Delete each item from the cart after checking out
      }

      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <img src="image/logo.png" className="logo" alt="store-logo" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <Link to="/home">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <img src="image/home.svg" className="home" alt="home-icon" />
                  <span className="text">Home</span>
                </a>
              </li>
            </Link>

            {/* Conditionally show "My Order" only when the user is logged in */}
            {user && (
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <img src="image/my-order.svg" className="my-order" alt="myorder-icon" />
                  <span className="text">My order</span>
                </a>
              </li>
            )}

            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center">
                  <img src="image/my-cart.svg" className="my-cart" alt="mycart-icon" />
                  <span className="text">My cart</span>
                </Dropdown.Toggle>

                <Dropdown.Menu align="end" className="custom-dropdown-menu" id="cart-dropdown">
                  <div className="cart-main">
                    <div className="cart-header">
                      <h2>My Cart</h2>
                      <p>Note that Order History is only visible weekly</p>
                    </div>
                    <div className="cart-container">
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <Dropdown.Item key={index} className="custom-dropdown-item" id="drop-list">
                            <div className="product">
                              <div className="img-div">
                                <img src={item.image} alt={item.productName} />
                              </div>
                              <div className="product-info">
                                <div className="row1">
                                  <h2 className="prod-name">{item.productName}</h2>
                                  <h3 className="quantity">{item.quantity}x</h3>
                                </div>
                                <div className="row2">
                                  <h3 className="price">₱{item.price.toFixed(2)}</h3>
                                  <h3 className="total-price">₱{item.totalPrice.toFixed(2)}</h3>
                                </div>
                                <div className="row3">
                                  <button
                                    className="addquan-btn"
                                    onClick={(e) => handleAddQuantity(item, e)}
                                  >
                                    +
                                  </button>
                                  <button
                                    className="remove-btn"
                                    onClick={(e) => handleRemoveQuantity(item, e)}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Dropdown.Item>
                        ))
                      ) : (
                        <p>Your cart is empty.</p>
                      )}
                      {/* Conditionally render the checkout section */}
                      {cartItems.length > 0 && (
                        <div className='checkout-div'>
                          <button className='checkout-btn' onClick={handleCheckout}>Proceed to Checkout</button>
                          <h3>Total: ₱{totalPrice.toFixed(2)}</h3>
                        </div>
                      )}
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {user ? (
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className="d-flex align-items-center">
                    <img src="image/sign-in.svg" className="account" alt="account-icon" />
                    <span className="text ms-2">Account</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="start" className="custom-dropdown-menu">
                    <Dropdown.Item href="#" className="custom-dropdown-item">Account Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="custom-dropdown-item">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/login')} id="dropdown-basic">
                  <img src="image/sign-in.svg" className="account" alt="account-icon" />
                  <span className="text">Sign In</span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
