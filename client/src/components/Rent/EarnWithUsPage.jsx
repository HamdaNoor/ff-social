import React, { useState } from 'react';
import '../Styles/EarnWithUsPage.css'; // Create this CSS file for styling
import { Link } from 'react-router-dom'; // Ensure the navbar remains functional
function EarnWithUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    city: '',
    dressType: '',
    brand: '',
    price: '',
    size: '',
    rentalDate: '',
    file: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="earn-with-us-page">
      {/* Form only, no Navbar */}
      <div className="form-container">
        <h1>Rent a Closet</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
          <input type="text" name="contactNumber" placeholder="Contact Number" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email Address (Optional)" onChange={handleChange} />
          <input type="text" name="city" placeholder="City" onChange={handleChange} />
          <input type="text" name="dressType" placeholder="Dress Type" onChange={handleChange} />
          <input type="text" name="brand" placeholder="Brand" onChange={handleChange} />
          <input type="number" name="price" placeholder="Price of Dress" onChange={handleChange} />
          <select name="size" onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
          <input type="date" name="rentalDate" onChange={handleChange} />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EarnWithUsPage;
