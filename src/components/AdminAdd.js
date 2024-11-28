import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./AdminAdd.css";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); 
  const [image, setImage] = useState(null);
  const [sizes, setSizes] = useState(""); 
  const [src, setSrc] = useState(""); 
  const [stockNumber, setStockNumber] = useState(""); 
  const [sugarLevels, setSugarLevels] = useState(""); 
  const [type, setType] = useState(""); 
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!productName.trim()) newErrors.productName = "Product name is required!";
    if (!category.trim()) newErrors.category = "Category is required!";
    if (!price || price <= 0) newErrors.price = "Enter a valid price!";
    if (!image) newErrors.image = "Product image is required!";
    if (!sizes.trim()) newErrors.sizes = "Sizes are required!";
    if (!stockNumber.trim()) newErrors.stockNumber = "Stock number is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert("File size should be less than 25MB!");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload({ target: { files: [file] } });
  };

  const handleSave = () => {
    if (!validateFields()) return;

    console.log({ productName, category, price, description, image, sizes, src, stockNumber, sugarLevels, type });
    alert("Product added successfully!");

    setProductName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setImage(null);
    setSizes("");
    setSrc("");
    setStockNumber("");
    setSugarLevels("");
    setType("");

    // Navigate to Inventory Page after saving
    navigate("/inventory");
  };

  const handleClose = () => {
    // Navigate to Inventory Page when X button is clicked
    navigate("/inventory");
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h2>ADD NEW PRODUCT</h2>
      </div>
      <div className="add-product-form">
        <div
          className={`product-image-container ${errors.image ? "error-border" : ""}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {image ? (
            <img src={image} alt="Uploaded Preview" className="product-image-preview" />
          ) : (
            <div className="product-image-placeholder">
              <label htmlFor="image-upload" className="upload-label">
                Drag & Drop or <span className="browse-text">Browse</span>
              </label>
            </div>
          )}
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>
        {errors.image && <p className="error-text">{errors.image}</p>}

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className={`input-field ${errors.productName ? "error-border" : ""}`}
        />
        {errors.productName && <p className="error-text">{errors.productName}</p>}

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`input-field ${errors.category ? "error-border" : ""}`}
        />
        {errors.category && <p className="error-text">{errors.category}</p>}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`input-field ${errors.price ? "error-border" : ""}`}
        />
        {errors.price && <p className="error-text">{errors.price}</p>}

        <textarea
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea-field"
        ></textarea>

        <input
          type="text"
          placeholder="Sizes"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
          className={`input-field ${errors.sizes ? "error-border" : ""}`}
        />
        {errors.sizes && <p className="error-text">{errors.sizes}</p>}

        <input
          type="text"
          placeholder="IMG SRC"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          className={`input-field ${errors.src ? "error-border" : ""}`}
        />
        {errors.src && <p className="error-text">{errors.src}</p>}

        <input
          type="text"
          placeholder="Stock Number"
          value={stockNumber}
          onChange={(e) => setStockNumber(e.target.value)}
          className={`input-field ${errors.stockNumber ? "error-border" : ""}`}
        />
        {errors.stockNumber && <p className="error-text">{errors.stockNumber}</p>}

        <input
          type="text"
          placeholder="Sugar Levels"
          value={sugarLevels}
          onChange={(e) => setSugarLevels(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Type (e.g., Drink, Snack, Dessert)"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input-field"
        />

        <div className="prod-buttons">
          <button onClick={handleSave} className="save-button">
            SAVE
          </button>
          <button className="close-button" onClick={handleClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
