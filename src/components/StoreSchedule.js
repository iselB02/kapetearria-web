import React from 'react';
import './StoreSchedule.css'; // Import CSS for styling

const StoreSchedule = () => {
  const firstHalfWeek = [
    { name: "Sunday", hours: "CLOSED", icon: 'Su' },
    { name: "Monday", hours: "09:00 AM - 09:00 PM", icon: 'M' },
    { name: "Tuesday", hours: "09:00 AM - 09:00 PM", icon: 'T' },
    { name: "Wednesday", hours: "09:00 AM - 09:00 PM", icon: 'W' },
  ];

  const secondHalfWeek = [
    { name: "Thursday", hours: "09:00 AM - 09:00 PM", icon: 'Th' },
    { name: "Friday", hours: "09:00 AM - 09:00 PM", icon: 'F' },
    { name: "Saturday", hours: "09:00 AM - 09:00 PM", icon: 'S' },
  ];

  const today = new Date();
  const currentDay = today.toLocaleString('default', { weekday: 'long' });

  return (
    <div className="schedule-container">
      <div className="schedule-columns">
        <ul className="schedule-list">
          {firstHalfWeek.map((day, index) => (
            <li 
              key={index} 
              className={day.name === currentDay ? 'highlight' : ''}
            >
              <span className="icon">{day.icon}</span>
              <div className="day-info">
                <div className="day-name">{day.name}</div>
                <div className="day-hours">{day.hours}</div>
              </div>
            </li>
          ))}
        </ul>
        <ul className="schedule-list">
          {secondHalfWeek.map((day, index) => (
            <li 
              key={index} 
              className={day.name === currentDay ? 'highlight' : ''}
            >
              <span className="icon">{day.icon}</span>
              <div className="day-info">
                <div className="day-name">{day.name}</div>
                <div className="day-hours">{day.hours}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoreSchedule;
