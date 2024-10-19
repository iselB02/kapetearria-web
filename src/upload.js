import React, { useState } from "react";
import { collection, doc, setDoc } from "firebase/firestore";
import { database } from "./components/firebaseConfig.js"; // Firebase config

// Complete menu data (as you shared earlier)
export const menuData = [
  // Takoyaki Section
  {
    product_name: "Takoyaki Single",
    category: "Takoyaki",
    description: "Single piece of Takoyaki served hot.",
    price: 59,
    sizes: "1 pc",
    add_ons: "Cheese Sauce, Melted Cheese",
    stock_number: 20,
    is_available: true,
    type: "snacks",
    src: "/image/takoyaki_single.png"
  },
  {
    product_name: "Takoyaki Barkada",
    category: "Takoyaki",
    description: "12 pcs Takoyaki with your choice of flavors.",
    price: 159,
    sizes: "12 pcs",
    add_ons: "Cheese Sauce, Melted Cheese",
    stock_number: 20,
    is_available: true,
    type: "snacks",
    src: "/image/takoyaki_barkada.png"
  },

  // Siomai Section
  {
    product_name: "Chicken Siomai",
    category: "Siomai",
    description: "4 pcs Steamed Chicken Siomai.",
    price: 59,
    sizes: "4 pcs",
    add_ons: "",
    stock_number: 30,
    is_available: true,
    type: "snacks",
    src: "/image/chicken_siomai.png"
  },
  {
    product_name: "Beef Siomai",
    category: "Siomai",
    description: "4 pcs Steamed Beef Siomai.",
    price: 59,
    sizes: "4 pcs",
    add_ons: "",
    stock_number: 30,
    is_available: true,
    type: "snacks",
    src: "/image/beef_siomai.png"
  },
  {
    product_name: "Pork Siomai",
    category: "Siomai",
    description: "4 pcs Steamed Pork Siomai.",
    price: 59,
    sizes: "4 pcs",
    add_ons: "",
    stock_number: 30,
    is_available: true,
    type: "snacks",
    src: "/image/pork_siomai.png"
  },

  // Finger Lick'n Snacks
  {
    product_name: "French Fries",
    category: "Finger Lick'n Snacks",
    description: "French Fries with cheese, barbecue, or sour cream flavor.",
    price: 99,
    sizes: "Regular",
    add_ons: "",
    stock_number: 40,
    is_available: true,
    type: "snacks",
    src: "/image/french_fries.png"
  },
  {
    product_name: "Criscut Fries",
    category: "Finger Lick'n Snacks",
    description: "Criscut Fries with cheese, barbecue, or sour cream flavor.",
    price: 99,
    sizes: "Regular",
    add_ons: "",
    stock_number: 40,
    is_available: true,
    type: "snacks",
    src: "/image/criscut_fries.png"
  },
  {
    product_name: "Twister Fries",
    category: "Finger Lick'n Snacks",
    description: "Twister Fries with cheese, barbecue, or sour cream flavor.",
    price: 99,
    sizes: "Regular",
    add_ons: "",
    stock_number: 40,
    is_available: true,
    type: "snacks",
    src: "/image/twister_fries.png"
  },
  {
    product_name: "Onion Rings",
    category: "Finger Lick'n Snacks",
    description: "Crispy Onion Rings with cheese, barbecue, or sour cream flavor.",
    price: 99,
    sizes: "Regular",
    add_ons: "",
    stock_number: 40,
    is_available: true,
    type: "snacks",
    src: "/image/onion_rings.png"
  },
  {
    product_name: "Mojos",
    category: "Finger Lick'n Snacks",
    description: "Potato Mojos with cheese, barbecue, or sour cream flavor.",
    price: 99,
    sizes: "Regular",
    add_ons: "",
    stock_number: 40,
    is_available: true,
    type: "snacks",
    src: "/image/mojos.png"
  },

  // Cake Section
  {
    product_name: "Triple Chocolate Cake",
    category: "Cake",
    description: "A rich chocolate cake with multiple layers.",
    price: 99,
    sizes: "Single Slice",
    add_ons: "",
    stock_number: 20,
    is_available: true,
    type: "desserts",
    src: "/image/triple_chocolate_cake.png"
  },
  {
    product_name: "Mocha Cappuccino Cake",
    category: "Cake",
    description: "A delicious mocha cappuccino-flavored cake.",
    price: 99,
    sizes: "Single Slice",
    add_ons: "",
    stock_number: 20,
    is_available: true,
    type: "desserts",
    src: "/image/mocha_cappuccino_cake.png"
  },
  {
    product_name: "Strawberry Short Cake",
    category: "Cake",
    description: "A light and fluffy strawberry short cake.",
    price: 99,
    sizes: "Single Slice",
    add_ons: "",
    stock_number: 20,
    is_available: true,
    type: "desserts",
    src: "/image/strawberry_shortcake.png"
  },
  // You can continue adding more products like the previous examples...
];

// Function to format document ID
const createCustomId = (category, productName) => {
  const formattedCategory = category.toLowerCase().replace(/\s+/g, '_');
  const formattedProductName = productName.toLowerCase().replace(/\s+/g, '_');
  return `${formattedCategory}_${formattedProductName}`;
};

// Function to upload menu items to Firestore with custom ID
const uploadMenuDataToFirestore = async () => {
  try {
    for (const product of menuData) {
      const customId = createCustomId(product.category, product.product_name);

      await setDoc(doc(collection(database, "menu_info"), customId), {
        category: product.category,
        description: product.description,
        is_available: product.is_available,
        price: product.price,
        product_name: product.product_name,
        stock_number: product.stock_number,
        src: product.src,
        sizes: product.sizes,
        add_ons: product.add_ons,
        sugar_levels: product.sugar_levels || "",
        type: product.type
      });
    }
    alert("Menu items uploaded successfully with custom IDs!");
  } catch (error) {
    console.error("Error uploading menu items to Firestore:", error);
    alert("Error uploading menu items. Check console for details.");
  }
};

// React component with a button to trigger the upload
const UploadMenuComponent = () => {
  return (
    <div>
      <h1>Upload Menu Data to Firestore</h1>
      <button onClick={uploadMenuDataToFirestore}>Upload Menu Data</button>
    </div>
  );
};

export default UploadMenuComponent;
