import React, { useState } from 'react';
import './Details.css';

function Details() {
  // State to manage which section is visible
  const [activeSection, setActiveSection] = useState('details');

  // Handler functions for button clicks
  const showDetails = () => setActiveSection('details');
  const showHours = () => setActiveSection('hours');

  return (
    <div className="container" id='details-container'>
      <div className="row">
        <div className="col" id='col1'>
          <button 
            className={`btn btn-primary ${activeSection === 'details' ? 'active' : ''}`} 
            type="button"
            onClick={showDetails}
            id='btn1'
          >
            Store Details
          </button>
          <button 
            className={`btn btn-primary ${activeSection === 'hours' ? 'active' : ''}`} 
            type="button"
            onClick={showHours}
          >
            Store Hours
          </button>

          {/* Conditionally render the content based on the activeSection state */}
          {activeSection === 'details' && (
            <ul>
              <li><span>Delivery Radius: </span> 5 km</li>
              <li><span>Delivery Fee: </span> PHP 70</li>
              <li><span>Estimated Delivery Time: </span> 30 minutes</li>
              <li><span>Pick-Up Time: </span> Not Applicable</li>
              <li><span>Accepted Payment Methods: </span> Cash only</li>
              <li><span>Additional Notes: </span> The delivery fee is subject to change based on your specific location.</li>
            </ul>
          )}

          {activeSection === 'hours' && (
            <img 
              src='image/store-sched.png' 
              className="store-sched" 
              alt="store-schedule" 
            />
          )}
        </div>
        
        <div className="col" id='col2'>
          <img 
            src='image/product-banner.png' 
            className="product-image" 
            alt="product-image" 
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
