import React from 'react';
import './CustomerInfo.css'; 

const CustomerInfo = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='headCI'>
            <div className='headCItext'>Customer Information</div>
        </div>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Contact Number:</strong> {user.contact}</p>
        <button onClick={onClose}>Close</button>
      </div>

    <img src='image/cup-logo.png' alt='cup' className='cup' />

    </div>
  );
};

export default CustomerInfo;
