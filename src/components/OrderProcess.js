import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../backend/AuthContext';
import { database } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Table from 'react-bootstrap/Table';
import './OrderProcess.css';

function OrderProcess() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMI] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchOrderData = async () => {
      if (user) {
        try {
          const orderRef = doc(database, 'order_info', user.uid);
          const orderSnap = await getDoc(orderRef);

          if (orderSnap.exists()) {
            const order = orderSnap.data();
            setOrderData(order);

            // Redirect if the order is completed
            if (order.status.toLowerCase() === 'order completed') {
              await handleOrderCompletion(order);
            }
          } else {
            // Redirect if no order exists
            navigate('/');
          }

          const userRef = doc(database, 'user_info', user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            setFirstName(userData.firstname);
            setMI(userData.middleInitial);
            setLastName(userData.surname);
            setEmail(userData.email);
            setPhone(userData.phone);
          } else {
            console.error('No user data found.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          navigate('/'); // Redirect on error
        }
      } else {
        navigate('/login'); // Redirect if not authenticated
      }
    };

    fetchOrderData();
  }, [user, navigate]);

  const handleOrderCompletion = async (order) => {
    try {
      const historyRef = doc(database, 'order_history', user.uid);
      await setDoc(historyRef, {
        ...order,
        completedAt: new Date(),
      });

      const orderRef = doc(database, 'order_info', user.uid);
      await deleteDoc(orderRef);

      alert('Your order has been completed!');
      navigate('/'); // Redirect to home
    } catch (error) {
      console.error('Error handling order completion:', error);
    }
  };

  const getColorByStatus = (iconIndex) => {
    const statuses = ['for approval', 'preparing', 'out for delivery', 'order completed'];
    const currentStatusIndex = statuses.indexOf(orderData?.status.toLowerCase());
    return iconIndex <= currentStatusIndex ? 'green' : 'gray';
  };

  if (!orderData) {
    return <div>Loading order details...</div>;
  }
  return (
    <div className='orderContainer-main'>
      <div className='orderDetails-container'>
        <div className='container-process'>
          <div className='main-details'>
            <div className='logo-container'>
              <img className='cup' src='image/cup-logo.png' alt='Logo-Cup' />
            </div>
            <div className='message'>
              <h6 className='message1'>THANK YOU, {firstName.toUpperCase()}!</h6>
              <h6 className='message2'>Track Your Order Below.</h6>
              <h6 className='message3'>Order #{orderData.orderNumber}</h6>
            </div>
            <div className='process'>
              <div className='icons-content'>
                <div className='icon-process'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="28"
                    viewBox="0 0 18 22"
                    style={{ fill: getColorByStatus(0) }}
                  >
                    <path d="M11 7H5M13 11H5M10 15H5M1 1V21L3 20L5 21L7 20L9 21L11 20L13 21L15 20L17 21V1L15 2L13 1L11 2L9 1L7 2L5 1L3 2L1 1Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className='division2'></div>
                <div className='icon-process'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="32"
                    style={{ fill: getColorByStatus(1) }}
                    className="bi bi-cup-fill"
                    viewBox="0 0 16 16"
                  >
                    <path fillRule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899z" />
                  </svg>
                </div>
                <div className='division2'></div>
                <div className='icon-process'>
                  {/* Replacing bicycle icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width="30"
                    height="32"
                    style={{ fill: getColorByStatus(2) }}
                  >
                     <path d="M280 32c-13.3 0-24 10.7-24 24s10.7 24 24 24l57.7 0 16.4 30.3L256 192l-45.3-45.3c-12-12-28.3-18.7-45.3-18.7L64 128c-17.7 0-32 14.3-32 32l0 32 96 0c88.4 0 160 71.6 160 160c0 11-1.1 21.7-3.2 32l70.4 0c-2.1-10.3-3.2-21-3.2-32c0-52.2 25-98.6 63.7-127.8l15.4 28.6C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L418.2 128l61.8 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-20.4 0c-7.5 0-14.7 2.6-20.5 7.4L391.7 78.9l-14-26c-7-12.9-20.5-21-35.2-21L280 32zM462.7 311.2l28.2 52.2c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-28.2-52.2c2.3-.3 4.7-.4 7.1-.4c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64c0-15.5 5.5-29.7 14.7-40.8zM187.3 376c-9.5 23.5-32.5 40-59.3 40c-35.3 0-64-28.7-64-64s28.7-64 64-64c26.9 0 49.9 16.5 59.3 40l66.4 0C242.5 268.8 190.5 224 128 224C57.3 224 0 281.3 0 352s57.3 128 128 128c62.5 0 114.5-44.8 125.8-104l-66.4 0zM128 384a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
                  </svg>
                </div>
                <div className='division2'></div>
                <div className='icon-process'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    style={{ fill: getColorByStatus(3) }}
                    className="bi bi-bag-check"
                    viewBox="0 0 16 16"
                  >
                    <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className='order-details-container'>
              <h6 className='details'>
                Order placed on {new Date(orderData.timestamp.seconds * 1000).toLocaleString()}
              </h6>
            </div>
            <div className='other-derails-container'>
              <div className='deliverTo-container'>
                <h6>Deliver to:</h6>
                <h6>{orderData.address}</h6>
                <h6>Address Details: {orderData.addressDetails}</h6>
                <h6>ETA: {orderData.eta}</h6>
              </div>
              <div className='customerInfo-container'>
                <h6>Customer Information</h6>
                <h6>{firstName} {middleInitial} {lastName}</h6>
                <h6>{email}</h6>
                <h6>{phone}</h6>
              </div>
            </div>
            <div className='division1'></div>
            <div className='title-order-container'>
              <h6 className='title-order'>Order Summary</h6>
            </div>
            <div className='table-container'>
              <table className='table-process'>
                <thead>
                  <tr>
                    <th className='table-title2'>Qty</th>
                    <th className='table-title1'>Item</th>
                    <th className='table-title3'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.orders.map((order, index) => (
                    <tr key={index}>
                      <td className='table-qty'>{order.quantity}</td>
                      <td className='table-itemName'>{order.productName}</td>
                      <td className='table-price'>₱{(order.price * order.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className='other-details-container'>
                    <td className='table-details'>
                      <div className='details-order1'>
                        <span>Subtotal:</span>
                        <span>Delivery Fee:</span>
                        <span>Discount:</span>
                        <span className='total-item'>Total</span>
                      </div>
                    </td>
                    <td className='table-qty'></td>
                    <td className='table-details'>
                      <div className='details-order2'>
                        <span>₱{orderData.orders.reduce((sum, order) => sum + order.price * order.quantity, 0).toFixed(2)}</span>
                        <span>₱{orderData.deliveryFee.toFixed(2)}</span>
                        <span>-₱{orderData.discountAmount.toFixed(2)}</span>
                        <span className='total-itemPrice'>₱{orderData.totalAmount.toFixed(2)}</span>
                      </div>
                    </td>
                  </tr>
                  <tr className='ModePayment-container'>
                    <td className='ModeOfPayment'>Mode of Payment</td>
                    <td className='table-qty'></td>
                    <td className='Payment'>{orderData.paymentType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  );
}

export default OrderProcess;

