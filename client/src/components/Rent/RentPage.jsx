import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import '../Styles/RentPage.css';

function RentPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [perPage, currentPage]);

  useEffect(() => {
    applyFilters();
  }, [colorFilter, priceFilter, brandFilter, categoryFilter, sizeFilter]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/productss');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setTotalProducts(data.length);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];
    if (colorFilter) filtered = filtered.filter(product => product.color === colorFilter);
    if (priceFilter) filtered = filtered.filter(product => product.price < priceFilter);
    if (brandFilter) filtered = filtered.filter(product => product.brand === brandFilter);
    if (categoryFilter) filtered = filtered.filter(product => product.category === categoryFilter);
    if (sizeFilter) filtered = filtered.filter(product => product.size === sizeFilter);

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
    setCurrentPage(1);
  };

  const getUserId = () => {
    // Replace this logic to get the userId from wherever it's stored (localStorage, cookies, etc.)
    return localStorage.getItem('userId');  // Example: fetch from localStorage
  };

  const addToWishlist = async (product) => {
    const userId = getUserId();  // Get the userId dynamically
    try {
      const response = await fetch('http://localhost:8000/api/wishlist/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id })
      });
      const data = await response.json();
      if (data.success) {
        alert('Product added to wishlist');
      } else {
        alert('Failed to add product to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const addToCart = async (product) => {
    const userId = getUserId();  // Get the userId dynamically
    try {
      const response = await fetch('http://localhost:8000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id, quantity: 1 })  // Example with quantity: 1
      });
      const data = await response.json();
      if (data.success) {
        alert('Product added to cart');
      } else {
        alert('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / perPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="rent-page-container">
      <div className="my-5">
        <div className="background-image">
          <div className="background-text">Rent in style</div>
        </div>
      </div>

      <div className="button-section">
        <button className="filter-button" onClick={() => setShowFilters(!showFilters)}>
          <i className="fas fa-filter"></i> Filter
        </button>
        <Link to="/earn-with-us">
          <button className="earn-with-us-button">Earn With Us</button>
        </Link>
      </div>

      {showFilters && (
        <div className="filter-section">
          {/* Filters... */}
        </div>
      )}

      <div className="products-per-page mb-4">
        <label htmlFor="productsPerPage" className="mr-2">Select Products Per Page</label>
        <select onChange={(e) => setPerPage(Number(e.target.value))} className="border p-1 rounded">
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="24">24</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="rent-products">
        <h1 className="text-2xl font-bold mb-4">Rent Products</h1>
        <div className="product-grid grid grid-cols-4 gap-4">
          {filteredProducts.slice((currentPage - 1) * perPage, currentPage * perPage).map((product) => (
            <div className="product-item border p-4 rounded shadow" key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img src={`http://localhost:5173${product['imagePath']}`} alt={product['productName']} className="product-img w-full h-48 object-cover" />
              </Link>
              <div className="product-details mt-2">
                <p className="font-semibold">{product['productName']}</p>
                <p>PKR {product.price}</p>
              </div>
              <div className="product-actions flex justify-between mt-2">
                <i className="fas fa-heart" onClick={() => addToWishlist(product)}></i>
                <i className="fas fa-shopping-cart" onClick={() => addToCart(product)}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls mt-4 flex justify-between items-center">
          <button className="pagination-button btn bg-dark text-white mx-4 py-2 px-4" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span className="pagination-info">Page {currentPage} of {Math.ceil(totalProducts / perPage)}</span>
          <button className="pagination-button btn bg-dark text-white mx-4 py-2 px-4" onClick={handleNextPage} disabled={currentPage === Math.ceil(totalProducts / perPage)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default RentPage;
