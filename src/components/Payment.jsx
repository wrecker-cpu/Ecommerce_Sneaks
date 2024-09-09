// Payment.js

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShipping, resetShipping } from '../store/ShippingAddress/ShippingAddressSlice';
import { setOrder } from '../store/OrderSlice/OrderSlice';
import { resetCart } from '../store/CartSlice/CartSlice';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import { setValidationErrors, resetValidationErrors } from '../store/ValidationSlice/ValidationSlice';

export default function Payment() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const shippingAddress = useSelector((state) => state.shipping);
  const order = useSelector((state) => state.order);
  const validationErrors = useSelector((state) => state.validation.errors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  function generateUniqueId() {
    return Date.now().toString();
  }

  const validateForm = () => {
    let valid = true;

    if (!shippingAddress.name || shippingAddress.name.trim() === '') {
      dispatch(setValidationErrors({ field: 'name', message: 'Name is required' }));
      valid = false;
    }

    if (!shippingAddress.phoneNumber || !/^\d{10}$/.test(shippingAddress.phoneNumber)) {
      dispatch(setValidationErrors({ field: 'phoneNumber', message: '10 Number is Required' }));
      valid = false;
    }

    if (!shippingAddress.address || shippingAddress.address.trim() === '') {
      dispatch(setValidationErrors({ field: 'address', message: 'Address is required' }));
      valid = false;
    }

    if (!shippingAddress.pincode || !/^\d{6}$/.test(shippingAddress.pincode)) {
      dispatch(setValidationErrors({ field: 'pincode', message: 'Valid 6 digit pincode is required' }));
      valid = false;
    }

    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(getShipping({ [name]: value }));
    dispatch(resetValidationErrors()); // Clear validation errors when input changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderId = generateUniqueId();
    dispatch(
      setOrder({
        id: orderId,
        items: cart.items,
        shippingAddress: { ...shippingAddress },
      })
    );
   

    setShowModal(true);
    setTimeout(() => {
      dispatch(resetShipping());
      dispatch(resetCart());
      setShowModal(false);
      navigate('/shoes');
    }, 5000);

    console.log(order);
  };

  return (
    <div className="payment-container">
      <ConfirmModal showModal={showModal} />
      <div className="payment-heading">
        <p>
          <span>
            <Link className="link-button" to={`/`}>
              Home/
            </Link>
          </span>
          <span>
            <Link className="link-button" to={'/shoes/checkout'}>
              checkout
            </Link>
          </span>
          / payment
        </p>
      </div>
      <div className="payment-content">
        <div className="first-part">
          <div className="shipping-heading">
            <p>Tell me your location, and I'll drop off those sneaker vibes!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-fields-first">
              <div>
                <p>
                  <label>Name</label>
                </p>
                <p>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleInputChange}
                  />
                  {validationErrors.name && <p className="error-message">{validationErrors.name}</p>}
                </p>
              </div>
              <div>
                <p>
                  <label>Phone Number</label>
                </p>
                <p>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={shippingAddress.phoneNumber}
                    onChange={handleInputChange}
                  />
                  {validationErrors.phoneNumber && (
                    <p className="error-message">{validationErrors.phoneNumber}</p>
                  )}
                </p>
              </div>
            </div>
            <div className="input-fields-second">
              <p>
                <label>Address</label>
              </p>
              <p>
                <textarea
                  cols={72}
                  rows={8}
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                />
                {validationErrors.address && (
                  <p className="error-message">{validationErrors.address}</p>
                )}
              </p>
            </div>
            <div className="input-fields-third">
              <p>
                <label>Pincode</label>
              </p>
              <p>
                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleInputChange}
                />
                {validationErrors.pincode && (
                  <p className="error-message">{validationErrors.pincode}</p>
                )}
              </p>
            </div>
            <div className="input-fields-fourth">
              <div>
                <button type="button" onClick={() => dispatch(resetShipping())}>
                  Reset
                </button>
              </div>
              <div>
                <button type="submit">Shippppp</button>
              </div>
            </div>
          </form>
        </div>
        <div className="second-part">
          <div className="checkout-table">
            <table>
              <tbody>
                {cart.items.map((cartItem) => {
                  return (
                    <tr key={`${cartItem.id}-${cartItem.size}`}>
                      <td>
                        <div className="payment-image">
                          <img src={cartItem.imageURL} alt="head" />
                          <span className="quantity">{cartItem.quantity}</span>
                        </div>
                        <div className="checkout-shoes-details">
                          <div>
                            <p>{cartItem.name}</p>
                            <p>
                              Size: <span className="shoes-summary">{cartItem.size}</span>
                            </p>
                            <p>
                              Brand: <span className="shoes-summary">{cartItem.brand}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>${cartItem.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="payment-summary">
            <div>
              <h2>Order Summary</h2>
            </div>
            <div className="payment-subtotal">
              <div>
                <p>Sub Total</p>
              </div>
              <div className="subtotal-partition">
                <div>
                  <p>Items: {cart.totalQuantity}</p>
                </div>
                <div>
                  <p>${cart.totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="discount-partition">
              <div>
                <p>Discount</p>
              </div>
              <div>
                <p>$0</p>
              </div>
            </div>
          </div>
          <div className="total-amount">
            <div>
              <h2>Total Amount</h2>
            </div>
            <div>
              <p>${cart.totalPrice}</p>
            </div>
          </div>
          <div className="payment-tax">(inclusive of tax 0.00$)</div>
        </div>
      </div>
    </div>
  );
}
