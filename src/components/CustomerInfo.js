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
        <p className='userCI' ><strong>ID:</strong> {user.id}</p>
        <p className='nameCI'><strong>Name:</strong> {user.name}</p>
        <p className='addCI'><strong>Address:</strong> {user.address}</p>
        <p className='numberCI'><strong>Contact Number:</strong> {user.contact}</p>
        <button className='btnCI' onClick={onClose}>Close</button>
      </div>

    <img src='image/cup-logo.png' alt='cup' className='cup' />

    </div>
  );
};

export default CustomerInfo;
