import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../store/CartSlice/CartSlice";
import check from '/check.png'

export default function ShoesDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const productId = parseInt(id, 10); 
  const product = products.find((product) => product.id === productId);

  const [selectedSize, setSelectedSize] = useState(""); 
  const [quantity, setQuantity] = useState(1); 
  const [showPopup, setShowPopup] = useState(false); 

  console.log("Selected Product:", product);

  if (!product) {
    return <div>Loading...</div>; 
  }


  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }

    if (quantity <=0) {
    alert(`Please select a Positive Quantity`);
    return;
  }

    const newItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      brand:product.brand,
      imageURL: product.imageURL,
      size: selectedSize,
      quantity: quantity, 
    };
    dispatch(addToCart(newItem));
    setShowPopup(true); 

    
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };


  useEffect(() => {
    let timeout;
    if (showPopup) {
      timeout = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    return () => clearTimeout(timeout);
  }, [showPopup]);


  return (
    <div className="shoedetails-container">
      <div>
        <p>
          <span>
            <Link className="link-button" to="/">
              Home /
            </Link>
          </span>{" "}
          <span>
            <Link className="link-button" to={`/shoes/${product.gender}`}>
              {product.gender}
            </Link>
          </span>{" "}
          / {product.name}
        </p>
      </div>
      <div className="shoedetails-items-container">
        <div className="shoedetails-items">
          <div className="shoedetails-items-imageholder">
            <img src={product.imageURL} alt={product.name} />
            <div className={`addtocart-popup ${showPopup ? 'show':'hide'}`}>
            <div className="addtocart-logo-spacing">
             <div> <h3>Add to Your Cart</h3></div>
             <div><img src={check}/></div>
            </div>  
            
            <Link to={`/shoes/checkout`} className="add-link-button">View Cart</Link>
          </div>
          </div>
          <div className="shoedetails-description">
            <div className="shoedetails-heading">
              <p>{product.name}</p>
            </div>
            <div className="shoedetails-price">
              <p>${product.price}</p>
            </div>
            <div className="shoedetails-varient">
              <ul>
                <li>
                  <span>Slug:</span> {product.slug}
                </li>
                <li>
                  <span>Brand:</span> {product.brand}
                </li>
                <li>
                  <span>Category:</span> {product.category}
                </li>
              </ul>
            </div>
            <form>
              <div className="shoedetails-input">
                <input
                  type="number"
                  placeholder="Qty"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="shoedetails-input-size">
                <div>
                  <label htmlFor="s">
                    <input
                      type="radio"
                      id="s"
                      name="size"
                      value="S"
                      checked={selectedSize === "S"}
                      onChange={() => setSelectedSize("S")}
                    />
                    S
                  </label>
                </div>
                <div>
                  <label htmlFor="m">
                    <input
                      type="radio"
                      id="m"
                      name="size"
                      value="M"
                      checked={selectedSize === "M"}
                      onChange={() => setSelectedSize("M")}
                    />
                    M
                  </label>
                </div>
                <div>
                  <label htmlFor="l">
                    <input
                      type="radio"
                      id="l"
                      name="size"
                      value="L"
                      checked={selectedSize === "L"}
                      onChange={() => setSelectedSize("L")}
                    />
                    L
                  </label>
                </div>
              </div>
              <div className="shoedetails-input-button">
                <button type="button" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              </div>
              <div className="shoedetails-left">
                <p>
                  <span>Stock Left: </span>
                  {product.items_left}
                </p>
              </div>
              <div className="shoedetails-paragraph">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Odio quos aut dolores laboriosam iste non sequi voluptatibus
                  eveniet, eius laudantium incidunt, id laborum molestiae
                  repellat molestias fuga nisi earum beatae?
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
