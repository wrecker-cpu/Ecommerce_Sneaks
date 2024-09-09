import React from 'react'
import card from '/card.png'
import paypal from '/paypal.png'
import mastercard from '/mastercard.png'

export default function Footer() {
  return (
    <div className="footer">
    <div className="footer-content">
    <div className="payment-icons">
          <img src={card} alt="Visa" className="payment-icon" /> 
        <img src={mastercard} alt="MasterCard" className="payment-icon" />
        <img src={paypal} alt="PayPal" className="payment-icon" /> 
      </div>
      <p>© 2024 Your Company. All rights reserved.</p>
      
    </div>
  </div>
  )
}
