import React from 'react'
import './Checkout.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const MapComponent = () => {
  const position = [14.3277, 121.0778]; // Coordinates for the address

  // Define the custom SVG icon using L.divIcon
  const svgIcon = L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="red" class="bi bi-geo-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
      </svg>
    `,
    className: '', // Remove any default Leaflet styles
    iconSize: [32, 32], // Set icon size (width, height)
    iconAnchor: [16, 32], // Set the anchor point (the "tip" of the marker)
    popupAnchor: [0, -32] // Adjust the popup anchor relative to the icon
  });

  return (
    <MapContainer center={position} zoom={100} style={{ height: "450px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={svgIcon}> {/* Use the custom SVG icon */}
        <Popup>
          Block 6 Lot 17 Paradise St.<br />Saint Francis Homes 7<br />Binãn, Philippines
        </Popup>
      </Marker>
    </MapContainer>
  );
};

function Checkout() {
  return (
    <div className='main-checkout'>
      <form action='#' >
        <div className='main-info-container'>
          <div className='customer-info'>
            <h2 className='checkout-title'>Customer Information</h2>
            <div className='r1'>
              <div class="input-container">
                  <input type="text" id="firstName" class="styled-input" disabled value={'Kricel'}/>
                  <label for="firstName" class="floating-label">First Name</label>
              </div>
              <div class="input-container">
                  <input type="text" id="lastName" class="styled-input" disabled value={'Belmonte'}/>
                  <label for="lastName" class="floating-label">Last Name</label>
              </div>
            </div>
            <div className='r2'>
              <div class="input-container">
                    <input type="text" id="email" class="styled-input" disabled value={'belmonte123@gmail.com'}/>
                    <label for="email" class="floating-label">Email</label>
              </div>
              <div class="input-container">
                  <input type="text" id="phoneNumber" class="styled-input" disabled value={'09651898702'}/>
                  <label for="phoneNumber" class="floating-label">Phone Number</label>
              </div>
            </div>
          </div>
          <div className='info-divider'></div>
          <div className='service-opt'>
            <h2 className='checkout-title'>Service Option</h2>
            <div className='radio-btn'>
              <input type="radio" id="delivery" name='selection' value="Delivery" checked/>
              <label for="html">For Delivery</label><br></br>
              <input type="radio" id="pickup" name='selection' value="Pickup"/>
              <label for="html">For Pickup</label>
            </div>
              <h3 className='sub-title'> Delivery to</h3>
            <div className='deliver-to'>
              <div className='deliver-map'>
                <MapComponent />
              </div>
              <div className='address-info'>
                <div className='delivery-address'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                          <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"/>
                          <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <textarea type="text" maxlength="50" id="address"  value={'351 Juan Luna Divisoria, Tondo, Manila Metro Manila (NCR)'}/>
                </div>
                <div class="input-container">
                  <textarea type="text" maxlength="100" id="details-address" class="styled-input" />
                  <label for="details-address" id='details-label' class="floating-label">Address Details (Optional)</label>
              </div>
              </div>
            </div>
          </div>
          <div className='info-divider'></div>
          <div className='payment-method'>
            <h2 className='checkout-title'>Payment Method</h2>
            <div className='radio-btn'>
              <div className='payment-container'>
                <input type="radio" id="COD" name='payment' value="COD" checked/>
                <svg xmlns="http://www.w3.org/2000/svg"width="25" height="25" fill="currentColor" class="bi bi-cash" viewBox="0 0 16 16">
                  <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                  <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"/>
                </svg>
                <label for="html">Cash On Delivery</label>
              </div>
              <div className='payment-container'>
                <input type="radio" id="Online" name='payment' value="Online"/>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
                <label for="html">Online Payment</label>
              </div>
            </div>
          </div>
          <div className='info-divider'></div>
          <div className='apply-discount'>
            <h2 className='checkout-title'>Apply Discounts</h2>
            <h3 className='sub-title'>Select Senior or PWD Discount</h3>
            <div className='discount-inputs'>
              <input className='input-discount' id='senior-pwd' placeholder='Select Senior or PWD Discount' />
              <input className='input-discount' id='voucher-code' placeholder='Add Existing Voucher Codes' maxLength={7} />
            </div>
          </div>
        </div> 
      </form>
      <div className='order-summary'></div>
      
    </div>
  )
}

export default Checkout
