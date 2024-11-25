import React from 'react';
import './CustomerInfo.css'; 

const CustomerInfo = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className='headCI'>
            <div className='headCItext'>Account Information</div>
        </div>
        <div className='idCI'> <strong>ID Number: </strong> {user.id} </div>
          <div className='contentCI'>
              <div className='fnameCI'>
                <label>Full Name</label>
                <p className='nameCI'> {user.name}</p>
              </div>
              <div className='addressCI'>
                <label>Address</label>
                <p className='addCI'> {user.address}</p>
              </div>
              <div className='numCI'>
                <label>Contact Number</label>
                <p className='numberCI'>{user.contact}</p>
              </div> 
              <div className='emCI'>
                <label>Email Address</label>
                <p className='emailCI'>{user.email}</p>
              </div> 
          </div>
       
        <button className='btnCI' onClick={onClose}>Close</button>
      </div>

    <img src='image/cup-logo.png' alt='cup' className='cup' />

    </div>
  );
};

export default CustomerInfo;
