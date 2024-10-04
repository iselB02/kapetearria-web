import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './DrinksPage.css'; 



const drinksData = [
    { category: 'Iced Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00 },
        { name: 'Caramel Macchiato', price: 89.00 },
        { name: 'Coffee Latte', price: 89.00 },
        { name: 'Mocha Latte', price: 89.00 },
        { name: 'Toffee Caramel', price: 89.00 },
        { name: 'Double Dutch', price: 89.00 }
    ]},
    { category: 'Hot Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00 },
        { name: 'Caramel Macchiato', price: 89.00 },
        { name: 'Coffee Latte', price: 89.00 },
        { name: 'Mocha Latte', price: 89.00 },
        { name: 'Caffe Americano', price: 89.00 },
        { name: 'Double Dutch', price: 89.00 }
    ]},
    { category: 'Chocolate Frappe', drinks: [
        { name: 'Dark Chocolate', price: 109.00 },
        { name: 'Milk Chocolate', price: 109.00 },
        { name: 'Chocolate Hazelnut', price: 109.00 },
        { name: 'Chocolate Truffles', price: 109.00 },
        { name: 'Chocolate Kisses', price: 109.00 },
        { name: 'Mocha', price: 109.00 }
    ]},
    { category: 'Frappuccino', drinks: [
        { name: 'Caramel Frappuccino', price: 119.00 },
        { name: 'Java Chip Frappuccino', price: 119.00 },
        { name: 'Mocha Frappuccino', price: 119.00 },
        { name: 'White Mocha Frappuccino', price: 119.00 },
        { name: 'Double Chocolate Frappuccino', price: 119.00 },
        { name: 'Strawberry Frappuccino', price: 119.00 }
    ]},
    { category: 'Milk Tea', drinks: [
        { name: 'Classic Milk Tea', price: 99.00 },
        { name: 'Wintermelon Milk Tea', price: 99.00 },
        { name: 'Taro Milk Tea', price: 99.00 },
        { name: 'Matcha Milk Tea', price: 99.00 },
        { name: 'Hokkaido Milk Tea', price: 99.00 },
        { name: 'Okinawa Milk Tea', price: 99.00 }
    ]},
    { category: 'Lemonades', drinks: [
        { name: 'Classic Lemonade', price: 89.00 },
        { name: 'Strawberry Lemonade', price: 89.00 },
        { name: 'Blueberry Lemonade', price: 89.00 },
        { name: 'Mango Lemonade', price: 89.00 },
        { name: 'Peach Lemonade', price: 89.00 },
        { name: 'Lime Lemonade', price: 89.00 }
    ]}
];

const DrinksPage = () => {
    return (
        <>
            {/* Store Image Section */}
            <header className="store-header">
                <img src="/image/storeimage.jpg" alt="Kape Tearria Store" className="store-image" />
            </header>


            
            <div className="drinks-page">
                <h1>Our Drinks</h1>
                {drinksData.map((category, index) => (
                    <div key={index} className="drink-category">
                        <h2>{category.category}</h2>
                        <div className="drink-items">
                            {category.drinks.map((drink, i) => (
                                <div key={i} className="drink-item">
                                    <img src="/image/drink1.png" alt={drink.name} className="drink-img"/>
                                    <div className="drink-info">
                                        <div className="drink-name-price">
                                            <p className="drink-name">{drink.name}</p>
                                            <p className="drink-price">₱{drink.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <button className="add-btn">+</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default DrinksPage;
