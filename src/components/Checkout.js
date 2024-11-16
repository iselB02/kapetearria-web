import React, { useEffect, useState } from 'react';
import './Checkout.css';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { database } from './firebaseConfig';
import { useAuth } from '../backend/AuthContext'; // Import the Auth context
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Footer from './Footer';

const MapComponent = ({ position, address }) => {
  const svgIcon = L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="red" class="bi bi-geo-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
      </svg>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  return (
    <MapContainer center={position} zoom={15} style={{ height: "450px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={svgIcon}>
        <Popup>{address}</Popup>
      </Marker>
    </MapContainer>
  );
};

function Checkout() {
  const { user } = useAuth(); // Get the user object from AuthContext
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });
  const [mapPosition, setMapPosition] = useState([14.3277, 121.0778]); // Default position
  const [isMapReady, setIsMapReady] = useState(false); // To conditionally render the map
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [orders, setOrders] = useState([]);
  const [discountType, setDiscountType] = useState('');
  const [discountID, setDiscountID] = useState('');
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const deliveryFee = 60.00;
  const discount = 30.00;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(database, 'user_info', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserData(userData);
          } else {
            console.error("No user data found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };


    const fetchOrders = async () => {
      if (user) {
        try {
          const checkoutRef = doc(database, 'checkout_info', user.uid);
          const checkoutSnap = await getDoc(checkoutRef);
          if (checkoutSnap.exists()) {
            const data = checkoutSnap.data();
            setOrders(data.items || []);
            console.log('Orders fetched:', data.items);
          } else {
            console.error('No orders found for UID:', user.uid);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    fetchUserData();
    fetchOrders();
  }, [user]);


  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapPosition([parseFloat(lat), parseFloat(lon)]);
        setIsMapReady(true);
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
    }
  };

   const handlePaymentChange = (e) => {
    const value = e.target.value;
    console.log(`Payment selected: ${value}`);
    setSelectedPayment(value);

    // Open modal only for Online Payment
    if (value === "Online") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    console.log("Closing modal...");
    setIsModalOpen(false);
  };

  // Payment Modal Component
  const PaymentModal = () => (
    <div className="modal-overlay">
      <div className="paymentModal-content">
        <div className='payment-header'>
          <h2>Online Payment</h2>
        </div>
        <div className='main-content-payment'>
            <div className='paymentOptions-container'>
            <button className='payment1'>GCash</button>
          </div>
          <button onClick={closeModal} className='close-btn-payment'>Close</button></div>
      </div>
    </div>
  );

  

  const orderTotal = orders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
  const discountPercentage = discountType === 'Senior' || discountType === 'PWD' ? 20 : (selectedVoucher ? selectedVoucher.discount_percentage : 0);
  const discountAmount = (orderTotal * discountPercentage) / 100;
  const grandTotal = orderTotal + deliveryFee - discount - discountAmount;

  const handleDiscountTypeChange = (e) => {
    setDiscountType(e.target.value);
    setSelectedVoucher(null);
    setDiscountID('');
    setVoucherCodeInput('');
    setIsVerified(false);
  };

  const handleDiscountVerification = async () => {
    if (discountType === 'PWD') {
      // Define the regex pattern for the PWD ID format <RR-PPMM-BBB-NNNNNNN>
      const pwdIdPattern = /^\d{2}-\d{4}-\d{3}-\d{7}$/;
  
      if (pwdIdPattern.test(discountID)) {
        setIsVerified(true);
        alert("PWD ID Verified!");
      } else {
        setIsVerified(false);
        alert("Invalid PWD ID format. Ensure the format is <RR-PPMM-BBB-NNNNNNN>.");
      }
    } else if (discountType === 'Senior') {
      const seniorIdPattern = /^\d{2}-\d{8}-\d{2}$/;
  
      if (seniorIdPattern.test(discountID)) {
        setIsVerified(true);
        alert("Senior Citizen ID Verified!");
      } else {
        setIsVerified(false);
        alert("Invalid Senior Citizen ID format. Ensure the format is 00-00000000-00.");
      }
    } else if (discountType === 'Voucher') {
      try {
        const q = query(collection(database, 'voucher_info'), where('code', '==', voucherCodeInput));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const voucher = querySnapshot.docs[0].data();
          const currentTime = new Date();
  
          if (currentTime >= voucher.start_date.toDate() && currentTime <= voucher.end_date.toDate()) {
            setSelectedVoucher(voucher);
            setIsVerified(true);
            alert("Voucher Verified!");
          } else {
            alert("Voucher is not valid at this time.");
            setIsVerified(false);
          }
        } else {
          alert("Voucher code is invalid.");
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error verifying voucher:", error);
        alert("Error verifying voucher.");
      }
    }
  };

  return (
    <div className='checkout-container'>
      <div className='main-checkout'>
      <form action='#' >
          <div className='main-info-container'>
            
          <div className='customer-info'>
              <h2 className='checkout-title'>Customer Information</h2>
              <div className='r1'>
                <div className="input-container">
                  <input type="text" id="firstName" className="styled-input" disabled value={userData.firstname || ''} />
                  <label htmlFor="firstName" className="floating-label">First Name</label>
                </div>
                <div className="input-container">
                  <input type="text" id="lastName" className="styled-input" disabled value={userData.surname || ''} />
                  <label htmlFor="lastName" className="floating-label">Last Name</label>
                </div>
              </div>
              <div className='r2'>
                <div className="input-container">
                  <input type="text" id="email" className="styled-input" disabled value={userData.email || ''} />
                  <label htmlFor="email" className="floating-label">Email</label>
                </div>
                <div className="input-container">
                  <input type="text" id="phoneNumber" className="styled-input" disabled value={userData.phone|| ''} />
                  <label htmlFor="phoneNumber" className="floating-label">Phone Number</label>
                </div>
              </div>
            </div>

            <div className='info-divider'></div>

            <div className='service-opt'>
              <h2 className='checkout-title'>Service Option</h2>
              <div className='radio-btn'>
                <input type="radio" id="delivery" name='selection' value="Delivery" defaultChecked />
                <label htmlFor="delivery">For Delivery</label><br />
                <input type="radio" id="pickup" name='selection' value="Pickup" />
                <label htmlFor="pickup">For Pickup</label>
              </div>
              <h3 className='sub-title'>Delivery to</h3>
              <div className='deliver-to'>
                <div className='deliver-map'>
                  {isMapReady ? <MapComponent position={mapPosition} address={userData.address} /> : <p>Loading map...</p>}
                </div>
                <div className='address-info'>
                  <div className='delivery-address'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <textarea
                      type="text"
                      maxLength="50"
                      id="address"
                      value={userData.address || ''}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    />
                  </div>
                  <div className="input-container">
                    <textarea type="text" maxLength="100" id="details-address" className="styled-input" />
                    <label htmlFor="details-address" id='details-label' className="floating-label">Address Details (Optional)</label>
                  </div>
                </div>
              </div>
            </div>

            <div className='info-divider'></div>

            <div className='payment-method'>
              <h2 className='checkout-title'>Payment Method</h2>
              <div className='radio-btn'>
                <div className='payment-container'>
                  <input type="radio"
                    id="COD"
                    name="payment"
                    value="COD"
                    checked={selectedPayment === "COD"}
                    onChange={handlePaymentChange} />
                  <label htmlFor="COD">Cash On Delivery</label>
                </div>
                <div className='payment-container'>
                  <label htmlFor="Online">
                    <input
                      type="radio"
                      id="Online"
                      name="payment"
                      value="Online"
                      checked={selectedPayment === "Online"}
                      onChange={handlePaymentChange}
                    />
                    Online Payment
                  </label>
                </div>
              </div>
            </div>
            {isModalOpen && <PaymentModal />}

            <div className='info-divider'></div>

            <div className='apply-discount'>
              <h2 className='checkout-title'>Apply Discounts</h2>
              <h3 className='sub-title'>Select Senior, PWD Discount, or Voucher</h3>
              <div className='discount-inputs'>
                <select onChange={handleDiscountTypeChange} value={discountType}>
                  <option value="">Select Discount Type</option>
                  <option value="PWD">PWD Discount</option>
                  <option value="Senior">Senior Discount</option>
                  <option value="Voucher">Voucher Code</option>
                </select>

                {discountType === 'Voucher' ? (
                  <>
                    <input
                      className='input-discount'
                      placeholder='Enter Voucher Code'
                      value={voucherCodeInput}
                      onChange={(e) => setVoucherCodeInput(e.target.value)}
                    />
                    <button type="button" onClick={handleDiscountVerification}>Verify</button>
                    {isVerified && <p>Voucher Verified!</p>}
                  </>
                ) : (
                  <>
                    <input
                      className='input-discount'
                      placeholder='Enter ID Number'
                      value={discountID}
                      onChange={(e) => setDiscountID(e.target.value)}
                    />
                    <button type="button" onClick={handleDiscountVerification} className='verify-btn'>Verify</button>
                    {isVerified && <p className='verify-remarks'>Discount Verified!</p>}
                  </>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Order Summary Section */}
        <div className='order-summary'>
          <div className='order-header'>
            <h1>Order Summary</h1>
          </div>
          <div className='summary-info'>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} className='order'>
                  <div className='main-order'>
                    <div className='quantity-container'>{order.quantity}x</div>
                    <div className='prod-info'>
                      <h3 className='name-order'>{order.productName}</h3>
                      <p className='customization'>
                        {order.selectedSize && <span>{order.selectedSize}</span>}
                        {order.selectedSugar && <span> | {order.selectedSugar}</span>}
                        {order.selectedAddOns && order.selectedAddOns.length > 0 && (
                          <>
                            <span> | </span>
                            {order.selectedAddOns.join(", ")}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <h3 className='order-price'>₱{(order.price * order.quantity).toFixed(2)}</h3>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>

          <div className='other-details'>
            <div className='total'>
              <h3 className='totalprice-title'>Subtotal</h3>
              <h3 className='totalprice'>₱{orderTotal.toFixed(2)}</h3>
            </div>
            <div className='delivery-fee'>
              <h3 className='deliveryfee-title'>Delivery Fee</h3>
              <h3 className='delivery-price'>₱{deliveryFee.toFixed(2)}</h3>
            </div>
            {/* Discount Display */}
            {discountAmount > 0 && (
              <div className='discounts-applied'>
                <h3 className='discount '>
                  {discountType === 'Senior' ? 'Senior Discount' :
                  discountType === 'PWD' ? 'PWD Discount' :
                  'Voucher Discount'}
                </h3>
                <h3 className='discount-price'>₱{discountAmount.toFixed(2)}</h3>
              </div>
            )}
            <div className='total-details'>
              <h3 className='total-title'>Total</h3>
              <h3 className='grand-totalprice'>₱{grandTotal.toFixed(2)}</h3>
            </div>
          </div>

          <div className='checkoutbtn-container'>
            <button type='submit'>Checkout</button>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default Checkout;
