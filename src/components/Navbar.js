import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, database } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import Dropdown from 'react-bootstrap/Dropdown';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, setDoc, getDocs } from 'firebase/firestore';

function Navbar() {
  const [user] = useAuthState(auth);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const fetchCartItems = () => {
    const uid = user?.uid || Cookies.get('authToken');
    if (uid) {
      const cartCollectionRef = collection(database, 'cart_info');
      const q = query(cartCollectionRef, where('userUid', '==', uid));
  
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const cartData = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Firestore document ID
            ...doc.data(),
          }));
          setCartItems(cartData);
  
          // Calculate total price
          const total = cartData.reduce((acc, item) => acc + item.totalPrice, 0);
          setTotalPrice(total);
        } else {
          setCartItems([]);
          setTotalPrice(0);
        }
      });
  
      return () => unsubscribe();
    }
  };
  
  useEffect(() => {
    const unsubscribe = fetchCartItems();
    return () => unsubscribe && unsubscribe(); // Unsubscribe when the component unmounts
  }, [user]);
  

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  // Update cart in Firestore
  const updateCartInFirestore = async (updatedCartItems) => {
    const uid = user?.uid || Cookies.get('authToken');
    if (uid) {
      try {
        const cartCollectionRef = collection(database, 'cart_info');
  
        // Update each document based on its ID
        for (const updatedItem of updatedCartItems) {
          const cartItemRef = doc(cartCollectionRef, updatedItem.id); // Use the Firestore document ID
          await updateDoc(cartItemRef, updatedItem);
        }
      } catch (error) {
        console.error('Error updating cart in Firestore:', error);
      }
    }
  };
  

  // Handle adding quantity
  const handleAddQuantity = (cartItem, event) => {
    event.stopPropagation();
    const updatedCartItems = cartItems.map((item) =>
      item.id === cartItem.id
        ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
        : item
    );
  
    setCartItems(updatedCartItems);
    updateCartInFirestore(updatedCartItems);
  };
  

  // Handle decreasing quantity
  const handleRemoveQuantity = async (cartItem, event) => {
    event.stopPropagation();
  
    if (cartItem.quantity === 1) {
      // If the item's quantity is 1 and reduced to 0, delete it
      try {
        const cartItemRef = doc(database, 'cart_info', cartItem.id); // Firestore document reference
        await deleteDoc(cartItemRef); // Delete from Firestore
  
        // Remove the item from the local state
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== cartItem.id)
        );
  
        console.log(`Item ${cartItem.id} deleted from cart.`);
      } catch (error) {
        console.error(`Error deleting item ${cartItem.id} from Firestore:`, error);
      }
    } else {
      // Reduce the quantity if it's greater than 1
      const updatedCartItems = cartItems.map((item) =>
        item.id === cartItem.id
          ? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price }
          : item
      );
  
      // Update Firestore and local state
      setCartItems(updatedCartItems);
      updateCartInFirestore(updatedCartItems);
    }
  };
  

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const uid = user?.uid || Cookies.get('authToken'); // Retrieve UID from user state or cookies

    if (!uid) {
      console.error('User UID is not available.');
      return;
    }

    try {
      // Prepare checkout data with current timestamp
      const checkoutData = {
        items: cartItems,
        checkoutDate: new Date(),
        totalPrice,
      };

  
      // Save the checkout data to checkout_info collection with UID as the document ID
      const checkoutRef = doc(database, 'checkout_info', uid);
      await setDoc(checkoutRef, checkoutData);
      console.log('Checkout data saved successfully');

      // Clear the user's cart by deleting each document in the cart_info collection for this user
      const cartCollectionRef = collection(database, 'cart_info');
      const cartQuery = query(cartCollectionRef, where('userUid', '==', uid));
      const cartDocs = await getDocs(cartQuery);

      // Loop through each document and delete it
      const deletePromises = cartDocs.docs.map((cartDoc) => deleteDoc(cartDoc.ref));
      await Promise.all(deletePromises);

      console.log('Cart cleared after checkout');
      setCartItems([]); // Clear local cart items state
      setTotalPrice(0); // Reset total price

      alert('Checkout successful!');
      navigate('/myorder'); // Redirect user to the order confirmation or a relevant page
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link to="/home">
          <img src="image/logo.png" className="logo" alt="store-logo" />
        </Link>
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

            {user && (
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate('/myorder')}>
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
                      <img src="image/my-cart.svg" id="cart" alt="mycart-icon" />
                      <h2 id='title-cart'>My Cart</h2>
                    </div>
                    <div className="cart-container">
                      {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                          <Dropdown.Item key={index} className="custom-dropdown-item" id="drop-list">
                            <div className="product">
                              <div className="img-div">
                                <img src={item.image} alt={item.productName} className='prod-img'/>
                              </div>
                              <div className="product-info">
                                <div className="row1">
                                  <h2 className="prod-name">{item.productName}</h2>
                                  <h3 className="quantity">{item.quantity}x</h3>
                                </div>
                                <div className="row2">
                                  <h3 className="addons">{item.selectedAddOns?.join(', ')} {item.selectedSize} {item.selectedSugar}</h3>
                                </div>
                                <div className="row3">
                                  <button
                                    className="addquan-btn"
                                    onClick={(e) => handleAddQuantity(item, e)}
                                  >
                                    +
                                  </button>
                                  <h3 className="price">₱{item.price.toFixed(2)}</h3>
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
                        <p className='empty'>Your cart is empty.</p>
                      )}
                      <div className='divider'></div>
                      {cartItems.length > 0 && (
                        <div className='checkout-div'>
                          <div className='division'></div>
                          <div className='total-price'>
                            <h3 id='total-title'>Total</h3>
                            <h3 id='total' >₱{totalPrice.toFixed(2)}</h3>
                          </div>
                          <button className='checkout-btn' onClick={handleCheckout}>Proceed to Checkout</button>
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
                    <Dropdown.Item href="#" className="custom-dropdown-item" onClick={() => navigate('/my-account')}>Account Settings</Dropdown.Item>
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
