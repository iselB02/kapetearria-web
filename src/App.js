import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Details from './components/Details';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'


function App() {
  return (
    <div className="banner">
      <Banner/>
      <Navbar/>
      <Details/>
    </div>
  
  );
}

export default App;
