import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Snacks.css'; 
import Footer from './Footer'; // Import Footer component

const snacksData = [
    { 
        category: 'Finger Lickn Snacks', 
        snacks: [
            { name: 'Fries', price: 99.00, src: '/image/fries.png' }, 
            { name: 'Caramel Pudding', price: 89.00, src: '/image/snack_caramel_pudding.png' },
            { name: 'Nachos', price: 89.00, src: '/image/snack_nachos.png' },
            { name: 'Potato Wedges', price: 89.00, src: '/image/snack_potato_wedges.png' },
            { name: 'Onion Rings', price: 89.00, src: '/image/snack_onion_rings.png' },
            { name: 'Cheese Sticks', price: 89.00, src: '/image/snack_cheese_sticks.png' }
        ]
    },
    { 
        category: 'Sweet Treats', 
        snacks: [
            { name: 'Chocolate Cake', price: 89.00, src: '/image/snack_chocolate_cake.png' },
            { name: 'Cupcake', price: 89.00, src: '/image/snack_cupcake.png' },
            { name: 'Ice Cream', price: 89.00, src: '/image/snack_ice_cream.png' },
            { name: 'Donut', price: 89.00, src: '/image/snack_donut.png' },
            { name: 'Cookies', price: 89.00, src: '/image/snack_cookies.png' },
            { name: 'Brownies', price: 89.00, src: '/image/snack_brownies.png' }
        ]
    }
];

const SnacksPage = () => {
    return (
        <>
            {/* Store Image Section */}
            <header className="store-header">
                <img src="/image/storeimage.jpg" alt="Kape Tearria Store" className="store-image" />
            </header>

            <div className="snacks-page">
                <h1>Our Snacks</h1>
                {snacksData.map((category, index) => (
                    <div key={index} className="snack-category">
                        <h2>{category.category}</h2>
                        <div className="snack-items">
                            {category.snacks.map((snack, i) => (
                                <div key={i} className="snack-item">
                                    <img src={snack.src} alt={snack.name} className="snack-img"/>
                                    <div className="snack-info">
                                        <div className="snack-name-price">
                                            <p className="snack-name">{snack.name}</p>
                                            <p className="snack-price">₱{snack.price.toFixed(2)}</p>
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

export default SnacksPage;
