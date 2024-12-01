import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const Unstiched = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colors, setColors] = useState([]);

  const [activeColor, setActiveColor] = useState(null);
  const [activePrice, setActivePrice] = useState(null);

  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/unstiched");
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Extract unique colors
        const uniqueColors = [...new Set(response.data.map((product) => product.color))];
        setColors(uniqueColors);

        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching unstiched:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (activeColor) {
      filtered = filtered.filter((product) => product.color === activeColor);
    }

    if (activePrice) {
      filtered = filtered.filter((product) => {
        if (activePrice === "under-2000") return product.price < 2000;
        if (activePrice === "under-3000") return product.price < 3000;
        if (activePrice === "above-3000") return product.price > 3000;
        return true;
      });
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  }, [activeColor, activePrice, products]);

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
      <h2 className="text-3xl font-bold mb-6">Unstiched</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {/* Color Filter */}
        <div>
          <label className="block font-semibold mb-1">Color</label>
          <select onChange={(e) => setActiveColor(e.target.value)} className="border px-3 py-2">
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <select onChange={(e) => setActivePrice(e.target.value)} className="border px-3 py-2">
            <option value="">All Prices</option>
            <option value="under-2000">Under 2000</option>
            <option value="under-3000">Under 3000</option>
            <option value="above-3000">Above 3000</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div key={product._id} className="p-4 bg-white shadow rounded-lg">
            <img src={product.image} alt={product.title} className="w-full h-60 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-bold text-green-600">PKR {product.price}</p>
            <div className="flex justify-between mt-2">
              <FaHeart className="text-red-500" />
              <FaShoppingCart className="text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
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

export default Unstiched;