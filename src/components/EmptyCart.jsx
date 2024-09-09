import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyCart() {
  return (
    <div className="empty-cart-container">
      <div className="empty-cart-content">
        <p>Your cart is empty.</p>
        <Link to={`/shoes`} className="empty-cart-link">Shop More</Link>
      </div>
    </div>
  )
}
