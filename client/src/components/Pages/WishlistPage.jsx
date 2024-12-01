import React, { useState, useEffect } from 'react';
import '../Styles/WishlistPage.css';  // Add this stylesheet

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  // Retrieve wishlist from local storage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const newWishlist = wishlist.filter((product) => product._id !== id);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('wishlist');
  };

  const addToCart = async (product) => {
    const userId = "user_id"; // You should replace this with the actual user ID of the logged-in user.
  
    try {
      const response = await fetch('http://localhost:8000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, product }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
  
      const data = await response.json();
  
      if (data.message === 'Product added to cart') {
        alert('Product added to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  return (
    <div className="wishlist-container">
      <div className="wishlist-actions">
        <h2><i className="fas fa-heart"></i> Wishlist</h2>
        <button onClick={() => clearWishlist()} className="remove-all">Remove All</button>
      </div>
      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product._id} className="wishlist-item">
            <img src={`http://localhost:5173${product['Img Path']}`} alt={product['Product Name']} />
            <h3>{product['Product Name']}</h3>
            <p>PKR {product.Price}</p>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => removeFromWishlist(product._id)} className="remove-wish">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
