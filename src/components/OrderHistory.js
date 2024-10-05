import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './OrderHistory.css';

export default function OrderHistory() {
  return (
    <div className='main'>
        <div className='box' >
            <span className='title' >Order History</span>
            <span className='text' >Note that Order History are only visible weekly </span>

            <div className='order'>
                Hot Coffee
            </div>

            <div className='cup-container'>
                <img className='cup' src='image/cup-logo.png' alt='Logo-Cup'/>
            </div>
        </div>

    </div>
  )
}
