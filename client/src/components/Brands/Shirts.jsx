import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Shirts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState([]); // Colors from DB
  const [sizes, setSizes] = useState([]);

  const [activeColor, setActiveColor] = useState(null); // Active color filter
  const [activeSize, setActiveSize] = useState(null);
  const [activePrice, setActivePrice] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch shirts from the backend
        const productResponse = await axios.get("http://localhost:8000/api/products/shirts");

        // Set products and filtered products
        setProducts(productResponse.data);
        setFilteredProducts(productResponse.data);

        // Extract unique colors and sizes
        setColors([...new Set(productResponse.data.map((product) => product.color))]);
        setSizes([...new Set(productResponse.data.map((product) => product.size))]);

        // Set total pages
        setTotalPages(Math.ceil(productResponse.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by color
    if (activeColor) {
      filtered = filtered.filter((product) => product.color === activeColor);
    }

    // Filter by size
    if (activeSize) {
      filtered = filtered.filter((product) => product.size === activeSize);
    }

    // Filter by price
    if (activePrice) {
      if (activePrice === "under-2000") {
        filtered = filtered.filter((product) => product.price < 2000);
      } else if (activePrice === "under-3000") {
        filtered = filtered.filter((product) => product.price < 3000);
      } else if (activePrice === "above-3000") {
        filtered = filtered.filter((product) => product.price > 3000);
      }
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to the first page when filters are applied
  }, [activeColor, activeSize, activePrice, products]);

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Shirts</h2>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 mb-6 bg-gray-100 p-4 rounded-lg">
        {/* Price Filter */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <select
            onChange={(e) => setActivePrice(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Prices</option>
            <option value="under-2000">Under 2000</option>
            <option value="under-3000">Under 3000</option>
            <option value="above-3000">Higher than 3000</option>
          </select>
        </div>

        {/* Color Filter */}
        <div>
          <label className="block font-semibold mb-1">Color</label>
          <select
            onChange={(e) => setActiveColor(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="block font-semibold mb-1">Size</label>
          <select
            onChange={(e) => setActiveSize(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">All Sizes</option>
            {sizes.map((size, index) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.length === 0 ? (
          <p>No products available for the selected filters.</p>
        ) : (
          currentProducts.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-green-600 font-bold mt-2">PKR {product.price}</p>

              <div className="flex justify-between mt-4">
                <button className="text-red-500">
                  <FaHeart />
                </button>
                <button className="text-blue-500">
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shirts;