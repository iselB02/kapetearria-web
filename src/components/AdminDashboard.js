import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Import the corresponding CSS
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import { BsExclamationCircle, BsCheckCircle, BsInfoCircle } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { database } from './firebaseConfig';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  const [visitorData, setVisitorData] = useState([]);

  // Fetch visitor logs in real-time
  useEffect(() => {
    const fetchVisitors = () => {
      const visitorRef = collection(database, 'visitor_logs'); // Firestore collection for visitor logs
      const q = query(visitorRef);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const visitors = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          visitors.push({
            timestamp: new Date(data.timestamp), // Parse timestamp to Date object
          });
        });

        setVisitorData(visitors);
      });

      return () => unsubscribe(); // Clean up the listener
    };

    fetchVisitors();
  }, []);

  // Process visitor data into hourly intervals
  const processVisitorData = () => {
    const hours = Array(24).fill(0); // Array for 24 hours of the day
    visitorData.forEach((visitor) => {
      const hour = visitor.timestamp.getHours(); // Extract the hour
      hours[hour] += 1; // Increment visitor count for the hour
    });

    return hours;
  };

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Generate labels for hours
  const processedData = processVisitorData();

  // Chart data and options
  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Visitors per Hour',
        data: processedData,
        borderColor: '#FF6B6B',
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        pointBackgroundColor: '#FF6B6B',
        pointHoverBackgroundColor: '#FF2E63',
        tension: 0.5,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#FF6B6B',
        titleFont: { size: 16, weight: 'bold', color: '#fff' },
        bodyFont: { size: 14, color: '#fff' },
        borderRadius: 10,
        padding: 10,
        callbacks: {
          label: (context) => `${context.raw} Visitors`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          drawBorder: false,
        },
        ticks: {
          stepSize: 5,
          callback: (value) => `${value} Visitors`,
          color: '#666',
        },
      },
    },
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
                <div className="sidebar-header">
                    <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
                    <h6>ADMIN</h6>
                </div>
                <ul className="sidebar-menu">
                    <Link to="/admin" className="menu-link">
                        <li className="menu-item active">
                            <AiOutlineDashboard className="icon" /> Dashboard
                        </li>
                    </Link>
                    <Link to="/inventory" className="menu-link">
                        <li className="menu-item">
                            <FiShoppingCart className="icon" /> Inventory
                        </li>
                    </Link>
                    <Link to="/sales" className="menu-link">
                        <li className="menu-item">
                            <RiBarChartLine className="icon" /> Sales Reports
                        </li>
                    </Link>
                    <Link to="/staff" className='menu-link'>
                        <li className="menu-item">
                            <FiUser className="icon" /> Staff
                        </li>
                    </Link>
                    <Link to="/uam" className='menu-link'>
                        <li className="menu-item">
                            <RiAccountCircleLine className="icon" /> User Account Management
                        </li>
                    </Link>
                </ul>
                <Link to="/my-account" className='menu-link'>
                    <div className="settings-section">
                        <FiSettings className="icon" /> Settings
                    </div>
                </Link>
            </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="top-bar">
          <div className="rectangle">Dashboard</div>
        </div>


        {/* Card Section */}
        <div className="dashboard-overview">
          <div className="overview-card alert">
            <BsExclamationCircle className="card-icon" />
            <div className="card-content">
              <p>LOW INVENTORY</p>
              <p>Inventory Level is LOW. Contact Manager now.</p>
              <a href="/">Learn more &gt;</a>
            </div>
          </div>

          <div className="overview-card success">
            <BsCheckCircle className="card-icon" />
            <div className="card-content">
              <p>BOBA MILKTEA</p>
              <p>67 Customers bought this item. Keep up!</p>
              <a href="/">Learn more &gt;</a>
            </div>
          </div>

          <div className="overview-card info">
            <BsInfoCircle className="card-icon" />
            <div className="card-content">
              <p>NET WORTH</p>
              <p>Daily income of the store</p>
              <a href="/">Learn more &gt;</a>
            </div>
          </div>

          <div className="overview-card warning">
            <BsExclamationCircle className="card-icon" />
            <div className="card-content">
              <p>DELIVERY PENDING</p>
              <p>1 Matcha Latte, 1 Carrot Cake</p>
              <a href="/">Learn more &gt;</a>
            </div>
          </div>
        </div>

        {/* Visitor Chart */}
        <div className="visitor-chart">
          <h3 className="chart-title">Visitor Chart</h3>
          <Line data={data} options={options} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
