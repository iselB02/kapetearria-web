import React from 'react';
import './AdminSales.css';
import { Link } from 'react-router-dom';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import { Bar } from 'react-chartjs-2';

// Import Chart.js and register components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminSales = () => {
  // Bar chart data
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Drinks',
        backgroundColor: '#FF6F61',
        data: [15, 20, 18, 25, 22, 24, 20],
      },
      {
        label: 'Meals',
        backgroundColor: '#92C57D',
        data: [18, 15, 22, 20, 25, 19, 21],
      },
      {
        label: 'Snacks',
        backgroundColor: '#C7B19C',
        data: [12, 14, 16, 18, 20, 15, 17],
      },
      {
        label: 'Cakes',
        backgroundColor: '#9B6B5F',
        data: [10, 12, 15, 14, 16, 18, 20],
      },
    ],
  };

  // Bar chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow control over chart size
    plugins: {
      legend: {
        display: true, // Ensure the legend is displayed
        position: 'bottom', // Position the legend below the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 30, // Adjust the Y-axis scale to fit better
      },
    },
  };

  // Data for the top products table
  const topProducts = [
    { id: 1, name: 'Matcha Latte', popularity: 45, color: '#FF6F61' },
    { id: 2, name: 'Tapa Rice', popularity: 29, color: '#92C57D' },
    { id: 3, name: 'Fries', popularity: 18, color: '#C7B19C' },
    { id: 4, name: 'Cookies and Cream Cake', popularity: 25, color: '#9B6B5F' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar3">
        <div className="sidebar-header">
          <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
          <h6>ADMIN</h6>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item">
            <Link to="/admin" className="menu-link">
              <AiOutlineDashboard className="icon" /> Dashboard
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/inventory" className="menu-link">
              <FiShoppingCart className="icon" /> Inventory
            </Link>
          </li>
          <li className="menu-item active">
            <Link to="/sales" className="menu-link">
              <RiBarChartLine className="icon" /> Sales Reports
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/staff" className="menu-link">
              <FiUser className="icon" /> Staff
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/uam" className="menu-link">
              <RiAccountCircleLine className="icon" /> User Account Management
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/chat-support" className="menu-link">
              <FiMessageSquare className="icon" /> Chat Support
            </Link>
          </li>
        </ul>
        <div className="settings-section">
          <FiSettings className="icon" /> Settings
        </div>
      </aside>

      {/* Main Content */}
      <main className="sales-content">
    
        {/* Bar Chart Section */}
        <div className="chart-section">
          <h3>Total Revenue</h3>
          <div className="chart-container">
            <Bar data={data} options={options} />
          </div>
        </div>

        {/* Top Products Section */}
        <div className="top-products-section">
          <h3>Top Products</h3>
          <table className="top-products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Popularity</th>
                <th>Sales</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.id.toString().padStart(2, '0')}</td>
                  <td>{product.name}</td>
                  <td>
                    <div className="popularity-bar">
                      <div
                        className="popularity-fill"
                        style={{
                          width: `${product.popularity}%`,
                          backgroundColor: product.color,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>{product.popularity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminSales;
