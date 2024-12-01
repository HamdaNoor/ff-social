import React, { useState } from 'react'; 
import '../Styles/SearchPage.css';

function SearchPage({ searchType }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      // Call your backend to get the search results (this is just a placeholder)
      // Assume we get 5 results as output for the image search
      const sampleResults = [
        {
          id: 1,
          imageUrl: '/path_to_output_image1.jpg',
          title: 'Shirts',
          description: 'Stylish and comfortable shirts',
        },
        {
          id: 2,
          imageUrl: '/path_to_output_image2.jpg',
          title: 'Pants',
          description: 'Find your perfect pants',
        },
        {
          id: 3,
          imageUrl: '/path_to_output_image3.jpg',
          title: 'Stitched',
          description: 'Ready-to-wear stitched fabrics',
        },
        {
          id: 4,
          imageUrl: '/path_to_output_image4.jpg',
          title: 'Unstitched',
          description: 'Custom unstitched fabrics',
        },
        {
          id: 5,
          imageUrl: '/path_to_output_image5.jpg',
          title: 'Accessories',
          description: 'Stylish accessories to complete your look',
        }
      ];

      // Set the fetched results
      setResults(sampleResults);
    }
  };

  return (
    <div className="search-page-container">
      {/* Upload section */}
      <div className="upload-section">
        <label className="upload-label">
          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
          <div className="upload-box">
            <span>Click to upload or drag and drop</span>
          </div>
        </label>
        {selectedImage && <img src={selectedImage} alt="Input" className="uploaded-image-preview" />}
      </div>

      {/* Results section */}
      <div className="results-grid">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="result-card">
              <img src={result.imageUrl} alt={result.title} className="result-image" />
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results yet</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
