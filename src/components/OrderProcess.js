import React from 'react'
import Footer from './Footer'
import Table from 'react-bootstrap/Table';
import './OrderProcess.css'

function OrderProcess() {
  return (
    <div className='orderContainer-main'>
      <div className='orderDetails-container'>
        <div className='container-process'>
            <div className='main-details'>
                <div className='logo-container'>
                    <img className='cup' src='image/cup-logo.png' alt='Logo-Cup'/>
                </div>
                <div className='message'>
                    <h6 className='message1'>THANK YOU, AICA!</h6>
                    <h6 className='message2'>Track Your Order Below.</h6>
                    <h6 className='message3'>Order #202101288</h6>
                </div>
                <div className='process'>
                    {/* <div className='division2'></div> */}
                    <div className='icons-content'>
                        <div className='icon-process'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" viewBox="0 0 18 22" fill="none">
                                <path d="M11 7H5M13 11H5M10 15H5M1 1V21L3 20L5 21L7 20L9 21L11 20L13 21L15 20L17 21V1L15 2L13 1L11 2L9 1L7 2L5 1L3 2L1 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div className='division2'></div>
                        <div className='icon-process'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" fill="currentColor" class="bi bi-cup-hot" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" d="M.5 6a.5.5 0 0 0-.488.608l1.652 7.434A2.5 2.5 0 0 0 4.104 16h5.792a2.5 2.5 0 0 0 2.44-1.958l.131-.59a3 3 0 0 0 1.3-5.854l.221-.99A.5.5 0 0 0 13.5 6zM13 12.5a2 2 0 0 1-.316-.025l.867-3.898A2.001 2.001 0 0 1 13 12.5M2.64 13.825 1.123 7h11.754l-1.517 6.825A1.5 1.5 0 0 1 9.896 15H4.104a1.5 1.5 0 0 1-1.464-1.175"/>
                                <path stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"  d="m4.4.8-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 3.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 3.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 3 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 4.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.253.382l-.018.025-.005.008-.002.002A.5.5 0 0 1 6.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 6.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 6 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 7.4.8m3 0-.003.004-.014.019a4 4 0 0 0-.204.31 2 2 0 0 0-.141.267c-.026.06-.034.092-.037.103v.004a.6.6 0 0 0 .091.248c.075.133.178.272.308.445l.01.012c.118.158.26.347.37.543.112.2.22.455.22.745 0 .188-.065.368-.119.494a3 3 0 0 1-.202.388 5 5 0 0 1-.252.382l-.019.025-.005.008-.002.002A.5.5 0 0 1 9.6 4.2l.003-.004.014-.019a4 4 0 0 0 .204-.31 2 2 0 0 0 .141-.267c.026-.06.034-.092.037-.103a.6.6 0 0 0-.09-.252A4 4 0 0 0 9.6 2.8l-.01-.012a5 5 0 0 1-.37-.543A1.53 1.53 0 0 1 9 1.5c0-.188.065-.368.119-.494.059-.138.134-.274.202-.388a6 6 0 0 1 .253-.382l.025-.035A.5.5 0 0 1 10.4.8"/>
                            </svg>
                        </div>
                        <div className='division2'></div>
                        <div className='icon-process'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" fill="currentColor" class="bi bi-bicycle" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" stroke="black" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round" d="M4 4.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1v.5h4.14l.386-1.158A.5.5 0 0 1 11 4h1a.5.5 0 0 1 0 1h-.64l-.311.935.807 1.29a3 3 0 1 1-.848.53l-.508-.812-2.076 3.322A.5.5 0 0 1 8 10.5H5.959a3 3 0 1 1-1.815-3.274L5 5.856V5h-.5a.5.5 0 0 1-.5-.5m1.5 2.443-.508.814c.5.444.85 1.054.967 1.743h1.139zM8 9.057 9.598 6.5H6.402zM4.937 9.5a2 2 0 0 0-.487-.877l-.548.877zM3.603 8.092A2 2 0 1 0 4.937 10.5H3a.5.5 0 0 1-.424-.765zm7.947.53a2 2 0 1 0 .848-.53l1.026 1.643a.5.5 0 1 1-.848.53z"/>
                            </svg>
                        </div>
                        <div className='division2'></div>
                        <div className='icon-process'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bag-check" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" stroke="black" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round"  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                <path fill-rule="evenodd" stroke="black" stroke-width="0.2" stroke-linecap="round" stroke-linejoin="round" d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='order-details-container'>
                    <h6 className='details'>Order placed on November 5, 2024 at 3:08 PM</h6>
                </div>
                <div className='other-derails-container'>
                    <div className='deliverTo-container'>
                        <h6>Deliver to:</h6>
                        <h6>351 Juan Luna Divisoria, Tondo, Manila Metro Manila (NCR)</h6>
                        <h6>Estimated Time of Arrival: 3:40 PM - 3:50PM</h6>
                    </div>
                    <div className='customerInfo-container'>
                        <h6>Customer Information</h6>
                        <h6>Aica Rose Magnifico Tabayoyong</h6>
                        <h6>aicatabayoyong@gmail.com</h6>
                        <h6>012398712212</h6>
                    </div>
                </div>
                <div className='division1'></div>
                <div className='title-order-container'>
                    <h6 className='title-order'>Order Summary</h6>
                </div>
                <div className='table-container'>
                    <Table >
                        <thead>
                            <tr>
                            <th className='table-title2'>Qty</th>
                            <th className='table-title1'>Item</th>
                            <th className='table-title3'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className='table-qty'>1</td>
                            <td className='table-itemName'>Chocolate Frappe</td>
                            <td className='table-price'>₱ 123.00</td>
                            </tr>
                            <tr>
                            <td className='table-qty'>1</td>
                            <td className='table-itemName'><div className='with-addons'><span>Chocolate Frappe</span><span className='addons-namePrice'>Whipped Cream</span></div></td>
                            <td className='table-price'><div className='with-addons'><span>₱ 173.00</span><span className='addons-namePrice'>₱ 50.00</span></div></td>
                            </tr>
                            <tr>
                            <td className='table-details'><div className='details-order1'><span>Subtotal:</span><span>Delivery Fee:</span><span>Less VAT</span><span>Less Senior/PWD</span><span className='total-item'>Total</span></div></td>
                            <td className='table-qty'></td>
                            <td className='table-details'><div className='details-order2'><span>₱ 419.00</span><span>₱ 59.00</span><span>-₱ 59.00</span><span>-₱ 39.00</span><span className='total-itemPrice'>₱ 380.00</span></div></td>
                            </tr>
                            <tr className='ModePayment-container'>
                            <td className='ModeOfPayment'>Mode of Payment</td>
                            <td className='table-qty'></td>
                            <td className='Payment'>Cash</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
      </div>  
      <div className='footer'>
        <Footer />
      </div>  
    </div>
  )
}

export default OrderProcess
