import React, { useEffect, useRef, useState } from 'react';
import './Tagline.css';

export default function Tagline() {
  const [isVisible, setIsVisible] = useState(false);
  const taglineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after it's visible
        }
      });
    }, { threshold: 0.9 }); // Trigger when 90% of the element is visible

    if (taglineRef.current) {
      observer.observe(taglineRef.current);
    }

    return () => {
      if (taglineRef.current) {
        observer.unobserve(taglineRef.current);
      }
    };
  }, []);

  return (
    <div className='main-container' ref={taglineRef}>
        <div className={`text-container ${isVisible ? 'fade-in' : ''}`}>
            <div className='text-content'>
                <span>"Endless Rice, Endless Flavor -</span>
                <span className='span'>Enjoy unlimited Kanin and Soup</span>
                <span className='span'>with Every Silog and Korean Meal!”</span>
            </div>
        </div>
        <div className={`product-container ${isVisible ? 'slide-in' : ''}`}>
            <img src='image/product-banner.png' alt="Product Banner"/>
        </div>
    </div>
  );
}
