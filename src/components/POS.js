import React, { useState, useEffect } from 'react';
import './POS.css';
import {collection, getDocs, updateDoc, doc } from 'firebase/firestore';  // Firebase setup
import { database} from './firebaseConfig';

// POSmodal Component
const POSmodal = ({ order, closeModal, handleAccept, handleDecline, setReason, reason }) => {
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    const openDeclineModal = () => {
        setIsDeclineModalOpen(true);
    };

    const closeDeclineModal = () => {
        setIsDeclineModalOpen(false);
    };

    // Convert Firestore timestamp to Date object and format it
    const orderTimestamp = order.timestamp ? order.timestamp.toDate().toLocaleString() : "Unknown Date";

    return (
        <div className='POS-modal'>
            <div className='POSmodal-content'>
                <div className='POS-main-modal'>
                    <div className='close-modalx' onClick={closeModal}><h3>X</h3></div>
                    <div className='modal-header'>
                        <h2 className='ordnum-modal'>Order #{order.orderNumber}</h2>
                        <h3 className='modal-timedate'>{orderTimestamp}</h3>
                    </div>
                    <div className='custom-details'>
                        <h3 className='cust-name'>{order.customerName}</h3>
                        <h3 className='cust-add'>{order.customerAddress}</h3>
                    </div>
                    <div className='modal-orderDetails'>
                        {(order.orders && Array.isArray(order.orders) && order.orders.length > 0) ? (
                            order.orders.map((item, index) => (
                                <div key={index}>
                                    <div className='modal-nameQuan'>
                                        <h3 className='modal-prodName'>{item.productName}</h3>
                                        <h3>x {item.quantity}</h3>
                                    </div>
                                    <div className='modal-addons'>
                                        {item.selectedAddOns && Array.isArray(item.selectedAddOns) && item.selectedAddOns.length > 0 ? (
                                            item.selectedAddOns.map((addon, addonIndex) => (
                                                <h3 key={addonIndex}>{addon}</h3>
                                            ))
                                        ) : (
                                            <h3>No addons available for {item.productName}</h3>
                                        )}
                                        {item.selectedSize && <h3>Size: {item.selectedSize}</h3>}
                                        {item.selectedSugar && <h3>Sugar: {item.selectedSugar}</h3>}
                                    </div>
                                
                                    <div className='modal-price'>
                                        <h3>₱{item.price}</h3>
                                    </div>
                                    <div className='POS-modalDiv'></div>
                                </div>
                            ))
                        ) : (
                            <h3 className='no-items'>No items available</h3>
                        )}
                    </div>
                </div>
                <div className='POS-buttons'>
                    <button className='modal-reject' onClick={openDeclineModal}>Decline</button>
                    <button className='modal-accept' onClick={handleAccept}>Accept</button>
                </div>
            </div>

            {/* Decline Modal */}
            {isDeclineModalOpen && (
                <DeclineModal 
                    reason={reason}
                    setReason={setReason}
                    handleDecline={handleDecline}
                    closeDeclineModal={closeDeclineModal} 
                />
            )}
        </div>
    );
};


  const PreparingModal = ({ order, closeModal }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.status); // Initialize with current status
  
    // Handle status change
    const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value); // Update the selected status
    };
  
    // Update the order status in the database
    const handleStatusUpdate = async () => {
      try {
        const orderRef = doc(database, 'order_info', order.id);
        await updateDoc(orderRef, {
          status: selectedStatus, // Use selected status
        });
        closeModal(); // Close modal after updating status
        window.location.reload();
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
  
    // Format the order timestamp
    const orderTimestamp = order.timestamp ? order.timestamp.toDate().toLocaleString() : "Unknown Date";
  
    return (
      <div className="POS-modal">
        <div className="POSmodal-content">
          <div className="POS-main-modal">
          <div className='close-modalx' onClick={closeModal}><h3>X</h3></div>
            <div className="modal-header">
              <h2 className="ordnum-modal">Order #{order.orderNumber}</h2>
              <h3 className="modal-timedate">{orderTimestamp}</h3>
            </div>
            <div className="custom-details">
              <h3 className="cust-name">{order.customerName}</h3>
              <h3 className="cust-add">{order.customerAddress}</h3>
            </div>
            <div className="modal-orderDetails">
              {order.orders && Array.isArray(order.orders) && order.orders.length > 0 ? (
                order.orders.map((item, index) => (
                  <div key={index}>
                    <div className="modal-nameQuan">
                      <h3 className="modal-prodName">{item.productName}</h3>
                      <h3>x {item.quantity}</h3>
                    </div>
  
                    <div className="modal-addons">
                      {item.selectedAddOns && Array.isArray(item.selectedAddOns) && item.selectedAddOns.length > 0 ? (
                        item.selectedAddOns.map((addon, addonIndex) => (
                          <h3 key={addonIndex}>{addon}</h3>
                        ))
                      ) : (
                        <h3>No addons available for {item.productName}</h3>
                      )}
  
                      {item.selectedSize && <h3>Size: {item.selectedSize}</h3>}
                      {item.selectedSugar && <h3>Sugar: {item.selectedSugar}</h3>}
                    </div>
  
                    <div className="modal-price">
                      <h3>₱{item.price}</h3>
                      <div className="POS-modalDiv"></div>
                    </div>
                  </div>
                ))
              ) : (
                <h3 className="no-items">No items available</h3>
              )}
            </div>
          </div>
  
          {/* Dropdown for changing order status */}
          <div className="status-dropdown">
            <label htmlFor="status">Choose Status:</label>
            <select id="status" value={selectedStatus} onChange={handleStatusChange}>
              <option value="preparing">Preparing</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="ready for pickup">Ready for Pickup</option>
              <option value="order completed">Order Completed</option>
            </select>
          </div>
  
          {/* Button to apply the new status */}
          <div className="POS-buttons">
            <button className="modal-update" onClick={handleStatusUpdate}>
              Update Status
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  

// Decline Modal Component (For Reason Input)
const DeclineModal = ({ reason, setReason, handleDecline, closeDeclineModal }) => {
  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <div className='declined-modal'>
      <div className='declined-modal-content'>
        <h3>Decline Order</h3>
        <div className='reason'>
          <label htmlFor='reason'>Reason:</label>
          <input
            type='text'
            id='reason'
            value={reason}
            onChange={handleReasonChange}
            placeholder='Enter reason for declining'
          />
        </div>
        <div className='modal-actions'>
          <button onClick={handleDecline}>Submit</button>
          <button onClick={closeDeclineModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// Main POS Component
function POS() {
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPreparingModalOpen, setIsPreparingModalOpen] = useState(false);
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            const querySnapshot = await getDocs(collection(database, 'order_info'));
            const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(ordersList);
        };

        fetchOrders();

        // Set interval to refresh the orders every 3 seconds
        const intervalId = setInterval(fetchOrders, 3000);

        // Cleanup the interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    const openDeclineModal = () => {
        setIsDeclineModalOpen(true);
    };

    const closeDeclineModal = () => {
        setIsDeclineModalOpen(false);
    };
    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null);
    };

    const openPreparingModal = (order) => {
        setSelectedOrder(order);
        setIsPreparingModalOpen(true);
    };

    const closePreparingModal = () => {
        setIsPreparingModalOpen(false);
        setSelectedOrder(null);
    };

    const handleAccept = async (order) => {
        if (!order || !order.id) {
            console.error('Order is null or does not have an id');
            return; // Exit early if the order is invalid
        }
    
        const orderRef = doc(database, 'order_info', order.id);
        try {
            await updateDoc(orderRef, {
                status: 'preparing' // Change order status to 'preparing'
            });
            closeModal(); // Close the modal after the update
            window.location.reload();
        } catch (error) {
            console.error('Error accepting order:', error);
        }
    };
    

    // Handle Decline function - Move it to POS
    const [reason, setReason] = useState("");
    const handleDecline = async (order) => {
        // Update status to 'declined' and store the reason in Firebase
        const orderRef = doc(database, 'order_info', selectedOrder.id);
        await updateDoc(orderRef, {
            status: 'declined',
            reason: reason
        });
        closeModal();
        window.location.reload();
    };

    // Filter orders to only display those with status 'for approval'
    const forApprovalOrders = orders.filter(order => order.status === 'for approval');

    // Filter orders for preparing status
    const preparingOrders = orders.filter(order => order.status === 'preparing' || order.status === 'out for delivery' || order.status === 'ready for pickup');

  return (
    <div className='POS-main'>
       <div className='incoming-orders'>
                <div className='POS-header'>Incoming Orders</div>
                <div className='POS-list'>
                    {/* Render only orders with status 'for approval' */}
                    {forApprovalOrders.map(order => (
                        <div className='incoming-details'>
                            <div className='incoming-detail1'onClick={() => openModal(order)} key={order.id}>
                                <div className='ordnum-service'>
                                    <div className='ord-num'><h2>Order #{order.orderNumber}</h2></div>
                                    <div className='service'><h3>{order.serviceOption}</h3></div>
                                </div>
                                <div className='incoming-price'><h3>TOTAL: ₱{order.totalAmount}</h3></div>
                            </div>
                            <div className='incoming-detail2'>
                                <div className='incoming-reject'>
                                    <button onClick={openDeclineModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                            <circle cx="22.7148" cy="22.5576" r="21.5" stroke="#B20000" stroke-width="2"/>
                                            <path d="M16.918 17.4209L28.39 28.4538" stroke="#B20000" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M28.39 17.4209L16.918 28.4538" stroke="#B20000" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>

                                <div className='incoming-accept'>
                                    <button onClick={() => handleAccept(order)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" viewBox="0 0 46 46" fill="none">
                                            <circle cx="22.7803" cy="22.5576" r="21.5" stroke="#5C8F4C" stroke-width="2"/>
                                            <path d="M13.8867 24.5664L21.3041 29.1906" stroke="#5C8F4C" stroke-width="2" stroke-linecap="round"/>
                                            <path d="M32.2881 15.5483L21.9961 29.5703" stroke="#5C8F4C" stroke-width="2" stroke-linecap="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

      <div className='preparing-orders'>
        <div className='POS-header'>Preparing Orders</div>
        <div className='preparing-details'>
          {preparingOrders.map(order => (
            <div className='prep-content' onClick={() => openPreparingModal(order)} key={order.id}>
              <div className='prep-detail1'>
                <h2>Order #{order.orderNumber}</h2>
                <h3>Pickup</h3>
              </div>
              <div className='prep-detail2'>
                <h3>TOTAL: ₱{order.totalAmount}</h3>
                <h3>STATUS: {order.status}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedOrder && 
                <POSmodal 
                    order={selectedOrder} 
                    closeModal={closeModal} 
                    handleAccept={handleAccept} 
                    handleDecline={handleDecline}
                    setReason={setReason}
                    reason={reason}
                />
            }

            {isPreparingModalOpen && selectedOrder && <PreparingModal order={selectedOrder} closeModal={closePreparingModal} />}

           {/* Decline Modal */}
            {isDeclineModalOpen && (
                <DeclineModal 
                    reason={reason}
                    setReason={setReason}
                    handleDecline={handleDecline}
                    closeDeclineModal={closeDeclineModal} 
                />
            )} 
    </div>
  );
}

export default POS;
