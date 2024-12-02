import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; 
import { database } from './firebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./AdminAdd.css";

const AddProduct = () => {
  const [product_name, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [src, setImage] = useState(null);
  const [sizes, setSizes] = useState("");
  const [stock_number, setStockNumber] = useState("");
  const [sugar_levels, setSugarLevels] = useState("");
  const [add_ons, setAddons] = useState("");
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!product_name.trim()) newErrors.product_name = "Product name is required!";
    if (!category.trim()) newErrors.category = "Category is required!";
    if (!price || price <= 0) newErrors.price = "Enter a valid price!";
    if (!src) newErrors.src = "Product image is required!";
    if (!sizes.trim()) newErrors.sizes = "Sizes are required!";
    if (!stock_number.trim()) newErrors.stock_number = "Stock number is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      if (file.size > 25 * 1024 * 1024) {
        alert("File size should be less than 25MB!");
        return;
      }

      // Upload image to Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, `${file.name}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        console.log("Image uploaded successfully!");
        // Get the image URL
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImage(downloadURL); // Store the image URL in state
        });
      });
    }
  };

  const handleSave = async () => {
    if (!validateFields()) return;
  
    const lowercaseType = type.trim().toLowerCase();
    // Split the values entered for add_ons, sugarLevels, and sizes by commas
    const parsedAddons = add_ons ? add_ons.split(",").map(item => item.trim()) : [];
    const parsedSugarLevels = sugar_levels ? sugar_levels.split(",").map(item => item.trim()) : [];
    const parsedSizes = sizes ? sizes.split(",").map(item => item.trim()) : [];
  
    const productData = {
      product_name,
      category,
      add_ons: parsedAddons,
      price,
      description,
      src,
      sizes: parsedSizes,
      stock_number,
      sugar_levels: parsedSugarLevels,
      type: lowercaseType,
    };
  
    try {
      // Add product data to Firebase Firestore
      await addDoc(collection(database, "menu_info"), productData);
      console.log("Product added successfully!");
  
      alert("Product added successfully!");
  
      // Clear form
      setProductName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
      setSizes("");
      setStockNumber("");
      setSugarLevels("");
      setAddons("");
      setType("");
  
      // Navigate to Inventory Page after saving
      navigate("/inventory");
    } catch (error) {
      console.error("Error adding product to Firestore: ", error);
      alert("Error adding product. Please try again.");
    }
  };
  

  const handleClose = () => {
    navigate("/inventory");
  };

  return (
    <div className="add-product-container">
      <div className="add-product-header">
        <h2>ADD NEW PRODUCT</h2>
      </div>
      <div className="add-product-form">
        <div
          className={`product-image-container ${errors.src ? "error-border" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          {src ? (
            <img src={src} alt="Uploaded Preview" className="product-image-preview" />
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
        {errors.src && <p className="error-text">{errors.src}</p>}

        <input
          type="text"
          placeholder="Product Name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          className={`input-field ${errors.product_name ? "error-border" : ""}`}
        />
        {errors.product_name && <p className="error-text">{errors.product_name}</p>}


        <input
          type="text"
          placeholder="Category (e.g., Cake, Chocolate Frappe, Hot Coffee)"
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
          placeholder="Stock Number"
          value={stock_number}
          onChange={(e) => setStockNumber(e.target.value)}
          className={`input-field ${errors.stock_number ? "error-border" : ""}`}
        />
        {errors.stock_number && <p className="error-text">{errors.stock_number}</p>}

        <input
          type="text"
          placeholder="Sugar Levels"
          value={sugar_levels}
          onChange={(e) => setSugarLevels(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Add-ons"
          value={add_ons}
          onChange={(e) => setAddons(e.target.value)}
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
          <button onClick={handleSave} className="save-button">SAVE</button>
          <button className="close-button" onClick={handleClose}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
