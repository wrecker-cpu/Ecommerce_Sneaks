import React, { useEffect, useState } from "react";
import sample1 from "/sample1.jpg";
import sample2 from "/sample2.jpg";
import sample3 from "/sample3.jpg";
import bannerpic from "/bannerimage.jpg";
import bannerpic2 from "/travis.jpg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  
  const products = useSelector(state => state.products.slice(20, 24),(prev, next) => prev.length === next.length);

  const [showPopup, setShowPopup] = useState(false);
  const [showSecondPopup, setSecondPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 13, minutes: 30, seconds: 10 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        const { days, hours, minutes, seconds } = prevTime;
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(interval);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeightToShowPopup = 540;
      const scrollHeightToHidePopup = 950;

      if (window.scrollY > scrollHeightToHidePopup || window.scrollY < scrollHeightToShowPopup) {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeightToShowPopup = 1300; // Adjust this scroll height as needed
      const scrollHeightToHidePopup = 1900; // Adjust this scroll height as needed

      if (window.scrollY > scrollHeightToHidePopup || window.scrollY < scrollHeightToShowPopup) {
        setSecondPopup(false);
      } else {
        setSecondPopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatTime = ({ days, hours, minutes, seconds }) => {
    return `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
  };

  return (
    <div className="content-container">
      <div className="grab-banner">
        <h2>Grab Your Sneaks quotes should be change all the time</h2>
      </div>
      <div className="discount-banner">
        <p> <span>Sale: </span>{formatTime(timeLeft)}</p>
      </div>
      <div className="main-banner">
        <div className="main-image-container">
          <div className="image-wrapper">
            <img src={sample1} alt="Image 1" className="grid-image" />
            <div className="overlay">
              <p className="overlay-text">Unisex Section</p>
              <Link to='/shoes' className="overlay-button">Explore</Link>
            </div>
          </div>
          <div className="image-wrapper">
            <img src={sample2} alt="Image 2" className="grid-image" />
            <div className="overlay">
              <p className="overlay-text">Male Section</p>
              <Link to='/shoes/MEN' className="overlay-button">Explore</Link>
            </div>
          </div>
          <div className="image-wrapper">
            <img src={sample3} alt="Image 3" className="grid-image" />
            <div className="overlay">
              <p className="overlay-text">Female Section</p>
              <Link to='/shoes/WOMEN'  className="overlay-button">Explore</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="second-banner">
        <div className="cropped-image">
          <img src={bannerpic} />
        </div>
        <div className="aligned-text">
          <h1>
            Cinderella is proof that a new pair of shoes can change your life."
          </h1>
          <Link className="aligned-text-link" to={`/shoes/WOMEN`}>View More</Link>
          <div className={`popup ${showPopup ? "show" : ""}`}>
            <h3>Popup Content Here</h3>
            <p>This is where your popup content goes.</p>
          </div>
        </div>
      </div>
      <div className="third-banner">
        <div className="aligned-text-mens">
          <h1>"Shoes make an outfit; they're like rims for a car.</h1>
          <Link className="aligned-text-mens-link"  to={`/shoes/MEN`}>View More</Link>
          <div className={`popup-mens ${showSecondPopup ? "show" : ""}`}>
            <h3>Popup Content Here</h3>
            <p>This is where your popup content goes.</p>
          </div>
        </div>
        <div className="cropped-image-mens">
          <img src={bannerpic2} alt="Travis Pic" />
        </div>
      </div>
      <div className="list-banner">
        <div className="page-width">
          <h2 className="second-banner-heading">Discover Our Latest Styles</h2>
          <div className="listing-item">
            {products.map((product) => (
              <div key={product.id} className="listed-item">
                <div className="product-image-container">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <p>{product.name}</p>
                <h3>${product.price}</h3>
                <div className="listed-link">
                <Link className="listed-item-link" to={`shoes/shoesdetails/${product.id}`}>View</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
