import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "./components/firebaseConfig"; // Firebase config

// Predefined drinks data including categories and attributes
const drinksData = [
  {
    category: "Iced Coffee",
    drinks: [
      {
        name: "Cappuccino",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A rich and velvety blend of espresso, steamed milk, and a frothy milk cap.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%, 75%"
      },
      {
        name: "Caramel Macchiato",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Rich caramel flavor combined with perfectly brewed coffee.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Coffee Latte",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A delightful balance of espresso and steamed milk.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%, 75%"
      },
      {
        name: "Mocha Latte",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A perfect blend of coffee and chocolate flavor.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Toffee Caramel",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A toffee caramel delight with espresso and steamed milk.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Double Dutch",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "An indulgent espresso drink topped with whipped cream.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
    ],
  },
  {
    category: "Hot Coffee",
    drinks: [
      {
        name: "Cappuccino",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A hot blend of espresso and steamed milk.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Caramel Macchiato",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Caramel with a shot of espresso.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Coffee Latte",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Smooth hot coffee with a splash of milk.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Mocha Latte",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A hot treat with chocolate and coffee.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Caffe Americano",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Espresso with hot water for a smooth taste.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Double Dutch",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Hot espresso topped with cream and chocolate sprinkles.",
        sizes: "8oz, 12oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
    ],
  },
  {
    category: "Chocolate Frappe",
    drinks: [
      {
        name: "Dark Chocolate",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Rich dark chocolate blended with ice.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Popping Boba",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Milk Chocolate",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Smooth milk chocolate with a creamy finish.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Chocolate Hazelnut",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Chocolate blended with a hint of hazelnut.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Chocolate Truffles",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Indulgent chocolate truffle flavor frappe.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Chocolate Kisses",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Sweet chocolate kisses blended into a frappe.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Mocha",
        price: 109.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A mocha blend with rich chocolate and coffee.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
    ],
  },
  {
    category: "Frappuccino",
    drinks: [
      {
        name: "Caramel Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Caramel-flavored frappuccino with whipped cream.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Java Chip Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Coffee blended with java chips and topped with whipped cream.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Mocha Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "A rich mocha frappuccino.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "White Mocha Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "White chocolate mocha flavor in a frappuccino.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Double Chocolate Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Double the chocolate, double the flavor.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Strawberry Frappuccino",
        price: 119.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Blended strawberry frappuccino with cream.",
        sizes: "12oz, 16oz",
        add_ons: "Espresso Shot",
        sugar_levels: "25%, 50%"
      },
    ],
  },
  {
    category: "Milk Tea",
    drinks: [
      {
        name: "Classic Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Classic milk tea flavor with tapioca pearls.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Wintermelon Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Wintermelon flavored milk tea with pearls.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl, Coffee Jelly",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Taro Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Sweet taro milk tea.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Matcha Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Matcha-flavored milk tea.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Hokkaido Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Rich Hokkaido-style milk tea.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Okinawa Milk Tea",
        price: 99.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Sweet Okinawa-style milk tea.",
        sizes: "12oz, 16oz",
        add_ons: "Pearl",
        sugar_levels: "25%, 50%"
      },
    ],
  },
  {
    category: "Lemonades",
    drinks: [
      {
        name: "Classic Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Classic lemonade with fresh lemons.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Strawberry Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Fresh lemonade with a strawberry twist.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Blueberry Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Refreshing lemonade with blueberries.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Mango Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Mango-infused lemonade.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Peach Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Lemonade with peach flavor.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
      {
        name: "Lime Lemonade",
        price: 89.0,
        src: "/image/drink1.png",
        stock: 20,
        description: "Lemonade with a hint of lime.",
        sizes: "12oz, 16oz",
        add_ons: "None",
        sugar_levels: "25%, 50%"
      },
    ],
  },
];

// Function to format document ID
const createCustomId = (category, productName) => {
  const formattedCategory = category.toLowerCase().replace(/\s+/g, '_');
  const formattedProductName = productName.toLowerCase().replace(/\s+/g, '_');
  return `${formattedCategory}_${formattedProductName}`;
};

// Function to upload drinks to Firestore with custom ID
const uploadDrinksToFirestoreWithCustomID = async () => {
  try {
    for (const categoryObj of drinksData) {
      const { category, drinks } = categoryObj;

      for (const drink of drinks) {
        const customId = createCustomId(category, drink.name);

        await setDoc(doc(collection(database, "menu_info"), customId), {
          category: category,
          description: drink.description,
          is_available: true,
          price: drink.price,
          product_name: drink.name,
          stock_number: drink.stock,
          src: drink.src,
          sizes: drink.sizes,
          add_ons: drink.add_ons,
          sugar_levels: drink.sugar_levels,
          type: "drinks"
        });
      }
    }
    alert("All drinks uploaded successfully with custom IDs!");
  } catch (error) {
    console.error("Error uploading drinks to Firestore:", error);
    alert("Error uploading drinks. Check console for details.");
  }
};

// Modal Component for Product Customization
const ProductModal = ({ product, isVisible, onClose }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedSize, setSelectedSize] = useState(''); // Default to empty
  const [selectedSugar, setSelectedSugar] = useState(''); // Default to empty

  if (!isVisible || !product) return null; // Don't render the modal if not visible or no product

  // Parse sizes, add-ons, and sugar levels from product data
  const sizes = product.sizes ? product.sizes.split(',') : [];
  const addOns = product.add_ons ? product.add_ons.split(',') : [];
  const sugarLevels = product.sugar_levels ? product.sugar_levels.split(',') : [];

  const handleAddOnClick = (addOn) => {
    if (selectedAddOns.includes(addOn)) {
      setSelectedAddOns(selectedAddOns.filter(item => item !== addOn));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <h2>{product.product_name}</h2>
        <p>{product.description}</p>
        <p>Price: ₱{product.price.toFixed(2)}</p>

        {/* Sizes */}
        {sizes.length > 0 && (
          <div className="sizes-section">
            <h3>Sizes</h3>
            <div className="size-options">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add Ons */}
        {addOns.length > 0 && (
          <div className="add-ons-section">
            <h3>Add Ons</h3>
            <div className="add-ons-options">
              {addOns.map((addOn, index) => (
                <button
                  key={index}
                  className={`addon-option ${selectedAddOns.includes(addOn) ? 'selected' : ''}`}
                  onClick={() => handleAddOnClick(addOn)}
                >
                  {addOn}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sugar Level */}
        {sugarLevels.length > 0 && (
          <div className="sugar-level-section">
            <h3>Sugar Level</h3>
            <div className="sugar-options">
              {sugarLevels.map((level, index) => (
                <button
                  key={index}
                  className={`sugar-option ${selectedSugar === level ? 'selected' : ''}`}
                  onClick={() => setSelectedSugar(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className='modal-buttons'> 
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

// React component with a button to trigger the upload
const UploadDrinksComponent = () => {
  return (
    <div>
      <h1>Upload Drinks Data with Custom IDs</h1>
      <button onClick={uploadDrinksToFirestoreWithCustomID}>Upload Drinks</button>
    </div>
  );
};

export default UploadDrinksComponent;
