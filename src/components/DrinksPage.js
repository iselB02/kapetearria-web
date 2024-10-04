import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './DrinksPage.css'; 
import Footer from './Footer'; // Import Footer component

const snacksData = [
    { category: 'Iced Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
        { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Toffee Caramel', price: 89.00, src: '/image/drink1.png' },
        { name: 'Double Dutch', price: 89.00, src: '/image/drink1.png' }
    ]},
    { category: 'Hot Coffee', drinks: [
        { name: 'Cappuccino', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caramel Macchiato', price: 89.00, src: '/image/drink1.png' },
        { name: 'Coffee Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Mocha Latte', price: 89.00, src: '/image/drink1.png' },
        { name: 'Caffe Americano', price: 89.00, src: '/image/drink1.png' },
        { name: 'Double Dutch', price: 89.00, src: '/image/drink1.png' }
    ]},
    { category: 'Chocolate Frappe', drinks: [
        { name: 'Dark Chocolate', price: 109.00 , src: '/image/drink1.png'},
        { name: 'Milk Chocolate', price: 109.00 , src: '/image/drink1.png'},
        { name: 'Chocolate Hazelnut', price: 109.00 , src: '/image/drink1.png'},
        { name: 'Chocolate Truffles', price: 109.00 , src: '/image/drink1.png'},
        { name: 'Chocolate Kisses', price: 109.00 , src: '/image/drink1.png'},
        { name: 'Mocha', price: 109.00 , src: '/image/drink1.png'}
    ]},
    { category: 'Frappuccino', drinks: [
        { name: 'Caramel Frappuccino', price: 119.00 , src: '/image/drink1.png'},
        { name: 'Java Chip Frappuccino', price: 119.00 , src: '/image/drink1.png' },
        { name: 'Mocha Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'White Mocha Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Double Chocolate Frappuccino', price: 119.00, src: '/image/drink1.png' },
        { name: 'Strawberry Frappuccino', price: 119.00 , src: '/image/drink1.png'}
    ]},
    { category: 'Milk Tea', drinks: [
        { name: 'Classic Milk Tea', price: 99.00 , src: '/image/drink1.png'},
        { name: 'Wintermelon Milk Tea', price: 99.00 , src: '/image/drink1.png'},
        { name: 'Taro Milk Tea', price: 99.00 , src: '/image/drink1.png'},
        { name: 'Matcha Milk Tea', price: 99.00 , src: '/image/drink1.png'},
        { name: 'Hokkaido Milk Tea', price: 99.00 , src: '/image/drink1.png'},
        { name: 'Okinawa Milk Tea', price: 99.00 , src: '/image/drink1.png'}
    ]},
    { category: 'Lemonades', drinks: [
        { name: 'Classic Lemonade', price: 89.00, src: '/image/drink1.png' },
        { name: 'Strawberry Lemonade', price: 89.00 , src: '/image/drink1.png'},
        { name: 'Blueberry Lemonade', price: 89.00 , src: '/image/drink1.png'},
        { name: 'Mango Lemonade', price: 89.00 , src: '/image/drink1.png'},
        { name: 'Peach Lemonade', price: 89.00 , src: '/image/drink1.png'},
        { name: 'Lime Lemonade', price: 89.00 , src: '/image/drink1.png'}
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
                {snacksData.map((category, index) => (
                    <div key={index} className="drink-category">
                        <h2>{category.category}</h2>
                        <div className="drink-items">
                            {category.drinks.map((drink, i) => (
                                <div key={i} className="drink-item">
                                    <img src={drink.src} alt={drink.name} className="drink-img"/>
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
            <Footer /> {/* Add Footer component here */}
        </>
    );
};

export default DrinksPage;