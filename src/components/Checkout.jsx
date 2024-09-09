import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../store/CartSlice/CartSlice";
import EmptyCart from "./EmptyCart";

export default function Checkout() {
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  if (cart.items.length === 0) {
    return (
      <EmptyCart/>
    );
  }

  const handleRemoveItem = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  return (
    <div className="checkout-container">
      <div className="checkout-heading">
        <p>
          <span>
            <Link className="link-button" to="/">Home</Link>
          </span>
            <Link className="link-button">/ checkout</Link>
        </p>
      </div>
      <div>
        <div className="checkout-counter">
          <div className="checkout-table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((cartItem) => {
                  const product = products.find((p) => p.id === cartItem.id);
                  if (!product) return null;

                  return (
                    <tr key={`${cartItem.id}-${cartItem.size}`}>
                      <td>
                        <div className="checkout-image">
                          <img src={product.imageURL} alt={product.name} />
                        </div>
                        <div className="checkout-shoes-details">
                          <div>
                            <p>{cartItem.name}</p>
                            <p>Size: <span className="shoes-summary">{cartItem.size}</span></p>
                            <p>Brand: <span className="shoes-summary">{product.brand}</span></p>
                            <p>
                              <button onClick={() => handleRemoveItem(cartItem.id, cartItem.size)}>Remove</button>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>${cartItem.price}</td>
                      <td>{cartItem.quantity}</td>
                      <td>${cartItem.totalPrice}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="checkout-summary">
            <div>
              <h2>Order Summary</h2>
            </div>
            <div className="checkout-summary-subtotal">
              <div>
                <p>Sub Total</p>
              </div>
              <div>
                <p>${cart.totalPrice}</p>
              </div>
            </div>
            <div className="checkout-summary-total">
              <div>
                <p>Total</p>
              </div>
              <div>
                <p>${cart.totalPrice}</p>
              </div>
            </div>
            <div className="checkout-tax">(inclusive of tax 0.00$)</div>
            <div className="checkout-summary-button">
              <Link to="/shoes/checkout/payment" className="checkout-link-button">
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
