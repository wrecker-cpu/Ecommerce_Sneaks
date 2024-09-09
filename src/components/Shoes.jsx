import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPageMethod } from "../store/CurrentPageSlice/CurrentPageSlice";
import { Link, useParams } from "react-router-dom";

export default function Shoes() {
  const { gender } = useParams();
  const products = useSelector((state) => state.products);
  const currentPage = useSelector((state) => state.currentpage);
  const itemsPerPage = 9; 
  const dispatch=useDispatch();

  // const filteredProducts = gender ? products.filter(product => product.gender === gender) : products;


  const [selectedPrices, setSelectedPrices] = useState([]); 
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
 

 



  const filteredProducts = products
  .filter((product) => (gender ? product.gender === gender : true)) // Filter by gender if specified
  .filter((product) => {
    if (selectedPrices.length === 0) return true; // Return true for all products if no filters are selected
    return selectedPrices.some((priceRange) => {
      switch (priceRange) {
        case "30":
          return product.price <= 30;
        case "30-40":
          return product.price >= 30 && product.price <= 40;
        case "50-100":
          return product.price > 50 && product.price <= 100;
        case "100+":
          return product.price > 100;
        default:
          return true;
      }
    });
  })
  .filter((product) => {
    // Filter by selected categories
    if (selectedCategories.length === 0) return true; // Return true for all products if no categories are selected
    return selectedCategories.includes(product.category);
  })
  .filter((product) => {
    // Filter by selected brands
    if (selectedBrands.length === 0) return true; // Return true for all products if no brands are selected
    return selectedBrands.includes(product.brand);
  })
  .sort((a, b) => {
    if (sortOrder === "lowtohigh") {
      return a.price - b.price;
    } else if (sortOrder === "hightolow") {
      return b.price - a.price;
    } else {
      return 0; // Default: no sorting
    }
  });


  useEffect(() => {
    dispatch(currentPageMethod.setCurrentPage(1));
  }, [gender, dispatch]);

  // Determine whether to use filteredProducts or all products for pagination
  const totalItems = filteredProducts.length > 0 ? filteredProducts.length : products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(currentPageMethod.setCurrentPage(currentPage + 1));
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(currentPageMethod.setCurrentPage(currentPage - 1));
    }
  };

  const handlePriceFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPrices([...selectedPrices, value]);
    } else {
      setSelectedPrices(selectedPrices.filter((price) => price !== value));
    }
  };


  const handleCategoryFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };


  const handleBrandFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedBrands([...selectedBrands, value]);
    } else {
      setSelectedBrands(selectedBrands.filter((brand) => brand !== value));
    }
  };


  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };



  return (
    <div className="shoes-container">
      <div>
        <p><span><Link className='link-button' to={`/`}>Home</Link></span> / {gender || 'unisex'}</p>
      </div>
      <div className="shoes-heading-container">
        <div className="shoes-heading">
          <h2>{gender}</h2>
          <p>Grab Your Pairs</p>
        </div>
      </div>
      <div className="sortby-container">
        <div className="sorting-heading">
          <h4>Shop By</h4>
        </div>
        <div className="sorting-box">
          <span>Sort by:</span>
          <select name="sortOrder" id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="lowtohigh">Low to High</option>
            <option value="hightolow">High to Low</option>
          </select>
        </div>
      </div>
      <div className="shoes-view">
        <div className="filter-container">
          <div>
            <div className="filter-heading">
              <h4>Price</h4>
            </div>
            <div className="filter-category">
            <ul className="price-filters">
            <li>
              <input
                type="checkbox"
                id="price-less-than-30"
                name="price-filter"
                value="30"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-less-than-30">Less than $30</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="price-30-to-40"
                name="price-filter"
                value="30-40"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-30-to-40">$30 - $40</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="price-50-to-100"
                name="price-filter"
                value="50-100"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-50-to-100">$50 - $100</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="price-above-100"
                name="price-filter"
                value="100+"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-above-100">Above $100</label>
            </li>
          </ul>
            </div>
          </div>
          <div>
            <div className="filter-heading">
              <h4>Category</h4>
            </div>
            <div className="filter-category">
            <ul>
          <li>
            <input
              type="checkbox"
              name="category"
              value="RUNNING"
              onChange={handleCategoryFilterChange}
            />
            RUNNING
          </li>
          <li>
            <input
              type="checkbox"
              name="category"
              value="FOOTBALL"
              onChange={handleCategoryFilterChange}
            />
            FOOTBALL
          </li>
          <li>
            <input
              type="checkbox"
              name="category"
              value="CASUAL"
              onChange={handleCategoryFilterChange}
            />
            CASUAL
          </li>
          <li>
            <input
              type="checkbox"
              name="category"
              value="FORMAL"
              onChange={handleCategoryFilterChange}
            />
            OLD SCHOOL
          </li>
        </ul>
            </div>
          </div>
          <div>
            <div className="filter-heading">
              <h4>Brand</h4>
            </div>
            <div className="filter-category">
              <ul>
              <li>
                  <input
                    type="checkbox"
                    name="brand"
                    value="NIKE"
                    onChange={handleBrandFilterChange}
                  />
                  NIKE
                </li>
                <li>
                  <input
                    type="checkbox"
                    name="brand"
                    value="HUSHPUPPIES"
                    onChange={handleBrandFilterChange}
                  />
                  HUSHPUPPIES
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="shoes-view-all">
          <div className="shoes-items">
            {currentItems.map((product) => (
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
                <Link to={`/shoes/shoesdetails/${product.id}`} className="listed-item-link">View</Link>
                </div>
              </div>
            ))}
          </div>
          
        </div>
        
      </div>
      <div className="pagination">
        <div className="pagination-button">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            </div>
            <div className="pagination-button">
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
            </div>
          </div>
    </div>
  );
}
