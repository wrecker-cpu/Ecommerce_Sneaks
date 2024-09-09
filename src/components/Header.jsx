import React from "react";
import imageSrc from "/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {

  const cart = useSelector((state) => state.cart);



  return (
    <div className="header-container">
      <div>
        <Link to='/'><img src={imageSrc} alt="logo" className="logo-img"/></Link>
        
      </div>
      <div className="gender-container">
        <ul>
          <li className="gender-perferences">
            <Link className="link-buttons" to='/shoes/MEN'>MEN</Link>
            <Link className='link-buttons'to='/shoes/WOMEN'>WOMEN</Link>
          </li>
        </ul>
      </div>
      <div className="links-tabs">
        <FontAwesomeIcon icon={faSearch} className="action-icon" />
        <div className="icon-with-quantity">
          <Link className="link-button" to='/shoes/checkout'>
          <FontAwesomeIcon icon={faShoppingCart} className="action-icon" />
          
          {cart.totalQuantity > 0 && (
              <span className="quantity-badge">{cart.totalQuantity}</span>
            )}
          </Link>
          
        </div>
        <Link className='link-button' to={'/userprofile'}>
        <FontAwesomeIcon icon={faUser} className="action-icon" />
        </Link>
      </div>
    </div>
  );
}
