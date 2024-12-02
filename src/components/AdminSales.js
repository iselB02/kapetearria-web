import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './AdminSales.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiSettings, FiUser, FiShoppingCart, FiMessageSquare } from 'react-icons/fi';
import { AiOutlineDashboard } from 'react-icons/ai';
import { RiAccountCircleLine, RiBarChartLine, RiLogoutBoxRLine, RiStoreLine  } from 'react-icons/ri';
import { auth, database } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminSales = () => {
  const [salesData, setSalesData] = useState({});
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Reference to the 'order_history' collection in Firestore
        const ordersRef = collection(database, 'order_history');
        const querySnapshot = await getDocs(ordersRef);

        // Initialize an empty object to store product sales
        const productSales = {};

        // Iterate through each order document
        querySnapshot.forEach((doc) => {
          const order = doc.data();
          const { productName, price, quantity } = order; // Directly extracting from the document

          if (productName && price && quantity) {
            // If the product is not already in the productSales object, initialize it
            if (!productSales[productName]) {
              productSales[productName] = {
                name: productName,
                totalSales: 0,
                totalQuantity: 0,
              };
            }

            // Update total sales and total quantity for this product
            productSales[productName].totalSales += price * quantity;
            productSales[productName].totalQuantity += quantity;
          }
        });

        // Convert productSales object to an array of products
        const salesArray = Object.values(productSales);

        // Sort products by total sales in descending order
        salesArray.sort((a, b) => b.totalSales - a.totalSales);

        // Set the sales data state
        setSalesData(salesArray); // Save all product data
        setTopProducts(salesArray.slice(0, 5)); // Top 5 products based on total sales
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const chartData = {
    labels: topProducts.map((product) => product.name),
    datasets: [
      {
        label: 'Total Sales (₱)',
        backgroundColor: '#FF6F61',
        data: topProducts.map((product) => product.totalSales),
      },
      {
        label: 'Total Quantity Sold',
        backgroundColor: '#92C57D',
        data: topProducts.map((product) => product.totalQuantity),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const downloadReport = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.text('Sales Report', 14, 20);
  
    // Subtitle
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
  
    // Table Headers
    const headers = [['#', 'Name', 'Total Sales (₱)', 'Total Quantity Sold']];
  
    // Prepare table data for top products
    const data = topProducts.map((product, index) => [
      index + 1,
      product.name,
      `₱${product.totalSales.toFixed(2)}`,
      product.totalQuantity,
    ]);
  
    // AutoTable for products
    doc.autoTable({
      startY: 40,
      head: headers,
      body: data,
    });
  
    // Calculate overall totals
    const overallSales = topProducts.reduce((total, product) => total + product.totalSales, 0);
    const overallQuantity = topProducts.reduce((total, product) => total + product.totalQuantity, 0);
  
    // Add overall totals at the bottom of the table
    const lastY = doc.lastAutoTable.finalY; // Get the Y position after the table
    doc.setFontSize(12);
    doc.text(`Overall Total Sales (₱): ₱${overallSales.toFixed(2)}`, 14, lastY + 10);
  
    // Save PDF
    doc.save('Sales_Report.pdf');
  };

  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className="admin-container">
      <aside className="sidebar3">
        <div className="sidebar-header">
          <img src="/image/logo.png" alt="Kape Tearria Admin" className="logo" />
          <h6>ADMIN</h6>
        </div>
        <ul className="sidebar-menu">
          <Link to="/admin" className="menu-link">
            <li className="menu-item">
              <AiOutlineDashboard className="icon" /> Dashboard
            </li>
          </Link>
          <Link to="/inventory" className="menu-link">
            <li className="menu-item">
              <FiShoppingCart className="icon" /> Inventory
            </li>
          </Link>
          <Link to="/sales" className="menu-link">
            <li className="menu-item active">
              <RiBarChartLine className="icon" /> Sales Reports
            </li>
          </Link>
          <Link to="/staff" className="menu-link">
            <li className="menu-item">
              <FiUser className="icon" /> Staff
            </li>
          </Link>
          <Link to="/uam" className="menu-link">
            <li className="menu-item">
              <RiAccountCircleLine className="icon" /> User Account Management
            </li>
          </Link>
          <Link to="/pos" className='menu-link'>
            <li className="menu-item">
                <RiStoreLine className="icon" /> POS
            </li>
                </Link>
            <li onClick={handleLogout} className="menu-item">
                <RiLogoutBoxRLine className="icon" /> Logout
            </li>
          {/* <Link to="/chat-support" className="menu-link">
            <li className="menu-item">
              <FiMessageSquare className="icon" /> Chat Support
            </li>
          </Link> */}
        </ul>
        <Link to="/my-account" className="menu-link">
          <div className="settings-section">
            <FiSettings className="icon" /> Settings
          </div>
        </Link>
      </aside>

      <main className="sales-content">
        <div className="header-rectangle">
          <div className="headtext">Sales Reports</div>
        </div>

        <div className="chart-section">
          <h5>Total Revenue</h5>
          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        <div className="top-products-section">
          <div className="title-sales">
            <h3>Top Products</h3>
            <button className="generate-report" onClick={downloadReport}>
              Download Report
            </button>
          </div>
          <table className="top-products-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total Sales</th>
                <th>Total Quantity Sold</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>₱{product.totalSales.toFixed(2)}</td>
                  <td>{product.totalQuantity}</td>
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
