import React from 'react';
import './AdminDashboard.css'; // Import the corresponding CSS
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine } from 'react-icons/ri';
import { BsExclamationCircle, BsCheckCircle, BsInfoCircle } from 'react-icons/bs';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Link } from 'react-router-dom';


// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AdminDashboard = () => {
  // Advanced Chart Data
  const data = {
    labels: ['12:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    datasets: [
      {
        label: 'Daily Visitors',
        data: [3456, 4567, 5890, 7456, 8000, 8200, 8654, 9100, 8450],
        borderColor: '#FF6B6B', // Line color
        backgroundColor: 'rgba(255, 107, 107, 0.2)', // Area gradient fill
        pointBackgroundColor: '#FF6B6B', // Points
        pointHoverBackgroundColor: '#FF2E63', // Point hover color
        tension: 0.5, // Smooth line
        fill: true, // Fill below the line
      },
    ],
  };

  // Advanced Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Makes it responsive
    plugins: {
      legend: {
        display: true, // Show the legend
        position: 'top',
        labels: {
          color: '#333', // Legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: '#FF6B6B', // Tooltip background
        titleFont: { size: 16, weight: 'bold', color: '#fff' },
        bodyFont: { size: 14, color: '#fff' },
        borderRadius: 10,
        padding: 10,
        callbacks: {
          label: (context) => `${context.raw.toLocaleString()} Visitors`, // Custom label
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          color: '#666', // X-axis tick color
          font: { size: 12 },
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)', // Light horizontal grid lines
          drawBorder: false,
        },
        ticks: {
          stepSize: 1000, // Y-axis tick interval
          callback: (value) => `${value / 1000}k`, // Convert to "k" for thousands
          color: '#666',
        },
      },
    },
  };

    // return (
    //     <div className="admin-container">
    //         {/* Sidebar */}
    //         <aside className="sidebar">
    //             <div className="sidebar-header">
    //                 <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
    //                 <h6>ADMIN</h6>
    //             </div>
    //             <ul className="sidebar-menu">
    //                 <Link to="/admin" className="menu-link">
    //                     <li className="menu-item">
    //                             <AiOutlineDashboard className="icon" /> Dashboard
    //                     </li>
    //                 </Link>
    //                 <Link to="/inventory" className="menu-link">
    //                     <li className="menu-item">
    //                             <FiShoppingCart className="icon" /> Inventory
    //                     </li>
    //                 </Link>
    //                 <Link to="/sales" className="menu-link">
    //                     <li className="menu-item">
    //                         <RiBarChartLine className="icon" /> Sales Reports
    //                     </li>
    //                 </Link>
    //                 <Link to="/staff"> 
    //                     <li className="menu-item">
    //                         <FiUser className="icon" /> Staff
    //                     </li>
    //                 </Link>
    //                 <li className="menu-item">
    //                     <RiAccountCircleLine className="icon" /> User Account Management
    //                 </li>
    //                 <li className="menu-item">
    //                     <FiMessageSquare className="icon" /> Chat Support
    //                 </li>
    //             </ul>
    //             <div className="settings-section">
    //                 <FiSettings className="icon" /> Settings
    //             </div>
    //         </aside>

    //         {/* Main Content */}
    //         <main className="main-content">
    //             <div className="top-bar">
    //                 <button className="profile-btn">Profile</button>
    //             </div>

    //             <div className="rectangle-container">
    //                 <div className="rectangle">
    //                     Dashboard
    //                 </div>
    //             </div>

    //             {/* Card Section */}
    //             <div className="dashboard-overview">
    //                 <div className="overview-card alert">
    //                     <BsExclamationCircle className="card-icon" />
    //                     <div className="card-content">
    //                         <p>LOW INVENTORY</p>
    //                         <p>Inventory Level is LOW. Contact Manager now.</p>
    //                         <a href="/">Learn more &gt;</a>
    //                     </div>
    //                 </div>

    //                 <div className="overview-card success">
    //                     <BsCheckCircle className="card-icon" />
    //                     <div className="card-content">
    //                         <p>BOBA MILKTEA</p>
    //                         <p>67 Customers bought this item. Keep up!</p>
    //                         <a href="/">Learn more &gt;</a>
    //                     </div>
    //                 </div>

    //                 <div className="overview-card info">
    //                     <BsInfoCircle className="card-icon" />
    //                     <div className="card-content">
    //                         <p>NET WORTH</p>
    //                         <p>Daily income of the store</p>
    //                         <a href="/">Learn more &gt;</a>
    //                     </div>
    //                 </div>

    //                 <div className="overview-card warning">
    //                     <BsExclamationCircle className="card-icon" />
    //                     <div className="card-content">
    //                         <p>DELIVERY PENDING</p>
    //                         <p>1 Matcha Latte, 1 Carrot Cake</p>
    //                         <a href="/">Learn more &gt;</a>
    //                     </div>
    //                 </div>
    //             </div>

    //             {/* Visitor Chart with Chart.js */}
    //             <div className="visitor-chart">
    //                 <Line data={data} options={options} />
    //             </div>
    //         </main>
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
                <Link to="/settings" className='menu-link'>
                    <div className="settings-section">
                        <FiSettings className="icon" /> Settings
                    </div>
                </Link>
            </aside>

      {/* Main Content */}
      <main className="main-content">
      <div className="top-bar">
    <div className="rectangle">Dashboard</div>
    <button className="profile-btn">Profile</button> </div>
        

        
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
}

export default AdminDashboard;
